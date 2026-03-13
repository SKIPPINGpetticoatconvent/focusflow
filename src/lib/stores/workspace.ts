import { writable, derived, get } from "svelte/store";
import type { Workspace } from "../types";
import { mockDb } from "../mock/db";
import { auth } from "./auth";

function createWorkspaceStore() {
  const { subscribe, set, update } = writable<{
    workspaces: Workspace[];
    currentWorkspace: Workspace | null;
    loading: boolean;
  }>({
    workspaces: [],
    currentWorkspace: null,
    loading: false,
  });

  return {
    subscribe,
    async init() {
      const authState = get(auth);
      if (!authState.user) return;

      update((s) => ({ ...s, loading: true }));
      const workspaces = await mockDb.getWorkspaces(authState.user.id);
      const currentWorkspace = workspaces[0] || null;
      set({ workspaces, currentWorkspace, loading: false });
    },
    async createWorkspace(name: string, type: "personal" | "team") {
      const authState = get(auth);
      if (!authState.user) return;

      const workspace = await mockDb.createWorkspace(
        name,
        type,
        authState.user.id,
      );
      update((s) => ({
        ...s,
        workspaces: [...s.workspaces, workspace],
        currentWorkspace: workspace,
      }));
      return workspace;
    },
    selectWorkspace(workspaceId: string) {
      update((s) => ({
        ...s,
        currentWorkspace:
          s.workspaces.find((w) => w.id === workspaceId) || null,
      }));
    },
  };
}

export const workspaceStore = createWorkspaceStore();

export const currentWorkspace = derived(
  workspaceStore,
  ($store) => $store.currentWorkspace,
);
export const workspaces = derived(
  workspaceStore,
  ($store) => $store.workspaces,
);
