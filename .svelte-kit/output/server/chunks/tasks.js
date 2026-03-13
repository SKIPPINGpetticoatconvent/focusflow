import { g as get, w as writable } from "./index.js";
import { m as mockDb, a as auth } from "./auth.js";
import { c as currentWorkspace } from "./workspace.js";
function createTaskStore() {
  const { subscribe, set, update } = writable({
    tasks: [],
    loading: false,
    filter: "all",
    searchQuery: ""
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
    async addTask(title, priority = "medium") {
      const workspace = get(currentWorkspace);
      const authState = get(auth);
      if (!workspace || !authState.user) return;
      const tasks = get({ subscribe }).tasks;
      const tempId = `temp-${Date.now()}`;
      const optimisticTask = {
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
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      update((s) => ({ ...s, tasks: [...s.tasks, optimisticTask] }));
      try {
        const newTask = await mockDb.createTask(
          { title, priority },
          workspace.id,
          authState.user.id
        );
        update((s) => ({
          ...s,
          tasks: s.tasks.map((t) => t.id === tempId ? newTask : t)
        }));
      } catch (error) {
        update((s) => ({
          ...s,
          tasks: s.tasks.filter((t) => t.id !== tempId)
        }));
      }
    },
    async toggleTaskStatus(taskId) {
      const tasks = get({ subscribe });
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;
      const newStatus = task.status === "completed" ? "pending" : "completed";
      const previousTask = { ...task };
      update((s) => ({
        ...s,
        tasks: s.tasks.map(
          (t) => t.id === taskId ? {
            ...t,
            status: newStatus,
            completed_at: newStatus === "completed" ? (/* @__PURE__ */ new Date()).toISOString() : null
          } : t
        )
      }));
      try {
        await mockDb.updateTask(taskId, { status: newStatus });
      } catch (error) {
        update((s) => ({
          ...s,
          tasks: s.tasks.map((t) => t.id === taskId ? previousTask : t)
        }));
      }
    },
    async deleteTask(taskId) {
      const previousTasks = get({ subscribe }).tasks;
      update((s) => ({ ...s, tasks: s.tasks.filter((t) => t.id !== taskId) }));
      try {
        await mockDb.deleteTask(taskId);
      } catch (error) {
        set({ ...get({ subscribe }), tasks: previousTasks });
      }
    },
    async updateTask(taskId, updates) {
      const tasks = get({ subscribe });
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;
      const previousTask = { ...task };
      update((s) => ({
        ...s,
        tasks: s.tasks.map((t) => t.id === taskId ? { ...t, ...updates } : t)
      }));
      try {
        await mockDb.updateTask(taskId, updates);
      } catch (error) {
        update((s) => ({
          ...s,
          tasks: s.tasks.map((t) => t.id === taskId ? previousTask : t)
        }));
      }
    },
    async reorderTasks(taskIds) {
      const previousTasks = get({ subscribe }).tasks;
      const reordered = taskIds.map((id, index) => {
        const task = previousTasks.find((t) => t.id === id);
        return task ? { ...task, position: index } : null;
      }).filter(Boolean);
      update((s) => ({ ...s, tasks: reordered }));
      try {
        await mockDb.reorderTasks(taskIds);
      } catch (error) {
        set({ ...get({ subscribe }), tasks: previousTasks });
      }
    },
    setFilter(filter) {
      update((s) => ({ ...s, filter }));
    },
    setSearchQuery(query) {
      update((s) => ({ ...s, searchQuery: query }));
    }
  };
}
const taskStore = createTaskStore();
const filteredTasks = {
  subscribe(fn) {
    return taskStore.subscribe((state) => {
      let tasks = [...state.tasks];
      if (state.filter !== "all") {
        tasks = tasks.filter((t) => t.status === state.filter);
      }
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        tasks = tasks.filter(
          (t) => t.title.toLowerCase().includes(query) || t.description && t.description.toLowerCase().includes(query)
        );
      }
      fn({ tasks, filter: state.filter, searchQuery: state.searchQuery });
    });
  }
};
export {
  filteredTasks as f
};
