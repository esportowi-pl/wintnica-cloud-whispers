
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import UserPanelPage from './pages/UserPanelPage';
import NotFound from './pages/NotFound';
import AdminPanelPage from './pages/AdminPanelPage';
import EnhancedAdminPanelPage from './pages/EnhancedAdminPanelPage';
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
import { Toaster } from "sonner";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
          <Route path="/admin" element={<AdminPanelPage />} />
          <Route path="/admin-enhanced" element={<EnhancedAdminPanelPage />} />
          <Route path="/cms" element={<CmsManagerPage />} />
          
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
    </QueryClientProvider>
  );
}

export default App;
