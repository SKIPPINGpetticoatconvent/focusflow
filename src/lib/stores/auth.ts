import { writable, derived } from "svelte/store";
import type { User, Workspace, PomodoroSettings } from "../types";
import { mockDb } from "../mock/db";

function createAuthStore() {
  const { subscribe, set, update } = writable<{
    user: User | null;
    loading: boolean;
    initialized: boolean;
  }>({
    user: null,
    loading: true,
    initialized: false,
  });

  return {
    subscribe,
    async init() {
      const user = await mockDb.getUser();
      set({ user, loading: false, initialized: true });
    },
    async login(email: string, password: string) {
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
    async register(email: string, password: string) {
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
    },
  };
}

export const auth = createAuthStore();

export const isAuthenticated = derived(auth, ($auth) => !!$auth.user);
