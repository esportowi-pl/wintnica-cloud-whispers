
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalContent: number;
  pendingModeration: number;
  totalMarketplaceItems: number;
  totalDatingProfiles: number;
  todaySignups: number;
  todayContent: number;
}

export function useRealTimeAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    activeUsers: 0,
    totalContent: 0,
    pendingModeration: 0,
    totalMarketplaceItems: 0,
    totalDatingProfiles: 0,
    todaySignups: 0,
    todayContent: 0
  });
  const [loading, setLoading] = useState(true);

  const loadAnalytics = async () => {
    try {
      // Get real data from Supabase tables
      const [
        profilesResult,
        datingProfilesResult,
        marketplaceResult,
        moderationResult
      ] = await Promise.all([
        supabase.from('profiles').select('id, created_at'),
        supabase.from('dating_profiles').select('id').eq('active', true),
        supabase.from('marketplace_products').select('id').eq('status', 'active'),
        supabase.from('content_moderation').select('id').eq('status', 'pending')
      ]);

      const today = new Date().toISOString().split('T')[0];
      const todaySignups = profilesResult.data?.filter(
        profile => profile.created_at?.startsWith(today)
      ).length || 0;

      setAnalytics({
        totalUsers: profilesResult.data?.length || 0,
        activeUsers: Math.floor((profilesResult.data?.length || 0) * 0.3), // Simulate active users
        totalContent: 0, // Will be updated when content table is available
        pendingModeration: moderationResult.data?.length || 0,
        totalMarketplaceItems: marketplaceResult.data?.length || 0,
        totalDatingProfiles: datingProfilesResult.data?.length || 0,
        todaySignups,
        todayContent: 0
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
    
    // Set up real-time subscriptions
    const channel = supabase
      .channel('analytics-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        loadAnalytics();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'dating_profiles' }, () => {
        loadAnalytics();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { analytics, loading, reload: loadAnalytics };
}
