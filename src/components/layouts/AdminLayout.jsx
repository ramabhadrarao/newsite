import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import {
  LayoutDashboard,
  FileText,
  Menu as MenuIcon,
  Layout,
  Image,
  Settings,
  LogOut,
  X,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Pages', href: '/admin/pages', icon: FileText },
  { name: 'Menus', href: '/admin/menus', icon: MenuIcon },
  { name: 'Sections', href: '/admin/sections', icon: Layout },
  { name: 'Media', href: '/admin/media', icon: Image },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { signOut, user } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:static`}
        >
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <span className="text-xl font-bold text-primary-600">CMS Admin</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t">
            <div className="mb-4 px-4">
              <div className="text-sm font-medium text-gray-900">{user?.email}</div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-3 px-4 py-3 w-full text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-screen">
          <header className="bg-white border-b h-16 flex items-center px-6 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <span className="ml-4 text-lg font-semibold">CMS Admin</span>
          </header>

          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
