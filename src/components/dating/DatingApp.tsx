
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useDatingData } from "./hooks/useDatingData";
import DiscoverTab from "./DiscoverTab";
import MatchesTab from "./MatchesTab";
import ProfileTab from "./ProfileTab";
import CreateProfilePrompt from "./CreateProfilePrompt";

const DatingApp: React.FC = () => {
  const { user } = useAuth();
  const {
    profiles,
    matches,
    currentIndex,
    loading,
    userProfile,
    setCurrentIndex,
    handleSwipe,
    loadProfiles
  } = useDatingData();

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <p>Musisz się zalogować, aby korzystać z aplikacji randkowej.</p>
      </div>
    );
  }

  if (!userProfile) {
    return <CreateProfilePrompt />;
  }

  const handleRefresh = () => {
    setCurrentIndex(0);
    loadProfiles();
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-gradient-to-br from-pink-50 to-red-50">
      <Tabs defaultValue="discover" className="h-full flex flex-col">
        <div className="flex-1 overflow-hidden">
          <TabsContent value="discover" className="h-full p-4">
            <div className="h-full relative">
              <DiscoverTab
                profiles={profiles}
                currentIndex={currentIndex}
                loading={loading}
                onSwipe={handleSwipe}
                onRefresh={handleRefresh}
              />
            </div>
          </TabsContent>

          <TabsContent value="matches" className="h-full p-4">
            <MatchesTab matches={matches} />
          </TabsContent>

          <TabsContent value="profile" className="h-full p-4">
            <ProfileTab userProfile={userProfile} />
          </TabsContent>
        </div>

        <TabsList className="grid w-full grid-cols-3 h-16">
          <TabsTrigger value="discover" className="flex flex-col gap-1">
            <Heart className="h-5 w-5" />
            <span className="text-xs">Odkrywaj</span>
          </TabsTrigger>
          <TabsTrigger value="matches" className="flex flex-col gap-1">
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs">Dopasowania</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex flex-col gap-1">
            <User className="h-5 w-5" />
            <span className="text-xs">Profil</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default DatingApp;
