
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DesktopPage from './pages/DesktopPage';
import Desktop2Page from './pages/Desktop2Page';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import UserPanelPage from './pages/UserPanelPage';
import NotFound from './pages/NotFound';
import AdminPanelPage from './pages/AdminPanelPage';
import EnhancedAdminPanelPage from './pages/EnhancedAdminPanelPage';
import AdminLoginPage from './pages/AdminLoginPage';
import CmsManagerPage from './pages/CmsManagerPage';
import ContentCreationPage from './pages/ContentCreationPage';
import ClassifiedsPage from './pages/ClassifiedsPage';
import ChatPage from './pages/ChatPage';
import EventsPage from './pages/EventsPage';
import DatingPortalPage from './pages/DatingPortalPage';
import PremiumPage from './pages/PremiumPage';
import LocalGroupsPage from './pages/LocalGroupsPage';
import MarketplacePage from './pages/MarketplacePage';
import GazettePage from './pages/GazettePage';
import RekreacjaPage from './pages/RekreacjaPage';
import BrowarPage from './pages/BrowarPage';
import GaleriaPage from './pages/GaleriaPage';
import TvPage from './pages/TvPage';
import LivePage from './pages/LivePage';
import GamingPage from './pages/GamingPage';
import StrumykiPage from './pages/StrumykiPage';
import SzeptyPage from './pages/SzeptyPage';
import Hidden1Page from './pages/Hidden1Page';
import Hidden2Page from './pages/Hidden2Page';
import Hidden3Page from './pages/Hidden3Page';

// New test homepage variants
import TestHomeV1 from './pages/TestHomeV1';
import TestHomeV2 from './pages/TestHomeV2';
import TestHomeV3 from './pages/TestHomeV3';
import TestHomeV4 from './pages/TestHomeV4';

// Providers
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/hooks/useAuth';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import { Toaster } from "sonner";

// Components
import AnimatedURLDisplay from '@/components/layout/AnimatedURLDisplay';
import AccessibilityPanel from '@/components/accessibility/AccessibilityPanel';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AccessibilityProvider>
          <Router>
            <AnimatedURLDisplay />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/desktop" element={<DesktopPage />} />
              <Route path="/desktop2" element={<Desktop2Page />} />
              <Route path="/login" element={<AuthPage />} />
              
              {/* Test Homepage Variants */}
              <Route path="/test-home-v1" element={<TestHomeV1 />} />
              <Route path="/test-home-v2" element={<TestHomeV2 />} />
              <Route path="/test-home-v3" element={<TestHomeV3 />} />
              <Route path="/test-home-v4" element={<TestHomeV4 />} />
              
              {/* Hidden Pages */}
              <Route path="/hidden1" element={<Hidden1Page />} />
              <Route path="/hidden2" element={<Hidden2Page />} />
              <Route path="/hidden3" element={<Hidden3Page />} />
              
              {/* Dashboard routes */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/content" element={<DashboardPage />} />
              <Route path="/dashboard/new-content" element={<ContentCreationPage />} />
              <Route path="/dashboard/edit-content/:id" element={<ContentCreationPage />} />
              <Route path="/dashboard/stats/:id" element={<DashboardPage />} />
              <Route path="/dashboard/settings" element={<DashboardPage />} />
              
              {/* User routes */}
              <Route path="/profile" element={<UserPanelPage />} />
              <Route path="/content/:id" element={<HomePage />} />
              
              {/* Admin routes */}
              <Route path="/admin-login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<EnhancedAdminPanelPage />} />
              <Route path="/admin-enhanced" element={<EnhancedAdminPanelPage />} />
              
              {/* CMS Manager routes */}
              <Route path="/cms" element={<CmsManagerPage />} />
              <Route path="/cms/content" element={<CmsManagerPage />} />
              <Route path="/cms/content/articles" element={<CmsManagerPage />} />
              <Route path="/cms/content/pages" element={<CmsManagerPage />} />
              <Route path="/cms/content/media" element={<CmsManagerPage />} />
              <Route path="/cms/groups" element={<CmsManagerPage />} />
              <Route path="/cms/groups/list" element={<CmsManagerPage />} />
              <Route path="/cms/groups/requests" element={<CmsManagerPage />} />
              <Route path="/cms/market" element={<CmsManagerPage />} />
              <Route path="/cms/market/listings" element={<CmsManagerPage />} />
              <Route path="/cms/market/categories" element={<CmsManagerPage />} />
              <Route path="/cms/gazette" element={<CmsManagerPage />} />
              <Route path="/cms/gazette/issues" element={<CmsManagerPage />} />
              <Route path="/cms/gazette/subscriptions" element={<CmsManagerPage />} />
              <Route path="/cms/handmade" element={<CmsManagerPage />} />
              <Route path="/cms/handmade/products" element={<CmsManagerPage />} />
              <Route path="/cms/handmade/creators" element={<CmsManagerPage />} />
              <Route path="/cms/settings" element={<CmsManagerPage />} />
              
              {/* Content creation */}
              <Route path="/editor" element={<ContentCreationPage />} />
              
              {/* Feature pages - Updated with new names and routes */}
              <Route path="/classifieds" element={<ClassifiedsPage />} />
              <Route path="/ogloszenia" element={<ClassifiedsPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/wydarzenia" element={<EventsPage />} />
              <Route path="/dating" element={<DatingPortalPage />} />
              <Route path="/randki" element={<DatingPortalPage />} />
              <Route path="/premium" element={<PremiumPage />} />
              <Route path="/groups" element={<LocalGroupsPage />} />
              <Route path="/grupy" element={<LocalGroupsPage />} />
              <Route path="/rynek" element={<MarketplacePage />} />
              <Route path="/gazeta" element={<GazettePage />} />
              <Route path="/rekreacja" element={<RekreacjaPage />} />
              <Route path="/browar" element={<BrowarPage />} />
              <Route path="/galeria" element={<GaleriaPage />} />
              
              {/* New social features */}
              <Route path="/tv" element={<TvPage />} />
              <Route path="/live" element={<LivePage />} />
              <Route path="/gaming" element={<GamingPage />} />
              <Route path="/strumyki" element={<StrumykiPage />} />
              <Route path="/szepty" element={<SzeptyPage />} />
              
              {/* Additional routes */}
              <Route path="/aktualnosci" element={<HomePage />} />
              <Route path="/pogoda" element={<HomePage />} />
              <Route path="/mapa" element={<HomePage />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <AccessibilityPanel />
          </Router>
          <Toaster position="top-right" />
        </AccessibilityProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
