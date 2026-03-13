import { writable, get } from "svelte/store";
import type { PomodoroSession, PomodoroType, PomodoroSettings } from "../types";
import { mockDb } from "../mock/db";
import { auth } from "./auth";
import { currentWorkspace } from "./workspace";

const DEFAULT_SETTINGS: PomodoroSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsBeforeLongBreak: 4,
};

function createPomodoroStore() {
  const { subscribe, set, update } = writable<{
    mode: PomodoroType;
    isRunning: boolean;
    timeRemaining: number;
    completedPomodoros: number;
    currentSessionId: string | null;
    settings: PomodoroSettings;
  }>({
    mode: "work",
    isRunning: false,
    timeRemaining: DEFAULT_SETTINGS.workDuration * 60,
    completedPomodoros: 0,
    currentSessionId: null,
    settings: DEFAULT_SETTINGS,
  });

  let timerInterval: ReturnType<typeof setInterval> | null = null;

  const getDuration = (
    mode: PomodoroType,
    settings: PomodoroSettings,
  ): number => {
    switch (mode) {
      case "work":
        return settings.workDuration * 60;
      case "short_break":
        return settings.shortBreakDuration * 60;
      case "long_break":
        return settings.longBreakDuration * 60;
    }
  };

  const clearTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  };

  return {
    subscribe,
    async start() {
      const state = get({ subscribe });
      const workspace = get(currentWorkspace);
      const authState = get(auth);

      // 已在运行，直接忽略重复点击
      if (state.isRunning) return;

      // 计算当前模式下的总时长（秒）
      const totalDuration = getDuration(state.mode, state.settings);

      // 如果 timeRemaining 异常（<=0 或 > 总时长），重置为满时长
      let nextTimeRemaining =
        state.timeRemaining > 0 && state.timeRemaining <= totalDuration
          ? state.timeRemaining
          : totalDuration;

      let sessionId = state.currentSessionId;

      // 只有在有 workspace + user 且还没有 sessionId 时才创建新 session
      if (!sessionId && workspace && authState.user) {
        const session = await mockDb.createSession(
          { duration: totalDuration / 60, type: state.mode },
          workspace.id,
          authState.user.id,
        );
        sessionId = session.id;
      }

      update((s) => ({
        ...s,
        isRunning: true,
        timeRemaining: nextTimeRemaining,
        currentSessionId: sessionId ?? null,
      }));

      clearTimer();
      timerInterval = setInterval(async () => {
        const currentState = get({ subscribe });

        if (currentState.timeRemaining > 0) {
          update((s) => ({ ...s, timeRemaining: s.timeRemaining - 1 }));
        } else {
          clearTimer();

          if (currentState.mode === "work") {
            const newCount = currentState.completedPomodoros + 1;

            if (currentState.currentSessionId) {
              await mockDb.completeSession(currentState.currentSessionId);
            }

            if (newCount >= currentState.settings.sessionsBeforeLongBreak) {
              update((s) => ({
                ...s,
                mode: "long_break",
                isRunning: false,
                completedPomodoros: newCount,
                timeRemaining: getDuration("long_break", s.settings),
                currentSessionId: null,
              }));
            } else {
              update((s) => ({
                ...s,
                mode: "short_break",
                isRunning: false,
                completedPomodoros: newCount,
                timeRemaining: getDuration("short_break", s.settings),
                currentSessionId: null,
              }));
            }
          } else {
            update((s) => ({
              ...s,
              mode: "work",
              isRunning: false,
              timeRemaining: getDuration("work", s.settings),
              currentSessionId: null,
            }));
          }
        }
      }, 1000);
    },
    pause() {
      clearTimer();
      update((s) => ({ ...s, isRunning: false }));
    },
    reset() {
      clearTimer();
      update((s) => ({
        ...s,
        isRunning: false,
        timeRemaining: getDuration(s.mode, s.settings),
        currentSessionId: null,
      }));
    },
    skip() {
      clearTimer();
      update((s) => {
        if (s.mode === "work") {
          const newCount = s.completedPomodoros + 1;
          if (newCount >= s.settings.sessionsBeforeLongBreak) {
            return {
              ...s,
              mode: "long_break",
              isRunning: false,
              completedPomodoros: newCount,
              timeRemaining: getDuration("long_break", s.settings),
              currentSessionId: null,
            };
          } else {
            return {
              ...s,
              mode: "short_break",
              isRunning: false,
              completedPomodoros: newCount,
              timeRemaining: getDuration("short_break", s.settings),
              currentSessionId: null,
            };
          }
        } else {
          return {
            ...s,
            mode: "work",
            isRunning: false,
            timeRemaining: getDuration("work", s.settings),
            currentSessionId: null,
          };
        }
      });
    },
    updateSettings(settings: Partial<PomodoroSettings>) {
      update((s) => ({
        ...s,
        settings: { ...s.settings, ...settings },
        timeRemaining: getDuration(s.mode, { ...s.settings, ...settings }),
      }));
    },
  };
}

export const pomodoroStore = createPomodoroStore();
