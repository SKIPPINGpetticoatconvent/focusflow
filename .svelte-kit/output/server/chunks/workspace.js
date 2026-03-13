import { d as derived, g as get, w as writable } from "./index.js";
import { m as mockDb, a as auth } from "./auth.js";
function createWorkspaceStore() {
  const { subscribe, set, update } = writable({
    workspaces: [],
    currentWorkspace: null,
    loading: false
  });
  return {
    subscribe,
    async init() {
      const authState = get(auth);
      if (!authState.user) return;
      update((s) => ({ ...s, loading: true }));
      const workspaces2 = await mockDb.getWorkspaces(authState.user.id);
      const currentWorkspace2 = workspaces2[0] || null;
      set({ workspaces: workspaces2, currentWorkspace: currentWorkspace2, loading: false });
    },
    async createWorkspace(name, type) {
      const authState = get(auth);
      if (!authState.user) return;
      const workspace = await mockDb.createWorkspace(
        name,
        type,
        authState.user.id
      );
      update((s) => ({
        ...s,
        workspaces: [...s.workspaces, workspace],
        currentWorkspace: workspace
      }));
      return workspace;
    },
    selectWorkspace(workspaceId) {
      update((s) => ({
        ...s,
        currentWorkspace: s.workspaces.find((w) => w.id === workspaceId) || null
      }));
    }
  };
}
const workspaceStore = createWorkspaceStore();
const currentWorkspace = derived(
  workspaceStore,
  ($store) => $store.currentWorkspace
);
const workspaces = derived(
  workspaceStore,
  ($store) => $store.workspaces
);
export {
  currentWorkspace as c,
  workspaces as w
};
