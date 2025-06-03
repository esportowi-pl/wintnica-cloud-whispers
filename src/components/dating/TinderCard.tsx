
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, X, MapPin, Verified } from "lucide-react";
import { motion, PanInfo } from "framer-motion";

interface DatingProfile {
  id: string;
  display_name: string;
  age: number;
  bio?: string;
  location?: string;
  photos: string[];
  verified: boolean;
  interests?: string[];
}

interface TinderCardProps {
  profile: DatingProfile;
  onSwipe: (profileId: string, liked: boolean) => void;
  zIndex: number;
}

const TinderCard: React.FC<TinderCardProps> = ({ profile, onSwipe, zIndex }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold) {
      const liked = info.offset.x > 0;
      onSwipe(profile.id, liked);
    }
  };

  const handleDrag = (event: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 50) {
      setDragDirection(info.offset.x > 0 ? 'right' : 'left');
    } else {
      setDragDirection(null);
    }
  };

  const handleLike = () => onSwipe(profile.id, true);
  const handlePass = () => onSwipe(profile.id, false);

  const nextPhoto = () => {
    if (profile.photos.length > 1) {
      setCurrentPhoto((prev) => (prev + 1) % profile.photos.length);
    }
  };

  const prevPhoto = () => {
    if (profile.photos.length > 1) {
      setCurrentPhoto((prev) => (prev - 1 + profile.photos.length) % profile.photos.length);
    }
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ zIndex }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
      animate={{ 
        rotate: dragDirection === 'right' ? 10 : dragDirection === 'left' ? -10 : 0,
        opacity: Math.abs(dragDirection === 'right' ? 1 : dragDirection === 'left' ? 1 : 1)
      }}
      exit={{ 
        x: dragDirection === 'right' ? 300 : -300, 
        opacity: 0,
        transition: { duration: 0.3 }
      }}
    >
      <Card className="h-full w-full overflow-hidden bg-gradient-to-b from-transparent to-black/60 relative">
        {/* Photo indicators */}
        {profile.photos.length > 1 && (
          <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
            {profile.photos.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full ${
                  index === currentPhoto ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        )}

        {/* Main photo */}
        <div className="h-full w-full relative">
          <img
            src={profile.photos[currentPhoto] || '/placeholder.svg'}
            alt={profile.display_name}
            className="h-full w-full object-cover"
            onClick={nextPhoto}
          />
          
          {/* Swipe indicators */}
          {dragDirection && (
            <div className={`absolute inset-0 flex items-center justify-center ${
              dragDirection === 'right' ? 'text-green-500' : 'text-red-500'
            }`}>
              <div className={`text-6xl font-bold border-4 rounded-lg px-8 py-4 ${
                dragDirection === 'right' 
                  ? 'border-green-500 text-green-500' 
                  : 'border-red-500 text-red-500'
              }`}>
                {dragDirection === 'right' ? 'LIKE' : 'NOPE'}
              </div>
            </div>
          )}
        </div>

        {/* Profile info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold">
              {profile.display_name}, {profile.age}
            </h2>
            {profile.verified && (
              <Verified className="h-6 w-6 text-blue-400 fill-current" />
            )}
          </div>

          {profile.location && (
            <div className="flex items-center gap-1 mb-3">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{profile.location}</span>
            </div>
          )}

          {profile.bio && (
            <p className="text-sm mb-3 line-clamp-2">{profile.bio}</p>
          )}

          {profile.interests && profile.interests.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.interests.slice(0, 3).map((interest, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
              {profile.interests.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{profile.interests.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full h-14 w-14 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={handlePass}
            >
              <X className="h-6 w-6" />
            </Button>
            <Button
              size="lg"
              className="rounded-full h-14 w-14 bg-green-500 hover:bg-green-600"
              onClick={handleLike}
            >
              <Heart className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TinderCard;
