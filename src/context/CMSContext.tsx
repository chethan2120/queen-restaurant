import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MenuItem,
  JournalArticle,
  TableReservation,
  PageType,
} from '../types';
import {
  INITIAL_MENU_ITEMS,
  INITIAL_JOURNAL_ARTICLES,
} from '../data/restaurantData';

interface NavigationOptions {
  journalSlug?: string | null;
  locationId?: 'church-street' | 'new-bel-road' | null;
  hash?: string | null;
  replace?: boolean;
}

interface CMSContextType {
  // Navigation
  currentPage: PageType;
  setCurrentPage: (page: PageType, options?: NavigationOptions) => void;
  selectedJournalSlug: string | null;
  setSelectedJournalSlug: (slug: string | null) => void;
  selectedLocationId: 'church-street' | 'new-bel-road' | null;
  setSelectedLocationId: (id: 'church-street' | 'new-bel-road' | null) => void;

  // Modals
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  isOrderModalOpen: boolean;
  setIsOrderModalOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  preselectedBookingLocation: 'church-street' | 'new-bel-road' | null;
  setPreselectedBookingLocation: (loc: 'church-street' | 'new-bel-road' | null) => void;
  preselectedOrderLocation: 'church-street' | 'new-bel-road' | null;
  setPreselectedOrderLocation: (loc: 'church-street' | 'new-bel-road' | null) => void;
  preselectedOrderPlatform: 'swiggy' | 'zomato' | null;
  setPreselectedOrderPlatform: (platform: 'swiggy' | 'zomato' | null) => void;

  // Data Store (CMS Managed)
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;

  journalArticles: JournalArticle[];
  addJournalArticle: (article: Omit<JournalArticle, 'id'>) => void;
  updateJournalArticle: (id: string, article: Partial<JournalArticle>) => void;
  deleteJournalArticle: (id: string) => void;

  reservations: TableReservation[];
  createReservation: (reservation: Omit<TableReservation, 'id' | 'referenceCode' | 'createdAt' | 'status'>) => TableReservation;
  updateReservationStatus: (id: string, status: 'confirmed' | 'pending' | 'cancelled') => void;

  // CMS Utilities
  resetToDefaults: () => void;
  exportCMSData: () => string;
  importCMSData: (jsonString: string) => boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

// Helper to parse route from location hash
const parseInitialRoute = (): {
  page: PageType;
  journalSlug: string | null;
  hash: string | null;
} => {
  if (typeof window === 'undefined') {
    return { page: 'home', journalSlug: null, hash: null };
  }

  const rawHash = window.location.hash || '';
  if (!rawHash || rawHash === '#' || rawHash === '#/') {
    return { page: 'home', journalSlug: null, hash: null };
  }

  // Handle section anchors like #loved-for-generations
  const knownSections = ['loved-for-generations', 'signature-dishes', 'heritage-introduction', 'culinary-philosophy', 'experiences', 'locations', 'journal'];
  const cleanAnchor = rawHash.replace(/^#\/?/, '');
  if (knownSections.includes(cleanAnchor)) {
    return { page: 'home', journalSlug: null, hash: cleanAnchor };
  }

  if (cleanAnchor.startsWith('journal/')) {
    const slug = cleanAnchor.replace('journal/', '');
    return { page: 'journal-detail', journalSlug: slug, hash: null };
  }

  if (cleanAnchor === 'the-queens-table' || cleanAnchor === 'queens-table') {
    return { page: 'queens-table', journalSlug: null, hash: null };
  }

  const validPages: PageType[] = [
    'home',
    'our-story',
    'menu',
    'experiences',
    'locations',
    'gallery',
    'journal',
    'journal-detail',
    'queens-table',
    'contact',
    'faq',
    'cms-admin',
  ];

  if (validPages.includes(cleanAnchor as PageType)) {
    return { page: cleanAnchor as PageType, journalSlug: null, hash: null };
  }

  return { page: 'home', journalSlug: null, hash: null };
};

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialRoute = parseInitialRoute();

  // Navigation State
  const [currentPage, setCurrentPageState] = useState<PageType>(initialRoute.page);
  const [selectedJournalSlug, setSelectedJournalSlugState] = useState<string | null>(initialRoute.journalSlug);
  const [selectedLocationId, setSelectedLocationIdState] = useState<'church-street' | 'new-bel-road' | null>(null);

  // In-memory scroll positions keyed by unique historyKey
  const scrollMapRef = React.useRef<Map<string, number>>(new Map());

  // Modal States
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [preselectedBookingLocation, setPreselectedBookingLocation] = useState<'church-street' | 'new-bel-road' | null>(null);
  const [preselectedOrderLocation, setPreselectedOrderLocation] = useState<'church-street' | 'new-bel-road' | null>(null);
  const [preselectedOrderPlatform, setPreselectedOrderPlatform] = useState<'swiggy' | 'zomato' | null>(null);

  // LocalStorage Persistence Keys
  const STORAGE_KEY_MENU = 'queens_restaurant_menu_v6';
  const STORAGE_KEY_JOURNAL = 'queens_restaurant_journal_v8';
  const STORAGE_KEY_RESERVATIONS = 'queens_restaurant_reservations_v3';

  // Helper to ensure valid bundled images & categories
  const sanitizeMenuItems = (items: MenuItem[]): MenuItem[] => {
    if (!Array.isArray(items) || items.length === 0) {
      return INITIAL_MENU_ITEMS;
    }
    return items.map((item) => {
      const defaultMatch = INITIAL_MENU_ITEMS.find((d) => d.id === item.id || d.name === item.name);
      if (defaultMatch) {
        return {
          ...item,
          category: defaultMatch.category,
          image: defaultMatch.image,
          price: defaultMatch.price,
          isVeg: defaultMatch.isVeg,
        };
      }
      return item;
    });
  };

  const sanitizeJournalArticles = (articles: JournalArticle[]): JournalArticle[] => {
    if (!Array.isArray(articles) || articles.length !== INITIAL_JOURNAL_ARTICLES.length) {
      return INITIAL_JOURNAL_ARTICLES;
    }
    return articles.map((art) => {
      const defaultMatch = INITIAL_JOURNAL_ARTICLES.find((d) => d.id === art.id);
      if (defaultMatch) {
        return { ...art, image: defaultMatch.image, author: defaultMatch.author };
      }
      return art;
    });
  };

  // Menu State
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MENU);
      return saved ? sanitizeMenuItems(JSON.parse(saved)) : INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  // Journal State
  const [journalArticles, setJournalArticles] = useState<JournalArticle[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_JOURNAL);
      return saved ? sanitizeJournalArticles(JSON.parse(saved)) : INITIAL_JOURNAL_ARTICLES;
    } catch {
      return INITIAL_JOURNAL_ARTICLES;
    }
  });

  // Reservations State
  const [reservations, setReservations] = useState<TableReservation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RESERVATIONS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'res-sample-1',
          referenceCode: 'QR-1974-9821',
          locationId: 'church-street',
          date: '2026-08-25',
          timeSlot: '07:30 PM',
          guestCount: 4,
          seatingPreference: 'Heritage Corner',
          specialOccasion: 'Anniversary',
          fullName: 'Vikram Sengupta',
          email: 'vikram.sen@example.com',
          phone: '+91 98450 12345',
          dietaryNotes: 'Celebrating 25th anniversary; please arrange warm Gulab Jamun with rabri.',
          status: 'confirmed',
          createdAt: new Date().toISOString(),
        }
      ];
    } catch {
      return [];
    }
  });

  // Persist Changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MENU, JSON.stringify(menuItems));
    } catch (e) {
      console.warn('Could not save menu items to storage', e);
    }
  }, [menuItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_JOURNAL, JSON.stringify(journalArticles));
    } catch (e) {
      console.warn('Could not save journal articles to storage', e);
    }
  }, [journalArticles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RESERVATIONS, JSON.stringify(reservations));
    } catch (e) {
      console.warn('Could not save reservations to storage', e);
    }
  }, [reservations]);

  // Helper to save current scroll position for the current history entry
  const saveCurrentScroll = () => {
    if (typeof window === 'undefined') return;
    const curKey = window.history.state?.historyKey;
    if (curKey) {
      const y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      scrollMapRef.current.set(curKey, y);
      try {
        sessionStorage.setItem(`queens_scroll_${curKey}`, String(y));
      } catch {}
    }
  };

  // Initialize history state and manual scroll restoration on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Ensure initial entry has a unique historyKey
    if (!window.history.state?.historyKey) {
      const initialKey = 'hist_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
      const initialHash = window.location.hash;
      window.history.replaceState(
        {
          historyKey: initialKey,
          page: initialRoute.page,
          journalSlug: initialRoute.journalSlug,
          locationId: null,
          hash: initialRoute.hash || (initialHash ? initialHash.replace(/^#/, '') : null),
        },
        ''
      );
    }

    // Continuous scroll position tracking
    let scrollTimer: any = null;
    const handleScroll = () => {
      const curKey = window.history.state?.historyKey;
      if (!curKey) return;
      const y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      scrollMapRef.current.set(curKey, y);

      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        try {
          sessionStorage.setItem(`queens_scroll_${curKey}`, String(y));
        } catch {}
      }, 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', saveCurrentScroll);
    window.addEventListener('pagehide', saveCurrentScroll);

    // Initial anchor scroll if needed
    if (initialRoute.hash) {
      setTimeout(() => {
        const el = document.getElementById(initialRoute.hash!);
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      }, 150);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', saveCurrentScroll);
      window.removeEventListener('pagehide', saveCurrentScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  // Browser Back & Forward (popstate) Handler with multi-frame scroll restoration
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      let targetPage: PageType = 'home';
      let targetSlug: string | null = null;
      let targetLoc: 'church-street' | 'new-bel-road' | null = null;
      let targetHash: string | null = null;
      let targetKey: string | null = null;

      if (state && typeof state === 'object') {
        targetPage = state.page || 'home';
        targetSlug = state.journalSlug || null;
        targetLoc = state.locationId || null;
        targetHash = state.hash || null;
        targetKey = state.historyKey || null;
      } else {
        const parsed = parseInitialRoute();
        targetPage = parsed.page;
        targetSlug = parsed.journalSlug;
        targetHash = parsed.hash;
      }

      // Retrieve saved scroll position for this specific history key
      let savedY = 0;
      if (targetKey) {
        if (scrollMapRef.current.has(targetKey)) {
          savedY = scrollMapRef.current.get(targetKey)!;
        } else {
          try {
            const stored = sessionStorage.getItem(`queens_scroll_${targetKey}`);
            if (stored !== null) savedY = Number(stored);
          } catch {}
        }
      }

      // Synchronize React state
      setCurrentPageState(targetPage);
      setSelectedJournalSlugState(targetSlug);
      setSelectedLocationIdState(targetLoc);

      // Perform multi-frame scroll restoration
      const restore = () => {
        if (targetHash && savedY === 0) {
          const id = targetHash.replace(/^#/, '');
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'instant', block: 'start' });
            return;
          }
        }
        window.scrollTo({ top: savedY, behavior: 'instant' });
      };

      restore();
      requestAnimationFrame(restore);
      [15, 40, 80, 150, 250, 400, 650].forEach((delay) => {
        setTimeout(restore, delay);
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Central Navigation Dispatcher
  const setCurrentPage = (page: PageType, options?: NavigationOptions) => {
    // 1. Save scroll position of current page entry before navigating away
    saveCurrentScroll();

    const slug = options?.journalSlug !== undefined
      ? options.journalSlug
      : (page === 'journal-detail' ? selectedJournalSlug : null);

    const locId = options?.locationId !== undefined
      ? options.locationId
      : (page === 'locations' ? selectedLocationId : null);

    const hash = options?.hash || null;

    // 2. Generate unique history key for the new history entry
    const newKey = 'hist_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);

    // 3. Compute URL representation
    let hashPath = `#/${page}`;
    if (page === 'home' && !hash) {
      hashPath = '#/';
    } else if (page === 'home' && hash) {
      hashPath = `#${hash.replace(/^#/, '')}`;
    } else if (page === 'journal-detail' && slug) {
      hashPath = `#/journal/${slug}`;
    } else if (page === 'queens-table') {
      hashPath = '#/the-queens-table';
    }

    const statePayload = {
      historyKey: newKey,
      page,
      journalSlug: slug,
      locationId: locId,
      hash,
    };

    if (options?.replace) {
      window.history.replaceState(statePayload, '', hashPath);
    } else {
      window.history.pushState(statePayload, '', hashPath);
    }

    // 4. Update React State
    setCurrentPageState(page);
    setSelectedJournalSlugState(slug);
    setSelectedLocationIdState(locId);

    // 5. Scroll behavior for forward navigation
    if (hash) {
      requestAnimationFrame(() => {
        const id = hash.replace(/^#/, '');
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const setSelectedJournalSlug = (slug: string | null) => {
    setSelectedJournalSlugState(slug);
  };

  const setSelectedLocationId = (id: 'church-street' | 'new-bel-road' | null) => {
    setSelectedLocationIdState(id);
  };

  // Menu Handlers
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `menu-custom-${Date.now()}`,
    };
    setMenuItems((prev) => [newItem, ...prev]);
  };

  const updateMenuItem = (id: string, updatedFields: Partial<MenuItem>) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Journal Handlers
  const addJournalArticle = (article: Omit<JournalArticle, 'id'>) => {
    const newArticle: JournalArticle = {
      ...article,
      id: `journal-${Date.now()}`,
    };
    setJournalArticles((prev) => [newArticle, ...prev]);
  };

  const updateJournalArticle = (id: string, updatedFields: Partial<JournalArticle>) => {
    setJournalArticles((prev) =>
      prev.map((art) => (art.id === id ? { ...art, ...updatedFields } : art))
    );
  };

  const deleteJournalArticle = (id: string) => {
    setJournalArticles((prev) => prev.filter((art) => art.id !== id));
  };

  // Reservation Handlers
  const createReservation = (
    data: Omit<TableReservation, 'id' | 'referenceCode' | 'createdAt' | 'status'>
  ): TableReservation => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const referenceCode = `QR-1974-${randomDigits}`;
    const newRes: TableReservation = {
      ...data,
      id: `res-${Date.now()}`,
      referenceCode,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    setReservations((prev) => [newRes, ...prev]);
    return newRes;
  };

  const updateReservationStatus = (
    id: string,
    status: 'confirmed' | 'pending' | 'cancelled'
  ) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  // CMS Backup / Reset
  const resetToDefaults = () => {
    setMenuItems(INITIAL_MENU_ITEMS);
    setJournalArticles(INITIAL_JOURNAL_ARTICLES);
  };

  const exportCMSData = (): string => {
    return JSON.stringify(
      {
        menuItems,
        journalArticles,
        reservations,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  };

  const importCMSData = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.menuItems && Array.isArray(parsed.menuItems)) {
        setMenuItems(parsed.menuItems);
      }
      if (parsed.journalArticles && Array.isArray(parsed.journalArticles)) {
        setJournalArticles(parsed.journalArticles);
      }
      if (parsed.reservations && Array.isArray(parsed.reservations)) {
        setReservations(parsed.reservations);
      }
      return true;
    } catch (e) {
      console.error('Import error', e);
      return false;
    }
  };

  return (
    <CMSContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedJournalSlug,
        setSelectedJournalSlug,
        selectedLocationId,
        setSelectedLocationId,

        isBookingModalOpen,
        setIsBookingModalOpen,
        isOrderModalOpen,
        setIsOrderModalOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        preselectedBookingLocation,
        setPreselectedBookingLocation,
        preselectedOrderLocation,
        setPreselectedOrderLocation,
        preselectedOrderPlatform,
        setPreselectedOrderPlatform,

        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,

        journalArticles,
        addJournalArticle,
        updateJournalArticle,
        deleteJournalArticle,

        reservations,
        createReservation,
        updateReservationStatus,

        resetToDefaults,
        exportCMSData,
        importCMSData,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
