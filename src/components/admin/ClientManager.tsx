import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Edit, Trash, Save, Loader } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  logo_url: string;
}

const ClientManager = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (id: string, updates: Partial<Client>) => {
    try {
      const { error } = await supabase
        .from('clients')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      setEditing(null);
      await fetchClients();
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchClients();
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const addNewClient = async () => {
    try {
      const { error } = await supabase
        .from('clients')
        .insert([{
          name: 'New Client',
          logo_url: ''
        }]);

      if (error) throw error;
      await fetchClients();
    } catch (error) {
      console.error('Error adding client:', error);
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
        <h1 className="text-2xl font-bold text-white">Client Manager</h1>
        <button
          onClick={addNewClient}
          className="flex items-center space-x-2 bg-[#A60000] text-white px-4 py-2 rounded-md hover:bg-[#8a0000]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client</span>
        </button>
      </div>

      <div className="grid gap-6">
        {clients.map((client) => (
          <div key={client.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {client.logo_url && (
                  <img
                    src={client.logo_url}
                    alt={client.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div>
                  {editing === client.id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-200">Name</label>
                        <input
                          type="text"
                          value={client.name}
                          onChange={(e) => handleSave(client.id, { name: e.target.value })}
                          className="mt-1 block w-full bg-white/5 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-200">Logo URL</label>
                        <input
                          type="text"
                          value={client.logo_url || ''}
                          onChange={(e) => handleSave(client.id, { logo_url: e.target.value })}
                          className="mt-1 block w-full bg-white/5 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
                        />
                      </div>
                    </div>
                  ) : (
                    <h3 className="text-xl font-semibold text-white">{client.name}</h3>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditing(client.id === editing ? null : client.id)}
                  className="p-2 text-gray-300 hover:text-white"
                >
                  {editing === client.id ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="p-2 text-gray-300 hover:text-red-500"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientManager;