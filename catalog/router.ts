import { useState, useEffect, useCallback } from 'react';
import type { MainTab } from './data/navigation';
import { defaultPages } from './data/navigation';

export function parseHash(): { tab: MainTab; page: string } {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const [tab, page] = hash.split('/');
  if (tab === 'home') {
    return { tab: 'home', page: 'home' };
  }
  if (tab === 'about' || tab === 'system' || tab === 'components') {
    return { tab, page: page || defaultPages[tab] };
  }
  return { tab: 'home', page: 'home' };
}

export function navigate(tab: MainTab, page: string) {
  window.location.hash = `/${tab}/${page}`;
}

export function useHashRoute() {
  const [route, setRoute] = useState(parseHash);

  useEffect(() => {
    function onHashChange() {
      setRoute(parseHash());
    }
    window.addEventListener('hashchange', onHashChange);
    if (!window.location.hash) {
      navigate('home', 'home');
    }
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const setTab = useCallback((tabId: string) => {
    const tab = tabId as MainTab;
    navigate(tab, defaultPages[tab]);
  }, []);

  const setPage = useCallback((pageId: string) => {
    navigate(route.tab, pageId);
  }, [route.tab]);

  return { tab: route.tab, page: route.page, setTab, setPage };
}
