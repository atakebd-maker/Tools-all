import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { AllTools } from './pages/AllTools';
import { CategoryPage } from './pages/CategoryPage';
import { ToolPage } from './pages/ToolPage';
import { About } from './pages/About';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';
import { Contact } from './pages/Contact';
import { Disclaimer } from './pages/Disclaimer';
import { NotFound } from './pages/NotFound';
import { TOOLS } from './data/tools';
import { CATEGORIES } from './data/categories';
import { applyStaticPageSeo } from './utils/seo';
import { AdBanner, AD_KEYS } from './components/AdBanner';
import { SideAdRails } from './components/SideAdRails';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [searchParam, setSearchParam] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('q') || '';
  });

  // Handle browser back and forward button and route SEO
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
      const params = new URLSearchParams(window.location.search);
      setSearchParam(params.get('q') || '');
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update static page SEO on route changes
  useEffect(() => {
    if (!currentPath.startsWith('/categories/') && !currentPath.startsWith('/tools/')) {
      applyStaticPageSeo(currentPath);
    }
  }, [currentPath]);

  const navigate = (path: string) => {
    let cleanPath = path;
    let query = '';

    if (path.includes('?')) {
      const parts = path.split('?');
      cleanPath = parts[0];
      query = '?' + parts[1];
      const params = new URLSearchParams(parts[1]);
      setSearchParam(params.get('q') || '');
    } else {
      setSearchParam('');
    }

    window.history.pushState({}, '', cleanPath + query);
    setCurrentPath(cleanPath);
    window.scrollTo(0, 0);
  };

  // Route matching
  const renderCurrentView = () => {
    if (currentPath === '/' || currentPath === '') {
      return (
        <Home
          onNavigate={navigate}
          onSelectTool={(toolId) => navigate(`/tools/${toolId}`)}
        />
      );
    }

    if (currentPath === '/all-tools') {
      return (
        <AllTools
          initialSearch={searchParam}
          onNavigateHome={() => navigate('/')}
          onSelectTool={(toolId) => navigate(`/tools/${toolId}`)}
        />
      );
    }

    if (currentPath.startsWith('/categories/')) {
      const categorySlug = currentPath.replace('/categories/', '').split('/')[0];
      return (
        <CategoryPage
          categorySlug={categorySlug}
          onNavigateHome={() => navigate('/')}
          onNavigateAllTools={() => navigate('/all-tools')}
          onNavigateCategory={(slug) => navigate(`/categories/${slug}`)}
          onSelectTool={(toolId) => navigate(`/tools/${toolId}`)}
        />
      );
    }

    if (currentPath.startsWith('/tools/')) {
      const toolSlug = currentPath.replace('/tools/', '').split('/')[0];
      return (
        <ToolPage
          toolSlug={toolSlug}
          onNavigateHome={() => navigate('/')}
          onNavigateCategory={(catSlug) => navigate(`/categories/${catSlug}`)}
          onSelectTool={(slug) => navigate(`/tools/${slug}`)}
        />
      );
    }

    if (currentPath === '/about') {
      return (
        <About
          onNavigateHome={() => navigate('/')}
          onNavigateAllTools={() => navigate('/all-tools')}
        />
      );
    }

    if (currentPath === '/privacy') {
      return <PrivacyPolicy onNavigateHome={() => navigate('/')} />;
    }

    if (currentPath === '/terms') {
      return <Terms onNavigateHome={() => navigate('/')} />;
    }

    if (currentPath === '/contact') {
      return <Contact onNavigateHome={() => navigate('/')} />;
    }

    if (currentPath === '/disclaimer') {
      return <Disclaimer onNavigateHome={() => navigate('/')} />;
    }

    return (
      <NotFound
        onNavigateHome={() => navigate('/')}
        onNavigateAllTools={() => navigate('/all-tools')}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white relative">
      {/* Desktop-Only Left & Right Side Skyscrapers (160x600) - Strictly hidden on mobile */}
      <SideAdRails />

      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => navigate('/all-tools')}
      />

      {/* Website Top Banner (468x60) */}
      <div className="w-full bg-slate-50/80 border-b border-slate-200/80 py-2.5 px-3 flex justify-center items-center overflow-hidden">
        <div className="max-w-full overflow-x-auto flex justify-center py-0.5">
          <AdBanner
            adKey={AD_KEYS.TOP_HEADER_BANNER}
            width={468}
            height={60}
            label={false}
            wrapperClassName="!my-0 scale-90 sm:scale-100 origin-center"
            className="shadow-2xs bg-white"
          />
        </div>
      </div>

      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
