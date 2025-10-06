import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';
import { Save, ArrowLeft } from 'lucide-react';

export default function PageEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const isEditing = !!id;

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      slug: '',
      meta_title: '',
      meta_description: '',
      template: 'default',
      status: 'draft',
      content: '{}',
    },
  });

  const { data: page } = useQuery({
    queryKey: ['page', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: isEditing,
  });

  useEffect(() => {
    if (page) {
      reset({
        title: page.title,
        slug: page.slug,
        meta_title: page.meta_title || '',
        meta_description: page.meta_description || '',
        template: page.template,
        status: page.status,
        content: JSON.stringify(page.content || {}, null, 2),
      });
    }
  }, [page, reset]);

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      const pageData = {
        title: data.title,
        slug: data.slug,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        template: data.template,
        status: data.status,
        content: JSON.parse(data.content || '{}'),
        updated_at: new Date().toISOString(),
      };

      if (isEditing) {
        const { error } = await supabase
          .from('pages')
          .update(pageData)
          .eq('id', id);
        if (error) throw error;
      } else {
        pageData.created_by = user.id;
        const { error } = await supabase.from('pages').insert([pageData]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['pages']);
      navigate('/admin/pages');
    },
  });

  const onSubmit = async (data) => {
    try {
      await saveMutation.mutateAsync(data);
    } catch (error) {
      alert('Failed to save page: ' + error.message);
    }
  };

  const titleValue = watch('title');

  useEffect(() => {
    if (!isEditing && titleValue) {
      const slug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      reset((formValues) => ({ ...formValues, slug }));
    }
  }, [titleValue, isEditing, reset]);

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/admin/pages')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Pages
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Edit Page' : 'Create New Page'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page Title *
              </label>
              <input
                {...register('title', { required: 'Title is required' })}
                className="input-field"
                placeholder="e.g., Computer Science Department"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug *
              </label>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">/</span>
                <input
                  {...register('slug', { required: 'Slug is required' })}
                  className="input-field"
                  placeholder="computer-science-department"
                />
              </div>
              {errors.slug && (
                <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template
                </label>
                <select {...register('template')} className="input-field">
                  <option value="default">Default</option>
                  <option value="department">Department</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select {...register('status')} className="input-field">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">SEO Settings</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Title
              </label>
              <input
                {...register('meta_title')}
                className="input-field"
                placeholder="SEO-optimized title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                {...register('meta_description')}
                rows={3}
                className="input-field"
                placeholder="Brief description for search engines"
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Page Content (JSON)</h2>
          <p className="text-sm text-gray-600 mb-4">
            Enter structured content as JSON. Use sections for dynamic content.
          </p>
          <textarea
            {...register('content')}
            rows={10}
            className="input-field font-mono text-sm"
            placeholder='{"html": "<h1>Content</h1>"}'
          />
        </div>

        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/pages')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saveMutation.isPending}
            className="btn-primary inline-flex items-center disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {saveMutation.isPending ? 'Saving...' : 'Save Page'}
          </button>
        </div>
      </form>
    </div>
  );
}
