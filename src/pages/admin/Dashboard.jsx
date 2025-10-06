import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { FileText, Menu, LayoutGrid as Layout, Image } from 'lucide-react';

export default function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [pages, menus, sections, media] = await Promise.all([
        api.get('/pages'),
        api.get('/menus'),
        api.get('/sections'),
        api.get('/media'),
      ]);

      return {
        pages: pages.length || 0,
        menus: menus.length || 0,
        sections: sections.length || 0,
        media: media.length || 0,
      };
    },
  });

  const cards = [
    {
      title: 'Pages',
      count: stats?.pages || 0,
      icon: FileText,
      link: '/admin/pages',
      color: 'bg-blue-500',
    },
    {
      title: 'Menus',
      count: stats?.menus || 0,
      icon: Menu,
      link: '/admin/menus',
      color: 'bg-green-500',
    },
    {
      title: 'Sections',
      count: stats?.sections || 0,
      icon: Layout,
      link: '/admin/sections',
      color: 'bg-purple-500',
    },
    {
      title: 'Media',
      count: stats?.media || 0,
      icon: Image,
      link: '/admin/media',
      color: 'bg-orange-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your CMS admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{card.count}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link
              to="/admin/pages/new"
              className="block px-4 py-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors font-medium"
            >
              Create New Page
            </Link>
            <Link
              to="/admin/menus"
              className="block px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Manage Menus
            </Link>
            <Link
              to="/admin/settings"
              className="block px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Site Settings
            </Link>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Getting Started</h2>
          <div className="space-y-3 text-sm">
            <p className="text-gray-600">
              ✓ Create pages for departments (e.g., CSE, ECE, Mechanical)
            </p>
            <p className="text-gray-600">
              ✓ Add menu items to organize navigation
            </p>
            <p className="text-gray-600">
              ✓ Create sections to customize page layouts
            </p>
            <p className="text-gray-600">
              ✓ Upload media files for images and documents
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
