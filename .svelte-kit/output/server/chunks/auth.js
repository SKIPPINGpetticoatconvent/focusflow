import { d as derived, w as writable } from "./index.js";
const STORAGE_KEYS = {
  USER: "focusflow_user",
  WORKSPACES: "focusflow_workspaces",
  TASKS: "focusflow_tasks",
  SESSIONS: "focusflow_sessions",
  TAGS: "focusflow_tags"
};
function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function getFromStorage(key, defaultValue) {
  if (typeof window === "undefined") return defaultValue;
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
}
function saveToStorage(key, data) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}
const mockDb = {
  async getUser() {
    await delay();
    return getFromStorage(STORAGE_KEYS.USER, null);
  },
  async login(email, _password) {
    await delay(500);
    const user = {
      id: generateId(),
      email,
      full_name: email.split("@")[0],
      avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };
    saveToStorage(STORAGE_KEYS.USER, user);
    return user;
  },
  async register(email, _password) {
    await delay(500);
    const user = {
      id: generateId(),
      email,
      full_name: email.split("@")[0],
      avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };
    saveToStorage(STORAGE_KEYS.USER, user);
    const defaultWorkspace = {
      id: generateId(),
      name: "My Workspace",
      type: "personal",
      owner_id: user.id,
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    saveToStorage(STORAGE_KEYS.WORKSPACES, [defaultWorkspace]);
    const defaultTags = [
      {
        id: generateId(),
        workspace_id: defaultWorkspace.id,
        name: "Work",
        color: "#3b82f6",
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      },
      {
        id: generateId(),
        workspace_id: defaultWorkspace.id,
        name: "Personal",
        color: "#22c55e",
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      },
      {
        id: generateId(),
        workspace_id: defaultWorkspace.id,
        name: "Urgent",
        color: "#ef4444",
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      }
    ];
    saveToStorage(STORAGE_KEYS.TAGS, defaultTags);
    const sampleTasks = [
      {
        id: generateId(),
        workspace_id: defaultWorkspace.id,
        title: "Welcome to FocusFlow!",
        description: "Start by adding your first task",
        status: "pending",
        priority: "medium",
        position: 0,
        due_date: null,
        created_by: user.id,
        completed_at: null,
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      },
      {
        id: generateId(),
        workspace_id: defaultWorkspace.id,
        title: "Try the Pomodoro Timer",
        description: "Use the timer to focus",
        status: "in_progress",
        priority: "high",
        position: 1,
        due_date: null,
        created_by: user.id,
        completed_at: null,
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      },
      {
        id: generateId(),
        workspace_id: defaultWorkspace.id,
        title: "Explore AI Assistant",
        description: "Let AI help you plan tasks",
        status: "pending",
        priority: "low",
        position: 2,
        due_date: null,
        created_by: user.id,
        completed_at: null,
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }
    ];
    saveToStorage(STORAGE_KEYS.TASKS, sampleTasks);
    const sampleSessions = [];
    saveToStorage(STORAGE_KEYS.SESSIONS, sampleSessions);
    return user;
  },
  async logout() {
    await delay(200);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
  async getWorkspaces(userId) {
    await delay();
    const workspaces = getFromStorage(STORAGE_KEYS.WORKSPACES, []);
    return workspaces.filter((w) => w.owner_id === userId || true);
  },
  async createWorkspace(name, type, ownerId) {
    await delay();
    const workspaces = getFromStorage(STORAGE_KEYS.WORKSPACES, []);
    const workspace = {
      id: generateId(),
      name,
      type,
      owner_id: ownerId,
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    workspaces.push(workspace);
    saveToStorage(STORAGE_KEYS.WORKSPACES, workspaces);
    return workspace;
  },
  async getTasks(workspaceId) {
    await delay();
    const tasks = getFromStorage(STORAGE_KEYS.TASKS, []);
    return tasks.filter((t) => t.workspace_id === workspaceId).sort((a, b) => a.position - b.position);
  },
  async createTask(task, workspaceId, userId) {
    await delay();
    const tasks = getFromStorage(STORAGE_KEYS.TASKS, []);
    const newTask = {
      id: generateId(),
      workspace_id: workspaceId,
      title: task.title || "",
      description: task.description || null,
      status: task.status || "pending",
      priority: task.priority || "medium",
      position: tasks.filter((t) => t.workspace_id === workspaceId).length,
      due_date: task.due_date || null,
      created_by: userId,
      completed_at: null,
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    tasks.push(newTask);
    saveToStorage(STORAGE_KEYS.TASKS, tasks);
    return newTask;
  },
  async updateTask(taskId, updates) {
    await delay();
    const tasks = getFromStorage(STORAGE_KEYS.TASKS, []);
    const index = tasks.findIndex((t) => t.id === taskId);
    if (index !== -1) {
      tasks[index] = {
        ...tasks[index],
        ...updates,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      saveToStorage(STORAGE_KEYS.TASKS, tasks);
      return tasks[index];
    }
    throw new Error("Task not found");
  },
  async deleteTask(taskId) {
    await delay();
    const tasks = getFromStorage(STORAGE_KEYS.TASKS, []);
    const filtered = tasks.filter((t) => t.id !== taskId);
    saveToStorage(STORAGE_KEYS.TASKS, filtered);
  },
  async reorderTasks(taskIds) {
    await delay();
    const tasks = getFromStorage(STORAGE_KEYS.TASKS, []);
    taskIds.forEach((id, index) => {
      const task = tasks.find((t) => t.id === id);
      if (task) task.position = index;
    });
    saveToStorage(STORAGE_KEYS.TASKS, tasks);
  },
  async createSession(session, workspaceId, userId) {
    await delay();
    const sessions = getFromStorage(
      STORAGE_KEYS.SESSIONS,
      []
    );
    const newSession = {
      id: generateId(),
      workspace_id: workspaceId,
      user_id: userId,
      task_id: session.task_id || null,
      duration: session.duration || 25,
      type: session.type || "work",
      started_at: (/* @__PURE__ */ new Date()).toISOString(),
      completed_at: null,
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    sessions.push(newSession);
    saveToStorage(STORAGE_KEYS.SESSIONS, sessions);
    return newSession;
  },
  async completeSession(sessionId) {
    await delay();
    const sessions = getFromStorage(
      STORAGE_KEYS.SESSIONS,
      []
    );
    const index = sessions.findIndex((s) => s.id === sessionId);
    if (index !== -1) {
      sessions[index].completed_at = (/* @__PURE__ */ new Date()).toISOString();
      saveToStorage(STORAGE_KEYS.SESSIONS, sessions);
    }
  },
  async getSessions(workspaceId, userId) {
    await delay();
    const sessions = getFromStorage(
      STORAGE_KEYS.SESSIONS,
      []
    );
    return sessions.filter(
      (s) => s.workspace_id === workspaceId && s.user_id === userId
    );
  },
  async getStats(workspaceId, userId) {
    await delay();
    const sessions = getFromStorage(
      STORAGE_KEYS.SESSIONS,
      []
    );
    const tasks = getFromStorage(STORAGE_KEYS.TASKS, []);
    const today = /* @__PURE__ */ new Date();
    const stats = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const daySessions = sessions.filter(
        (s) => s.workspace_id === workspaceId && s.user_id === userId && s.completed_at && s.completed_at.startsWith(dateStr)
      );
      const dayTasks = tasks.filter(
        (t) => t.workspace_id === workspaceId && t.status === "completed" && t.completed_at && t.completed_at.startsWith(dateStr)
      );
      stats.push({
        date: dateStr,
        totalMinutes: daySessions.reduce((sum, s) => sum + s.duration, 0),
        sessionsCompleted: daySessions.length,
        tasksCompleted: dayTasks.length
      });
    }
    return stats;
  },
  async getTags(workspaceId) {
    await delay();
    const tags = getFromStorage(STORAGE_KEYS.TAGS, []);
    return tags.filter((t) => t.workspace_id === workspaceId);
  }
};
function createAuthStore() {
  const { subscribe, set, update } = writable({
    user: null,
    loading: true,
    initialized: false
  });
  return {
    subscribe,
    async init() {
      const user = await mockDb.getUser();
      set({ user, loading: false, initialized: true });
    },
    async login(email, password) {
      update((s) => ({ ...s, loading: true }));
      try {
        const user = await mockDb.login(email, password);
        set({ user, loading: false, initialized: true });
        return { success: true };
      } catch (error) {
        update((s) => ({ ...s, loading: false }));
        return { success: false, error: "Login failed" };
      }
    },
    async register(email, password) {
      update((s) => ({ ...s, loading: true }));
      try {
        const user = await mockDb.register(email, password);
        set({ user, loading: false, initialized: true });
        return { success: true };
      } catch (error) {
        update((s) => ({ ...s, loading: false }));
        return { success: false, error: "Registration failed" };
      }
    },
    async logout() {
      await mockDb.logout();
      set({ user: null, loading: false, initialized: true });
    }
  };
}
const auth = createAuthStore();
derived(auth, ($auth) => !!$auth.user);
export {
  auth as a,
  mockDb as m
};
