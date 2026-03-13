import { writable, get } from "svelte/store";
import type { Task, TaskStatus, TaskPriority } from "../types";
import { mockDb } from "../mock/db";
import { auth } from "./auth";
import { currentWorkspace } from "./workspace";

function createTaskStore() {
  const { subscribe, set, update } = writable<{
    tasks: Task[];
    loading: boolean;
    filter: TaskStatus | "all";
    searchQuery: string;
  }>({
    tasks: [],
    loading: false,
    filter: "all",
    searchQuery: "",
  });

  return {
    subscribe,
    async init() {
      const workspace = get(currentWorkspace);
      const authState = get(auth);
      if (!workspace || !authState.user) return;

      update((s) => ({ ...s, loading: true }));
      const tasks = await mockDb.getTasks(workspace.id);
      set({ tasks, loading: false, filter: "all", searchQuery: "" });
    },
    async addTask(title: string, priority: TaskPriority = "medium") {
      const workspace = get(currentWorkspace);
      const authState = get(auth);
      if (!workspace || !authState.user) return;

      const tasks = get({ subscribe }).tasks;
      const tempId = `temp-${Date.now()}`;

      const optimisticTask: Task = {
        id: tempId,
        workspace_id: workspace.id,
        title,
        description: null,
        status: "pending",
        priority,
        position: tasks.length,
        due_date: null,
        created_by: authState.user.id,
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      update((s) => ({ ...s, tasks: [...s.tasks, optimisticTask] }));

      try {
        const newTask = await mockDb.createTask(
          { title, priority },
          workspace.id,
          authState.user.id,
        );
        update((s) => ({
          ...s,
          tasks: s.tasks.map((t) => (t.id === tempId ? newTask : t)),
        }));
      } catch (error) {
        update((s) => ({
          ...s,
          tasks: s.tasks.filter((t) => t.id !== tempId),
        }));
      }
    },
    async toggleTaskStatus(taskId: string) {
      const tasks = get({ subscribe });
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      const newStatus: TaskStatus =
        task.status === "completed" ? "pending" : "completed";
      const previousTask = { ...task };

      update((s) => ({
        ...s,
        tasks: s.tasks.map((t) =>
          t.id === taskId
            ? {
                ...t,
                status: newStatus,
                completed_at:
                  newStatus === "completed" ? new Date().toISOString() : null,
              }
            : t,
        ),
      }));

      try {
        await mockDb.updateTask(taskId, { status: newStatus });
      } catch (error) {
        update((s) => ({
          ...s,
          tasks: s.tasks.map((t) => (t.id === taskId ? previousTask : t)),
        }));
      }
    },
    async deleteTask(taskId: string) {
      const previousTasks = get({ subscribe }).tasks;
      update((s) => ({ ...s, tasks: s.tasks.filter((t) => t.id !== taskId) }));

      try {
        await mockDb.deleteTask(taskId);
      } catch (error) {
        set({ ...get({ subscribe }), tasks: previousTasks });
      }
    },
    async updateTask(taskId: string, updates: Partial<Task>) {
      const tasks = get({ subscribe });
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      const previousTask = { ...task };
      update((s) => ({
        ...s,
        tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)),
      }));

      try {
        await mockDb.updateTask(taskId, updates);
      } catch (error) {
        update((s) => ({
          ...s,
          tasks: s.tasks.map((t) => (t.id === taskId ? previousTask : t)),
        }));
      }
    },
    async reorderTasks(taskIds: string[]) {
      const previousTasks = get({ subscribe }).tasks;

      const reordered = taskIds
        .map((id, index) => {
          const task = previousTasks.find((t) => t.id === id);
          return task ? { ...task, position: index } : null;
        })
        .filter(Boolean) as Task[];

      update((s) => ({ ...s, tasks: reordered }));

      try {
        await mockDb.reorderTasks(taskIds);
      } catch (error) {
        set({ ...get({ subscribe }), tasks: previousTasks });
      }
    },
    setFilter(filter: TaskStatus | "all") {
      update((s) => ({ ...s, filter }));
    },
    setSearchQuery(query: string) {
      update((s) => ({ ...s, searchQuery: query }));
    },
  };
}

export const taskStore = createTaskStore();

export const filteredTasks = {
  subscribe(
    fn: (value: {
      tasks: Task[];
      filter: TaskStatus | "all";
      searchQuery: string;
    }) => void,
  ) {
    return taskStore.subscribe((state) => {
      let tasks = [...state.tasks];

      if (state.filter !== "all") {
        tasks = tasks.filter((t) => t.status === state.filter);
      }

      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        tasks = tasks.filter(
          (t) =>
            t.title.toLowerCase().includes(query) ||
            (t.description && t.description.toLowerCase().includes(query)),
        );
      }

      fn({ tasks, filter: state.filter, searchQuery: state.searchQuery });
    });
  },
};
