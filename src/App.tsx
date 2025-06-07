
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DesktopPage from './pages/DesktopPage';
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

// Providers
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/hooks/useAuth';
import { Toaster } from "sonner";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/desktop" element={<DesktopPage />} />
            <Route path="/login" element={<AuthPage />} />
            
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
            
            {/* Feature pages */}
            <Route path="/classifieds" element={<ClassifiedsPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/dating" element={<DatingPortalPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/groups" element={<LocalGroupsPage />} />
            <Route path="/rynek" element={<MarketplacePage />} />
            <Route path="/gazeta" element={<GazettePage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
