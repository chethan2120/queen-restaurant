import React, { useEffect } from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { OrderOnlineModal } from './components/OrderOnlineModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { WhatsAppChatButton } from './components/WhatsAppChatButton';

// Page Views
import { HomeView } from './views/HomeView';
import { OurStoryView } from './views/OurStoryView';
import { MenuView } from './views/MenuView';
import { ExperiencesView } from './views/ExperiencesView';
import { LocationsView } from './views/LocationsView';
import { GalleryView } from './views/GalleryView';
import { JournalView } from './views/JournalView';
import { JournalDetailView } from './views/JournalDetailView';
import { QueensTableView } from './views/QueensTableView';
import { ContactView } from './views/ContactView';
import { FAQView } from './views/FAQView';
import { CMSAdminView } from './views/CMSAdminView';

const MainLayout: React.FC = () => {
  const { currentPage } = useCMS();

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView />;
      case 'our-story':
        return <OurStoryView />;
      case 'menu':
        return <MenuView />;
      case 'experiences':
        return <ExperiencesView />;
      case 'locations':
        return <LocationsView />;
      case 'gallery':
        return <GalleryView />;
      case 'journal':
        return <JournalView />;
      case 'journal-detail':
        return <JournalDetailView />;
      case 'queens-table':
        return <QueensTableView />;
      case 'contact':
        return <ContactView />;
      case 'faq':
        return <FAQView />;
      case 'cms-admin':
        return <CMSAdminView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE4] text-[#1E1714] font-sans antialiased selection:bg-[#5A1F24] selection:text-[#FCFAF5]">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Page Body */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Global Footer (hidden in CMS admin view for cleaner workspace) */}
      {currentPage !== 'cms-admin' && <Footer />}

      {/* Floating WhatsApp Action Utility */}
      <WhatsAppChatButton />

      {/* Global Interactive Modals */}
      <BookingModal />
      <OrderOnlineModal />
      <GlobalSearchModal />
    </div>
  );
};

export default function App() {
  return (
    <CMSProvider>
      <MainLayout />
    </CMSProvider>
  );
}
