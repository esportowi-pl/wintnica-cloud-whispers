
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SiteSettings {
  site_name: string;
  site_description: string;
  logo_url: string;
  primary_color: string;
  secondary_color: string;
  dark_mode_enabled: boolean;
  maintenance_mode: boolean;
  email_confirmation_required: boolean;
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: 'Witnica.info',
    site_description: 'Portal miejski dla mieszkańców Witnicy',
    logo_url: '',
    primary_color: '#3b82f6',
    secondary_color: '#64748b',
    dark_mode_enabled: true,
    maintenance_mode: false,
    email_confirmation_required: true
  });
  const [loading, setLoading] = useState(true);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');

      if (error) throw error;

      const settingsObj: any = {};
      data?.forEach(item => {
        try {
          settingsObj[item.key] = JSON.parse(item.value as string);
        } catch (e) {
          console.error('Error parsing setting value:', item.key, item.value);
          settingsObj[item.key] = item.value;
        }
      });

      setSettings(prev => ({ ...prev, ...settingsObj }));
    } catch (error) {
      console.error('Error loading site settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: keyof SiteSettings, value: any) => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key,
          value: JSON.stringify(value),
          updated_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      setSettings(prev => ({ ...prev, [key]: value }));

      // Log admin activity
      await supabase.rpc('log_admin_activity', {
        _action: `Updated setting: ${key}`,
        _target_type: 'site_settings',
        _details: { key, value }
      });
    } catch (error) {
      console.error('Error updating setting:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return { settings, updateSetting, loading, reload: loadSettings };
}
