import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CommerceProvider } from './context/CommerceContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { DesktopHeader } from './components/DesktopHeader';
import { MobileHeader } from './components/MobileHeader';
import { SearchDrawer } from './components/SearchDrawer';
import { CartDrawer } from './components/CartDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { WishlistPage } from './pages/WishlistPage';
import { ShippingReturnsPage } from './pages/ShippingReturnsPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <Router>
      <CommerceProvider>
        <div className="min-h-screen flex flex-col bg-white text-brand-black selection:bg-brand-red selection:text-white">
          <AnnouncementBar />
          <DesktopHeader />
          <MobileHeader />

          {/* Interactive Drawers & Overlays */}
          <SearchDrawer />
          <CartDrawer />
          <SizeGuideModal />

          {/* Page Routing */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/collections/:handle" element={<CollectionPage />} />
              <Route path="/products/:handle" element={<ProductDetailPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/pages/shipping-returns" element={<ShippingReturnsPage />} />
              <Route path="/pages/size-guide" element={<ShippingReturnsPage />} />
              <Route path="/pages/contact" element={<ContactPage />} />
              <Route path="/pages/about" element={<AboutPage />} />
              <Route path="/pages/privacy" element={<PrivacyPage />} />
              <Route path="/pages/terms" element={<TermsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </CommerceProvider>
    </Router>
  );
}

export default App;
