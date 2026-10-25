/**
 * Zynovexa Islamic Ad Filtering & Brand Safety Configuration
 *
 * This configuration allows you to control how advertisements are filtered
 * to align with Islamic values while preserving revenue from halal ads.
 *
 * IMPORTANT NOTE ON BROWSER SECURITY (Cross-Origin iframes):
 * -------------------------------------------------------------
 * Adsterra banners load creatives from external domains (bauval.org / adsterra.com).
 * Modern web browsers enforce the Same-Origin Policy (SOP), which strictly prevents
 * any website from inspecting the raw pixels or images inside cross-origin ad iframes.
 *
 * Therefore, a dual-layer approach is used:
 * 1. ADSTERRA DASHBOARD LEVEL (Layer 1 - Primary & 100% Reliable):
 *    In your Adsterra Publisher Dashboard, disable the "Dating", "Erotica", and "Adult"
 *    ad categories. This stops female photo/suggestive ads before they are ever sent.
 *
 * 2. WEBSITE LEVEL (Layer 2 - Active Filtering & Whiteout):
 *    - Inspectable / direct image creatives are analyzed for human portraits.
 *    - Any flagged ad has its entire visible area replaced with pure white (#FFFFFF),
 *      with no text, no warning, and no placeholders.
 *    - You can configure individual slots below.
 */

export interface AdFilterConfig {
  // Master toggle: set to true to enable filtering
  filteringEnabled: boolean;

  // Pure white replacement background color (#FFFFFF)
  replacementColor: string;

  // Slot-by-slot settings
  slots: {
    // Top website banner (468x60)
    topBanner: {
      enabled: boolean;
      forceWhiteout: boolean; // Set true if you want to temporarily blank this specific slot
    };
    // Side skyscrapers (160x600 - desktop only)
    sideSkyscrapers: {
      enabled: boolean;
      forceWhiteout: boolean;
    };
    // Tool top leaderboard (728x90)
    toolLeaderboard: {
      enabled: boolean;
      forceWhiteout: boolean;
    };
    // In-content rectangle (300x250)
    contentRectangle: {
      enabled: boolean;
      forceWhiteout: boolean;
    };
    // Secondary vertical (160x300)
    secondaryVertical: {
      enabled: boolean;
      forceWhiteout: boolean;
    };
  };
}

export const AD_FILTER_CONFIG: AdFilterConfig = {
  filteringEnabled: true,
  replacementColor: '#FFFFFF',
  slots: {
    topBanner: {
      enabled: true,
      forceWhiteout: false
    },
    sideSkyscrapers: {
      enabled: true,
      forceWhiteout: false
    },
    toolLeaderboard: {
      enabled: true,
      forceWhiteout: false
    },
    contentRectangle: {
      enabled: true,
      forceWhiteout: false
    },
    secondaryVertical: {
      enabled: true,
      forceWhiteout: false
    }
  }
};
