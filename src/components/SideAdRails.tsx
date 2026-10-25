import React from 'react';
import { AdBanner, AD_KEYS } from './AdBanner';

/**
 * Desktop-Only Skyscraper Ad Rails.
 * Strictly hidden on mobile and tablets (`hidden 2xl:flex`).
 * Shows b6516069053294f5e45552338ccc87b2 (160x600) on both Left and Right gutters.
 */
export const SideAdRails: React.FC = () => {
  return (
    <>
      {/* Left Skyscraper - Desktop Only */}
      <aside
        aria-label="Sponsored advertisement left"
        className="hidden 2xl:flex fixed left-3 top-24 z-20 flex-col items-center pointer-events-auto"
      >
        <AdBanner
          adKey={AD_KEYS.SIDE_SKYSCRAPER}
          slotType="sideSkyscrapers"
          width={160}
          height={600}
          label={true}
          wrapperClassName="!my-0"
          className="shadow-sm hover:shadow transition-shadow bg-white"
        />
      </aside>

      {/* Right Skyscraper - Desktop Only */}
      <aside
        aria-label="Sponsored advertisement right"
        className="hidden 2xl:flex fixed right-3 top-24 z-20 flex-col items-center pointer-events-auto"
      >
        <AdBanner
          adKey={AD_KEYS.SIDE_SKYSCRAPER}
          slotType="sideSkyscrapers"
          width={160}
          height={600}
          label={true}
          wrapperClassName="!my-0"
          className="shadow-sm hover:shadow transition-shadow bg-white"
        />
      </aside>
    </>
  );
};
