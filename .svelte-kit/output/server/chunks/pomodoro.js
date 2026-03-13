import { w as writable, g as get } from "./index.js";
import { m as mockDb, a as auth } from "./auth.js";
import { c as currentWorkspace } from "./workspace.js";
const DEFAULT_SETTINGS = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsBeforeLongBreak: 4
};
function createPomodoroStore() {
  const { subscribe, set, update } = writable({
    mode: "work",
    isRunning: false,
    timeRemaining: DEFAULT_SETTINGS.workDuration * 60,
    completedPomodoros: 0,
    currentSessionId: null,
    settings: DEFAULT_SETTINGS
  });
  let timerInterval = null;
  const getDuration = (mode, settings) => {
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
      if (!workspace || !authState.user) return;
      const duration = state.mode === "work" ? state.settings.workDuration : state.mode === "short_break" ? state.settings.shortBreakDuration : state.settings.longBreakDuration;
      const session = await mockDb.createSession(
        { duration, type: state.mode },
        workspace.id,
        authState.user.id
      );
      update((s) => ({
        ...s,
        isRunning: true,
        currentSessionId: session.id
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
                currentSessionId: null
              }));
            } else {
              update((s) => ({
                ...s,
                mode: "short_break",
                isRunning: false,
                completedPomodoros: newCount,
                timeRemaining: getDuration("short_break", s.settings),
                currentSessionId: null
              }));
            }
          } else {
            update((s) => ({
              ...s,
              mode: "work",
              isRunning: false,
              timeRemaining: getDuration("work", s.settings),
              currentSessionId: null
            }));
          }
        }
      }, 1e3);
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
        currentSessionId: null
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
              currentSessionId: null
            };
          } else {
            return {
              ...s,
              mode: "short_break",
              isRunning: false,
              completedPomodoros: newCount,
              timeRemaining: getDuration("short_break", s.settings),
              currentSessionId: null
            };
          }
        } else {
          return {
            ...s,
            mode: "work",
            isRunning: false,
            timeRemaining: getDuration("work", s.settings),
            currentSessionId: null
          };
        }
      });
    },
    updateSettings(settings) {
      update((s) => ({
        ...s,
        settings: { ...s.settings, ...settings },
        timeRemaining: getDuration(s.mode, { ...s.settings, ...settings })
      }));
    }
  };
}
const pomodoroStore = createPomodoroStore();
export {
  pomodoroStore as p
};
