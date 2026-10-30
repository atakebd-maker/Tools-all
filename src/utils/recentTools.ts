import { TOOLS, ToolItem } from '../data/tools';

export const RECENT_TOOLS_STORAGE_KEY = 'zynovexa_recently_used_tools';
export const MAX_RECENT_TOOLS = 5;

export interface RecentToolEntry {
  id: string;
  lastUsed: number;
}

/**
 * Safely reads the list of recently used tool IDs from localStorage.
 */
export function getRecentToolEntries(): RecentToolEntry[] {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(RECENT_TOOLS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Support array of strings or array of { id, lastUsed }
      return parsed
        .map((item) => {
          if (typeof item === 'string') {
            return { id: item, lastUsed: Date.now() };
          }
          if (item && typeof item === 'object' && typeof item.id === 'string') {
            return { id: item.id, lastUsed: Number(item.lastUsed) || Date.now() };
          }
          return null;
        })
        .filter((item): item is RecentToolEntry => item !== null)
        .slice(0, MAX_RECENT_TOOLS);
    }
  } catch (e) {
    // Graceful error handling for corrupted localStorage
  }
  return [];
}

/**
 * Resolves the full ToolItem definitions for recently used tools,
 * preserving the exact most-recent order.
 */
export function getRecentTools(): ToolItem[] {
  const entries = getRecentToolEntries();
  const resolvedTools: ToolItem[] = [];

  for (const entry of entries) {
    const match = TOOLS.find(
      (t) =>
        t.id.toLowerCase() === entry.id.toLowerCase() ||
        t.slug.toLowerCase() === entry.id.toLowerCase()
    );
    if (match && !resolvedTools.some((t) => t.id === match.id)) {
      resolvedTools.push(match);
    }
  }

  return resolvedTools.slice(0, MAX_RECENT_TOOLS);
}

/**
 * Tracks a tool interaction and records it in localStorage (keeping the last 5).
 */
export function recordRecentTool(toolIdOrSlug: string): void {
  if (!toolIdOrSlug || typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  try {
    // Resolve tool to its canonical ID if possible
    const canonical = TOOLS.find(
      (t) =>
        t.id.toLowerCase() === toolIdOrSlug.toLowerCase() ||
        t.slug.toLowerCase() === toolIdOrSlug.toLowerCase()
    );
    const targetId = canonical ? canonical.id : toolIdOrSlug;

    const existing = getRecentToolEntries();

    // Filter out previous occurrences of this tool
    const filtered = existing.filter(
      (item) => item.id.toLowerCase() !== targetId.toLowerCase()
    );

    // Prepend the current tool to the top of the list
    const updated: RecentToolEntry[] = [
      { id: targetId, lastUsed: Date.now() },
      ...filtered
    ].slice(0, MAX_RECENT_TOOLS);

    window.localStorage.setItem(RECENT_TOOLS_STORAGE_KEY, JSON.stringify(updated));

    // Notify any active components on the page
    window.dispatchEvent(new CustomEvent('zynovexa_recent_tools_changed', { detail: updated }));
  } catch (e) {
    // Safe storage quota or access error catch
  }
}

/**
 * Removes a specific tool from the recently used list.
 */
export function removeRecentTool(toolIdOrSlug: string): void {
  if (typeof window === 'undefined' || !window.localStorage) return;

  try {
    const existing = getRecentToolEntries();
    const updated = existing.filter(
      (item) => item.id.toLowerCase() !== toolIdOrSlug.toLowerCase()
    );
    window.localStorage.setItem(RECENT_TOOLS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('zynovexa_recent_tools_changed', { detail: updated }));
  } catch (e) {
    // ignore
  }
}

/**
 * Clears all recently used tools history.
 */
export function clearRecentTools(): void {
  if (typeof window === 'undefined' || !window.localStorage) return;

  try {
    window.localStorage.removeItem(RECENT_TOOLS_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('zynovexa_recent_tools_changed', { detail: [] }));
  } catch (e) {
    // ignore
  }
}
