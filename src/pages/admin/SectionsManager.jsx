import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

export default function SectionsManager() {
  const [editingSection, setEditingSection] = useState(null);
  const queryClient = useQueryClient();

  const { data: sections } = useQuery({
    queryKey: ['all-sections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sections')
        .select('*, pages(title, slug)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const { data: pages } = useQuery({
    queryKey: ['pages-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('id, title, slug')
        .order('title');
      if (error) throw error;
      return data || [];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (sectionData) => {
      const { error } = await supabase.from('sections').insert([sectionData]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-sections']);
      setEditingSection(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }) => {
      const { error } = await supabase.from('sections').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-sections']);
      setEditingSection(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('sections').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries(['all-sections']),
  });

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const sectionData = {
      page_id: formData.get('page_id') || null,
      name: formData.get('name'),
      type: formData.get('type'),
      content: JSON.parse(formData.get('content') || '{}'),
      sort_order: parseInt(formData.get('sort_order')),
      is_active: formData.get('is_active') === 'on',
    };

    try {
      if (editingSection?.id) {
        await updateMutation.mutateAsync({ id: editingSection.id, ...sectionData });
      } else {
        await createMutation.mutateAsync(sectionData);
      }
    } catch (error) {
      alert('Failed to save section: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this section?')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        alert('Failed to delete: ' + error.message);
      }
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Sections</h1>
        <p className="text-gray-600 mt-1">Manage dynamic page sections</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">All Sections</h2>
            <button
              onClick={() => setEditingSection({ name: '', type: 'html', content: '{}', sort_order: 0, is_active: true })}
              className="btn-primary inline-flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Section
            </button>
          </div>

          <div className="space-y-3">
            {sections?.map((section) => (
              <div key={section.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{section.name}</h3>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                        {section.type}
                      </span>
                      {section.is_active ? (
                        <Eye className="h-4 w-4 text-green-600" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    {section.pages && (
                      <p className="text-sm text-gray-600 mt-1">
                        Page: {section.pages.title}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingSection(section)}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(section.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {sections?.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No sections yet. Create your first section!
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {editingSection?.id ? 'Edit Section' : 'New Section'}
          </h2>

          {editingSection ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  name="name"
                  defaultValue={editingSection.name}
                  required
                  className="input-field"
                  placeholder="Hero Banner, Features, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                <select name="type" defaultValue={editingSection.type} required className="input-field">
                  <option value="banner">Banner</option>
                  <option value="cards">Cards</option>
                  <option value="list">List</option>
                  <option value="html">HTML</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Page</label>
                <select name="page_id" defaultValue={editingSection.page_id || ''} className="input-field">
                  <option value="">Global Section</option>
                  {pages?.map((page) => (
                    <option key={page.id} value={page.id}>
                      {page.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content (JSON) *</label>
                <textarea
                  name="content"
                  defaultValue={JSON.stringify(editingSection.content || {}, null, 2)}
                  rows={6}
                  required
                  className="input-field font-mono text-sm"
                  placeholder='{"title": "Title", "items": []}'
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                <input
                  name="sort_order"
                  type="number"
                  defaultValue={editingSection.sort_order || 0}
                  className="input-field"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="is_active"
                  defaultChecked={editingSection.is_active}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">Active</label>
              </div>

              <div className="flex space-x-2">
                <button type="submit" className="btn-primary flex-1">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingSection(null)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Select or create a section to edit
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
