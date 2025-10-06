import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2, GripVertical, ChevronRight } from 'lucide-react';

export default function MenuManager() {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const queryClient = useQueryClient();

  const { data: menus } = useQuery({
    queryKey: ['menus'],
    queryFn: async () => {
      const { data, error } = await supabase.from('menus').select('*').order('name');
      if (error) throw error;
      return data || [];
    },
  });

  const { data: menuItems } = useQuery({
    queryKey: ['menu-items', selectedMenu],
    queryFn: async () => {
      if (!selectedMenu) return [];
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('menu_id', selectedMenu)
        .order('sort_order');
      if (error) throw error;
      return data || [];
    },
    enabled: !!selectedMenu,
  });

  const { data: pages } = useQuery({
    queryKey: ['pages-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('id, title, slug')
        .eq('status', 'published')
        .order('title');
      if (error) throw error;
      return data || [];
    },
  });

  const createMenuMutation = useMutation({
    mutationFn: async (menuData) => {
      const { error } = await supabase.from('menus').insert([menuData]);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries(['menus']),
  });

  const createMenuItemMutation = useMutation({
    mutationFn: async (itemData) => {
      const { error } = await supabase.from('menu_items').insert([itemData]);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries(['menu-items']),
  });

  const updateMenuItemMutation = useMutation({
    mutationFn: async ({ id, ...data }) => {
      const { error } = await supabase.from('menu_items').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['menu-items']);
      setEditingItem(null);
    },
  });

  const deleteMenuItemMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('menu_items').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries(['menu-items']),
  });

  const handleCreateMenu = async () => {
    const name = prompt('Enter menu name (e.g., main-menu, footer-menu):');
    if (!name) return;

    const label = prompt('Enter menu label:');
    if (!label) return;

    try {
      await createMenuMutation.mutateAsync({ name, label, location: 'header' });
    } catch (error) {
      alert('Failed to create menu: ' + error.message);
    }
  };

  const handleAddMenuItem = () => {
    setEditingItem({
      menu_id: selectedMenu,
      label: '',
      url: '',
      page_id: null,
      parent_id: null,
      sort_order: menuItems?.length || 0,
      target: '_self',
    });
  };

  const handleSaveMenuItem = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const itemData = {
      label: formData.get('label'),
      url: formData.get('url'),
      page_id: formData.get('page_id') || null,
      parent_id: formData.get('parent_id') || null,
      sort_order: parseInt(formData.get('sort_order')),
      target: formData.get('target'),
      menu_id: selectedMenu,
    };

    try {
      if (editingItem.id) {
        await updateMenuItemMutation.mutateAsync({ id: editingItem.id, ...itemData });
      } else {
        await createMenuItemMutation.mutateAsync(itemData);
      }
    } catch (error) {
      alert('Failed to save menu item: ' + error.message);
    }
  };

  const handleDeleteMenuItem = async (id) => {
    if (window.confirm('Delete this menu item?')) {
      try {
        await deleteMenuItemMutation.mutateAsync(id);
      } catch (error) {
        alert('Failed to delete menu item: ' + error.message);
      }
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Menu Manager</h1>
        <p className="text-gray-600 mt-1">Create and manage navigation menus</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Menus</h2>
            <button onClick={handleCreateMenu} className="text-primary-600 hover:text-primary-700">
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-2">
            {menus?.map((menu) => (
              <button
                key={menu.id}
                onClick={() => setSelectedMenu(menu.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  selectedMenu === menu.id
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">{menu.label}</div>
                <div className="text-sm text-gray-500">{menu.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 card">
          {!selectedMenu ? (
            <div className="text-center py-12 text-gray-500">
              Select a menu to manage its items
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Menu Items</h2>
                <button onClick={handleAddMenuItem} className="btn-primary inline-flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </button>
              </div>

              {editingItem && (
                <form onSubmit={handleSaveMenuItem} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Label *</label>
                    <input
                      name="label"
                      defaultValue={editingItem.label}
                      required
                      className="input-field"
                      placeholder="Home, About, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Link Page</label>
                    <select name="page_id" defaultValue={editingItem.page_id || ''} className="input-field">
                      <option value="">Custom URL</option>
                      {pages?.map((page) => (
                        <option key={page.id} value={page.id}>
                          {page.title} (/{page.slug})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Custom URL</label>
                    <input
                      name="url"
                      defaultValue={editingItem.url}
                      className="input-field"
                      placeholder="/about or https://example.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                      <input
                        name="sort_order"
                        type="number"
                        defaultValue={editingItem.sort_order}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
                      <select name="target" defaultValue={editingItem.target} className="input-field">
                        <option value="_self">Same Window</option>
                        <option value="_blank">New Window</option>
                      </select>
                    </div>
                  </div>

                  <input type="hidden" name="parent_id" value={editingItem.parent_id || ''} />

                  <div className="flex space-x-2">
                    <button type="submit" className="btn-primary">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-2">
                {menuItems?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-white border rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center space-x-3">
                      <GripVertical className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-500">{item.url || 'Linked to page'}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMenuItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {menuItems?.length === 0 && !editingItem && (
                  <div className="text-center py-8 text-gray-500">
                    No menu items yet. Add your first item!
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
