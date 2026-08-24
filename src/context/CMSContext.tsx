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

interface CMSContextType {
  // Navigation
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
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

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedJournalSlug, setSelectedJournalSlug] = useState<string | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<'church-street' | 'new-bel-road' | null>(null);

  // Modal States
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [preselectedBookingLocation, setPreselectedBookingLocation] = useState<'church-street' | 'new-bel-road' | null>(null);

  // LocalStorage Persistence Keys
  const STORAGE_KEY_MENU = 'queens_restaurant_menu_v3';
  const STORAGE_KEY_JOURNAL = 'queens_restaurant_journal_v6';
  const STORAGE_KEY_RESERVATIONS = 'queens_restaurant_reservations_v3';

  // Helper to ensure valid bundled images
  const sanitizeMenuItems = (items: MenuItem[]): MenuItem[] => {
    return items.map((item) => {
      const defaultMatch = INITIAL_MENU_ITEMS.find((d) => d.id === item.id);
      if (defaultMatch && (item.image.startsWith('/src/assets/') || item.image.startsWith('/assets/images/'))) {
        return { ...item, image: defaultMatch.image };
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

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedJournalSlug]);

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
