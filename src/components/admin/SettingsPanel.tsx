import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Settings, Save, Loader } from 'lucide-react';

interface SiteSettings {
  id: string;
  site_title: string;
  contact_email: string;
  youtube_url: string;
  facebook_url: string;
}

const SettingsPanel = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updates: Partial<SiteSettings>) => {
    setSaving(true);
    try {
      if (settings?.id) {
        const { error } = await supabase
          .from('site_settings')
          .update(updates)
          .eq('id', settings.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('site_settings')
          .insert([{ ...updates }]);
        if (error) throw error;
      }
      await fetchSettings();
    } catch (error) {
      console.error('Error updating settings:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Settings className="w-6 h-6 text-white" />
        <h1 className="text-2xl font-bold text-white">Settings</h1>
      </div>

      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-4">General Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200">Site Title</label>
            <input
              type="text"
              value={settings?.site_title || ''}
              onChange={(e) => handleSave({ site_title: e.target.value })}
              className="mt-1 block w-full bg-white/5 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
              placeholder="Kontinue Creations"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Contact Email</label>
            <input
              type="email"
              value={settings?.contact_email || ''}
              onChange={(e) => handleSave({ contact_email: e.target.value })}
              className="mt-1 block w-full bg-white/5 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
              placeholder="kontinuecreations@gmail.com"
            />
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Social Media Links</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200">YouTube Channel</label>
            <input
              type="url"
              value={settings?.youtube_url || ''}
              onChange={(e) => handleSave({ youtube_url: e.target.value })}
              className="mt-1 block w-full bg-white/5 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
              placeholder="https://youtube.com/@Program_Host_Kontinue_Creation"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Facebook Page</label>
            <input
              type="url"
              value={settings?.facebook_url || ''}
              onChange={(e) => handleSave({ facebook_url: e.target.value })}
              className="mt-1 block w-full bg-white/5 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
              placeholder="https://facebook.com/profile.php?id=61567340320817"
            />
          </div>
        </div>
      </div>

      {saving && (
        <div className="fixed bottom-4 right-4 bg-[#A60000] text-white px-4 py-2 rounded-md flex items-center space-x-2">
          <Loader className="w-4 h-4 animate-spin" />
          <span>Saving changes...</span>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;