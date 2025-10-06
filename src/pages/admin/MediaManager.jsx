import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Upload, FileText, Image as ImageIcon } from 'lucide-react';

export default function MediaManager() {
  const { data: media } = useQuery({
    queryKey: ['media'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
        <p className="text-gray-600 mt-1">Manage uploaded files and images</p>
      </div>

      <div className="card mb-6">
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Media upload functionality</p>
          <p className="text-sm text-gray-500">
            File uploads can be implemented using Supabase Storage
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Existing Files</h2>

        {media && media.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {media.map((file) => (
              <div key={file.id} className="border rounded-lg p-3 hover:shadow-sm transition-shadow">
                <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                  {file.mime_type?.startsWith('image/') ? (
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  ) : (
                    <FileText className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                <p className="text-sm font-medium text-gray-900 truncate" title={file.filename}>
                  {file.filename}
                </p>
                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No media files uploaded yet
          </div>
        )}
      </div>
    </div>
  );
}
