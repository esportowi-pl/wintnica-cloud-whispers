
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ContentCreationPage from "./pages/ContentCreationPage";
import AuthPage from "./pages/AuthPage";
import PremiumPage from "./pages/PremiumPage";
import ChatPage from "./pages/ChatPage";
import ClassifiedsPage from "./pages/ClassifiedsPage";
import EventsPage from "./pages/EventsPage";
import NotFound from "./pages/NotFound";
import AdminPanelPage from "./pages/AdminPanelPage";
import EnhancedAdminPanelPage from "./pages/EnhancedAdminPanelPage";
import UserPanelPage from "./pages/UserPanelPage";
import EnhancedUserProfilePage from "./pages/EnhancedUserProfilePage";
import DatingPortalPage from "./pages/DatingPortalPage";
import EnhancedDatingPortalPage from "./pages/EnhancedDatingPortalPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Original Witnica.info pages */}
          <Route path="/original" element={<Index />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/ogloszenia" element={<ClassifiedsPage />} />
          <Route path="/wydarzenia" element={<EventsPage />} />
          
          {/* New CMS pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home-classic" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/new-content" element={<ContentCreationPage />} />
          <Route path="/dashboard/edit-content/:id" element={<ContentCreationPage />} />
          <Route path="/premium" element={<PremiumPage />} />
          
          {/* New Admin, User and Dating Portal pages */}
          <Route path="/admin" element={<EnhancedAdminPanelPage />} />
          <Route path="/admin-classic" element={<AdminPanelPage />} />
          <Route path="/user" element={<UserPanelPage />} />
          <Route path="/profile/:username" element={<EnhancedUserProfilePage />} />
          <Route path="/randki" element={<EnhancedDatingPortalPage />} />
          <Route path="/dating-classic" element={<DatingPortalPage />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
