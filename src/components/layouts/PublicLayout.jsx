import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Menu, X, ChevronDown, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube, ExternalLink, Palette } from 'lucide-react';
import { api } from '../../lib/api';

export default function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('indigo');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('site-theme');
    const initial = saved || 'indigo';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const applyTheme = (name) => {
    setTheme(name);
    document.documentElement.setAttribute('data-theme', name);
    localStorage.setItem('site-theme', name);
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const data = await api.get('/settings');
      return data.reduce((acc, item) => {
        acc[item.key] = item.value?.value || item.value;
        return acc;
      }, {});
    },
  });

  const { data: menuItems } = useQuery({
    queryKey: ['menu', 'main-menu'],
    queryFn: async () => {
      const menu = await api.get('/menus?name=main-menu');
      if (!menu) return [];
      const items = await api.get(`/menu-items?menu_id=${menu.id}&parent_id=null`);
      return items || [];
    },
  });

  const defaultMenu = [
    { id: 'default-1', label: 'Home', url: '/' },
    { id: 'default-2', label: 'About', url: '/about' },
    { id: 'default-3', label: 'Admissions', url: '/admissions' },
    { id: 'default-4', label: 'Departments', url: '/departments' },
    { id: 'default-5', label: 'Placements', url: '/placements' },
    { id: 'default-6', label: 'Contact', url: '/contact' },
  ];

  const navItems = (menuItems && menuItems.length > 0) ? menuItems : defaultMenu;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="relative text-gray-800 py-2 px-4 text-sm">
        <span className="brand-strip-bg-white absolute inset-0"></span>
        <div className="relative z-10 max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a href="tel:+91-1234567890" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">+91-1234567890</span>
            </a>
            <a href="mailto:info@swarnandhra.ac.in" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <Mail className="w-3 h-3" />
              <span className="hidden sm:inline">info@swarnandhra.ac.in</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-blue-600 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
            {/* Theme Palette Selector */}
            <div className="hidden sm:flex items-center gap-2">
              <Palette className="w-4 h-4 opacity-80" />
              {[
                { name: 'indigo', colors: ['#0b1b4f','#3b0f6f','#9a1a8a'] },
                { name: 'emerald', colors: ['#064e3b','#0f766e','#14b8a6'] },
                { name: 'sunset', colors: ['#7c2d12','#b91c1c','#f97316'] },
                { name: 'ocean', colors: ['#0c4a6e','#0369a1','#06b6d4'] },
              ].map((p) => (
                <button
                  key={p.name}
                  onClick={() => applyTheme(p.name)}
                  aria-label={`Switch to ${p.name} theme`}
                  className={`w-6 h-6 rounded-full border-2 ${theme===p.name ? 'border-gray-900' : 'border-gray-400'} overflow-hidden shadow hover:scale-110 transition-transform`}
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]}, ${p.colors[2]})`
                  }}
                />
              ))}
            </div>
            {/* Mobile palette toggle */}
            <div className="sm:hidden">
              <div className="flex items-center gap-1">
                {[
                  { name: 'indigo', colors: ['#0b1b4f','#3b0f6f','#9a1a8a'] },
                  { name: 'emerald', colors: ['#064e3b','#0f766e','#14b8a6'] },
                  { name: 'sunset', colors: ['#7c2d12','#b91c1c','#f97316'] },
                  { name: 'ocean', colors: ['#0c4a6e','#0369a1','#06b6d4'] },
                ].map((p) => (
                  <button
                    key={`m-${p.name}`}
                    onClick={() => applyTheme(p.name)}
                    aria-label={`Switch to ${p.name} theme`}
                    className={`w-5 h-5 rounded-full border ${theme===p.name ? 'border-white' : 'border-white/50'} overflow-hidden shadow`}
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]}, ${p.colors[2]})`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`relative sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
        <span className="brand-strip-bg-white absolute inset-0"></span>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo with themed strip background */}
            <Link to="/" className="relative flex items-center gap-2 md:gap-4 group px-3 py-2 rounded-xl">
              <div className="relative z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <img
                  src="/img/logo/swrnlogo.png"
                  alt="Logo"
                  className="relative h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="relative z-10 flex flex-col leading-tight">
                <span className="text-base md:text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                  SWARNANDHRA
                </span>
                <span className="text-[11px] md:text-xs font-semibold text-gray-700 tracking-wide">
                  COLLEGE OF ENGINEERING & TECHNOLOGY
                </span>
                <span className="text-[10px] md:text-xs font-medium text-purple-700">
                  (AUTONOMOUS)
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 text-gray-900">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.url || '#'}
                  className="relative px-4 py-2 text-gray-800 hover:text-gray-900 font-semibold text-sm transition-colors group"
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute inset-0 bg-black/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              ))}
              <Link
                to="/admissions"
                className="ml-4 px-6 py-2 btn-theme rounded-full font-bold text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Apply Now
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t animate-fade-in">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.url || '#'}
                    className="px-4 py-3 text-gray-900 rounded-lg font-semibold transition-colors bg-white/80 hover:bg-white"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/admissions"
                  className="mx-4 mt-4 px-6 py-3 btn-theme text-white rounded-full font-semibold text-center hover:shadow-lg transition-all"
                >
                  Apply Now
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-theme-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* About Column */}
            <div>
              <img
                src="/img/logo/swrnlogo.png"
                alt="Logo"
                className="h-16 mb-4"
              />
              <h3 className="text-lg font-semibold mb-4">
                Swarnandhra College of Engineering and Technology
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {settings?.site_address || 'Narsapur, Andhra Pradesh 534280, India'}
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-base font-semibold mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { label: 'About Us', url: '/about' },
                  { label: 'Admissions', url: '/admissions' },
                  { label: 'Departments', url: '/departments' },
                  { label: 'Placements', url: '/placements' },
                  { label: 'Research', url: '/research' },
                  { label: 'Alumni', url: '/alumni' },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.url}
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:bg-purple-400 transition-colors"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Links Column */}
            <div>
              <h3 className="text-base font-semibold mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></div>
                Important Links
              </h3>
              <ul className="space-y-3">
                {[
                  { label: 'NAAC', url: '/naac' },
                  { label: 'NBA', url: '/nba' },
                  { label: 'NIRF', url: '/nirf' },
                  { label: 'IQAC', url: '/iqac' },
                  { label: 'Examination Results', url: '/results' },
                  { label: 'Grievance Portal', url: '/grievance' },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.url}
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <ExternalLink className="w-3 h-3 group-hover:text-purple-400" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-base font-semibold mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-pink-400 to-red-400 rounded-full"></div>
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  <span className="text-gray-400 text-sm">
                    Narsapur, West Godavari District<br />
                    Andhra Pradesh - 534280, India
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <a href="tel:+91-1234567890" className="text-gray-400 hover:text-white transition-colors text-sm">
                    +91-1234567890
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-pink-400" />
                  <a href="mailto:info@swarnandhra.ac.in" className="text-gray-400 hover:text-white transition-colors text-sm">
                    info@swarnandhra.ac.in
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Accreditation Logos */}
          <div className="border-t border-white/10 pt-8 mb-8">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="text-center">
                <img
                  src="/img/footer/naac-a_grade-logo-B_W.png"
                  alt="NAAC A+ Grade"
                  className="h-16 mx-auto mb-2 opacity-80 hover:opacity-100 transition-opacity"
                />
                <p className="text-xs text-gray-400">NAAC A+ Accredited</p>
              </div>
              <div className="text-center">
                <img
                  src="/img/footer/nba-logo-white.png"
                  alt="NBA"
                  className="h-16 mx-auto mb-2 opacity-80 hover:opacity-100 transition-opacity"
                />
                <p className="text-xs text-gray-400">NBA Approved</p>
              </div>
              <div className="text-center">
                <img
                  src="/img/footer/jntuk-logo-White.png"
                  alt="JNTUK"
                  className="h-16 mx-auto mb-2 opacity-80 hover:opacity-100 transition-opacity"
                />
                <p className="text-xs text-gray-400">Affiliated to JNTUK</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Swarnandhra College of Engineering and Technology. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/sitemap" className="text-sm text-gray-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}