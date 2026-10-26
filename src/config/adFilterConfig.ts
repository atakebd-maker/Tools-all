/**
 * Zynovexa Ad Configuration - All advertisements permanently disabled.
 */
export interface AdFilterConfig {
  filteringEnabled: boolean;
  masterWhiteout: boolean;
  replacementColor: string;
  slots: Record<string, { enabled: boolean; forceWhiteout: boolean }>;
}

export const AD_FILTER_CONFIG: AdFilterConfig = {
  filteringEnabled: true,
  masterWhiteout: true,
  replacementColor: '#FFFFFF',
  slots: {
    topBanner: { enabled: false, forceWhiteout: true },
    sideSkyscrapers: { enabled: false, forceWhiteout: true },
    toolLeaderboard: { enabled: false, forceWhiteout: true },
    contentRectangle: { enabled: false, forceWhiteout: true },
    secondaryVertical: { enabled: false, forceWhiteout: true }
  }
};
