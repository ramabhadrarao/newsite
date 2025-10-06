import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';

export default function PageView() {
  const { slug } = useParams();

  const { data: page, isLoading } = useQuery({
    queryKey: ['page', slug],
    queryFn: async () => {
      const data = await api.get(`/pages/slug/${slug}`);
      return data;
    },
  });

  const { data: sections } = useQuery({
    queryKey: ['sections', page?.id],
    queryFn: async () => {
      if (!page?.id) return [];
      const items = await api.get(`/sections/by-page/${page.id}`);
      return items || [];
    },
    enabled: !!page?.id,
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600">The page you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{page.title}</h1>
          {page.meta_description && (
            <p className="text-xl text-gray-600">{page.meta_description}</p>
          )}
        </header>

        <div className="space-y-12">
          {sections?.map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))}

          {page.content && typeof page.content === 'object' && page.content.html && (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content.html }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function SectionRenderer({ section }) {
  const content = section.content || {};

  switch (section.type) {
    case 'banner':
      return (
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
          {content.description && <p className="text-xl">{content.description}</p>}
        </div>
      );

    case 'cards':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items?.map((item, index) => (
            <div key={index} className="card">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      );

    case 'list':
      return (
        <div className="bg-white rounded-lg border border-gray-200 divide-y">
          {content.items?.map((item, index) => (
            <div key={index} className="p-4">
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              {item.description && <p className="text-gray-600 mt-1">{item.description}</p>}
            </div>
          ))}
        </div>
      );

    case 'html':
      return (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: content.html }}
        />
      );

    default:
      return (
        <div className="card">
          <pre className="text-sm text-gray-600 overflow-auto">
            {JSON.stringify(content, null, 2)}
          </pre>
        </div>
      );
  }
}
