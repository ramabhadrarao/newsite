import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import { Save } from 'lucide-react';

export default function SettingsManager() {
  const queryClient = useQueryClient();

  const { data: settings } = useQuery({
    queryKey: ['all-settings'],
    queryFn: async () => {
      const { data, error } = await supabase.from('settings').select('*').order('group');
      if (error) throw error;
      return data || [];
    },
  });

  const { register, handleSubmit, reset } = useForm();

  React.useEffect(() => {
    if (settings) {
      const formData = {};
      settings.forEach((setting) => {
        formData[setting.key] = setting.value?.value || setting.value;
      });
      reset(formData);
    }
  }, [settings, reset]);

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      const updates = Object.entries(data).map(([key, value]) => ({
        key,
        value: { value },
        updated_at: new Date().toISOString(),
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('settings')
          .upsert(update, { onConflict: 'key' });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-settings']);
      queryClient.invalidateQueries(['settings']);
      alert('Settings saved successfully!');
    },
  });

  const onSubmit = async (data) => {
    try {
      await saveMutation.mutateAsync(data);
    } catch (error) {
      alert('Failed to save settings: ' + error.message);
    }
  };

  const groupedSettings = React.useMemo(() => {
    if (!settings) return {};
    return settings.reduce((acc, setting) => {
      const group = setting.group || 'general';
      if (!acc[group]) acc[group] = [];
      acc[group].push(setting);
      return acc;
    }, {});
  }, [settings]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-600 mt-1">Configure your website settings</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {Object.entries(groupedSettings).map(([group, groupSettings]) => (
          <div key={group} className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6 capitalize">
              {group.replace(/-/g, ' ')}
            </h2>

            <div className="space-y-4">
              {groupSettings.map((setting) => (
                <div key={setting.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {setting.key.replace(/_/g, ' ')}
                  </label>
                  <input
                    {...register(setting.key)}
                    className="input-field"
                    placeholder={`Enter ${setting.key.replace(/_/g, ' ')}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={saveMutation.isPending}
            className="btn-primary inline-flex items-center disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {saveMutation.isPending ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
