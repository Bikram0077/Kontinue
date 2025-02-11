import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Save, Loader, Plus, AlertCircle } from 'lucide-react';

interface ContentSection {
  id: string;
  section: string;
  title: string;
  description: string;
  image_url?: string;
}

const ContentEditor = () => {
  const [content, setContent] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .order('section', { ascending: true });

      if (error) throw error;
      setContent(data || []);
      setError(null);
    } catch (error: any) {
      console.error('Error fetching content:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (id: string, updates: Partial<ContentSection>) => {
    setSaving(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const { error } = await supabase
        .from('website_content')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      setSuccessMessage('Content updated successfully!');
      await fetchContent();
    } catch (error: any) {
      console.error('Error updating content:', error);
      setError(error.message);
    } finally {
      setSaving(false);
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const addNewContent = async () => {
    try {
      setError(null);
      const { error } = await supabase
        .from('website_content')
        .insert([{
          section: 'new-section',
          title: 'New Section',
          description: 'Enter description here'
        }]);

      if (error) throw error;
      setSuccessMessage('New section added successfully!');
      await fetchContent();
    } catch (error: any) {
      console.error('Error adding content:', error);
      setError(error.message);
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Content Editor</h1>
        <button
          onClick={addNewContent}
          className="flex items-center space-x-2 bg-[#A60000] text-white px-4 py-2 rounded-md hover:bg-[#8a0000]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Section</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded flex items-center">
          <AlertCircle className="w-4 h-4 mr-2" />
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-2 rounded flex items-center">
          <Save className="w-4 h-4 mr-2" />
          {successMessage}
        </div>
      )}

      <div className="grid gap-6">
        {content.map((item) => (
          <div key={item.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200">Section</label>
                <input
                  type="text"
                  value={item.section}
                  onChange={(e) => handleSave(item.id, { section: e.target.value })}
                  className="mt-1 block w-full bg-white/5 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">Title</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleSave(item.id, { title: e.target.value })}
                  className="mt-1 block w-full bg-white/5 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">Description</label>
                <textarea
                  value={item.description}
                  onChange={(e) => handleSave(item.id, { description: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full bg-white/5 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">Image URL</label>
                <input
                  type="text"
                  value={item.image_url || ''}
                  onChange={(e) => handleSave(item.id, { image_url: e.target.value })}
                  className="mt-1 block w-full bg-white/5 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
                />
              </div>
              {item.image_url && (
                <div className="mt-2">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
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

export default ContentEditor;