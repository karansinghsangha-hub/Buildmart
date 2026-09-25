"use client";

import { useStore } from "./store";
import type { UserAccount } from "./types";

/** Re-renders whenever the store changes; returns the signed-in user, if any. */
export function useCurrentUser(): UserAccount | null {
  const store = useStore();
  return store.users.find((u) => u.id === store.currentUserId) ?? null;
}
