import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Edit, Trash, Save, Loader } from 'lucide-react';

interface Podcast {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  publish_date: string;
  is_featured: boolean;
}

const PodcastManager = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    try {
      const { data, error } = await supabase
        .from('podcasts')
        .select('*')
        .order('publish_date', { ascending: false });

      if (error) throw error;
      setPodcasts(data || []);
    } catch (error) {
      console.error('Error fetching podcasts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (id: string, updates: Partial<Podcast>) => {
    try {
      const { error } = await supabase
        .from('podcasts')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      setEditing(null);
      await fetchPodcasts();
    } catch (error) {
      console.error('Error updating podcast:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('podcasts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchPodcasts();
    } catch (error) {
      console.error('Error deleting podcast:', error);
    }
  };

  const addNewPodcast = async () => {
    try {
      const { error } = await supabase
        .from('podcasts')
        .insert([{
          title: 'New Podcast',
          description: 'Enter description here',
          publish_date: new Date().toISOString(),
          is_featured: false
        }]);

      if (error) throw error;
      await fetchPodcasts();
    } catch (error) {
      console.error('Error adding podcast:', error);
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
        <h1 className="text-2xl font-bold text-white">Podcast Manager</h1>
        <button
          onClick={addNewPodcast}
          className="flex items-center space-x-2 bg-[#A60000] text-white px-4 py-2 rounded-md hover:bg-[#8a0000]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Podcast</span>
        </button>
      </div>

      <div className="grid gap-6">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
            <div className="space-y-4">
              {editing === podcast.id ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-200">Title</label>
                    <input
                      type="text"
                      value={podcast.title}
                      onChange={(e) => handleSave(podcast.id, { title: e.target.value })}
                      className="mt-1 block w-full bg-white/5 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200">Description</label>
                    <textarea
                      value={podcast.description}
                      onChange={(e) => handleSave(podcast.id, { description: e.target.value })}
                      rows={4}
                      className="mt-1 block w-full bg-white/5 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200">Video URL</label>
                    <input
                      type="text"
                      value={podcast.video_url || ''}
                      onChange={(e) => handleSave(podcast.id, { video_url: e.target.value })}
                      className="mt-1 block w-full bg-white/5 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200">Thumbnail URL</label>
                    <input
                      type="text"
                      value={podcast.thumbnail_url || ''}
                      onChange={(e) => handleSave(podcast.id, { thumbnail_url: e.target.value })}
                      className="mt-1 block w-full bg-white/5 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200">Publish Date</label>
                    <input
                      type="datetime-local"
                      value={podcast.publish_date?.slice(0, 16)}
                      onChange={(e) => handleSave(podcast.id, { publish_date: e.target.value })}
                      className="mt-1 block w-full bg-white/5 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={podcast.is_featured}
                      onChange={(e) => handleSave(podcast.id, { is_featured: e.target.checked })}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium text-gray-200">Featured</label>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <h3 className="text-xl font-semibold text-white">{podcast.title}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditing(podcast.id)}
                        className="p-2 text-gray-300 hover:text-white"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(podcast.id)}
                        className="p-2 text-gray-300 hover:text-red-500"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-300">{podcast.description}</p>
                  {podcast.thumbnail_url && (
                    <img
                      src={podcast.thumbnail_url}
                      alt={podcast.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastManager;