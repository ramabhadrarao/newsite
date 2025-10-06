import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Menu, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('*');
      if (error) throw error;
      return data.reduce((acc, item) => {
        acc[item.key] = item.value?.value || item.value;
        return acc;
      }, {});
    },
  });

  const { data: menuItems } = useQuery({
    queryKey: ['menu', 'main-menu'],
    queryFn: async () => {
      const { data: menu } = await supabase
        .from('menus')
        .select('id')
        .eq('name', 'main-menu')
        .maybeSingle();

      if (!menu) return [];

      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('menu_id', menu.id)
        .is('parent_id', null)
        .order('sort_order');

      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="bg-primary-900 text-white py-2 px-4">
          <div className="max-w-7xl mx-auto text-sm text-center">
            {settings?.site_tagline || 'Autonomous - Affiliated to JNTUK, Kakinada, Approved by AICTE'}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-4">
              <img
                src="/img/logo/swrnlogo.png"
                alt="Logo"
                className="h-16 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 leading-tight">
                  SWARNANDHRA
                </span>
                <span className="text-xs text-gray-600 leading-tight">
                  COLLEGE OF ENGINEERING AND TECHNOLOGY
                </span>
                <span className="text-xs text-gray-500 leading-tight">
                  (AUTONOMOUS)
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex space-x-6">
              {menuItems?.map((item) => (
                <Link
                  key={item.id}
                  to={item.url || '#'}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-2">
                {menuItems?.map((item) => (
                  <Link
                    key={item.id}
                    to={item.url || '#'}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">
                Swarnandhra College of Engineering and Technology
              </h3>
              <p className="text-gray-400 text-sm">
                {settings?.site_address || 'Narsapur, Andhra Pradesh 534280, India'}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {menuItems?.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.url || '#'}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Accreditations</h3>
              <div className="flex space-x-4">
                <img
                  src="/img/footer/naac-a_grade-logo-B_W.png"
                  alt="NAAC A Grade"
                  className="h-12"
                />
                <img
                  src="/img/footer/nba-logo-white.png"
                  alt="NBA"
                  className="h-12"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Swarnandhra College of Engineering and Technology. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
