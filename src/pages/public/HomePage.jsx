import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const { data: sections } = useQuery({
    queryKey: ['sections', 'home'],
    queryFn: async () => {
      const homePage = await api.get('/pages/slug/home');

      if (!homePage) return [];
      const items = await api.get(`/sections/by-page/${homePage.id}`);
      return items || [];
    },
  });

  return (
    <div>
      {useMemo(() => {
        const heroSection = sections?.find((s) => s.type === 'hero');
        const newsSection = sections?.find(
          (s) => s.type === 'list' && (s.name?.toLowerCase().includes('news') || s.name?.toLowerCase().includes('updates'))
        );
        const quickLinksSection = sections?.find(
          (s) => s.type === 'list' && (s.name?.toLowerCase().includes('quick') || s.name?.toLowerCase().includes('links'))
        );
        const accredSection = sections?.find(
          (s) => s.type === 'list' && (s.name?.toLowerCase().includes('accredit') || s.name?.toLowerCase().includes('affiliation') || s.name?.toLowerCase().includes('partners'))
        );

        return (
          <section className="py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-3">
                  {heroSection ? (
                    <HeroSlider section={heroSection} />
                  ) : (
                    <div className="relative h-[50vh] md:h-[60vh] lg:h-[65vh] overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-sky-700 text-white rounded-2xl">
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="relative z-10 h-full flex items-center justify-center px-6 text-center">
                        <div>
                          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Swarnandhra College</h1>
                          <p className="text-xl md:text-2xl mb-8 text-primary-100">Shaping Future Engineers & Technologists</p>
                          <div className="flex flex-wrap justify-center gap-4">
                            <Link
                              to="/admissions"
                              className="inline-flex items-center px-6 py-3 bg-white text-primary-900 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                            >
                              Apply Now
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                              to="/about"
                              className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-900 transition-colors"
                            >
                              Learn More
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="lg:col-span-1">
                  <NewsScroll section={newsSection} />
                </div>
              </div>
            </div>
          </section>
        );
      }, [sections])}

      {/* Featured Programmes */}
      <section className="py-14 bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Our Featured Programmes</h2>
            <Link to="/programmes" className="text-white/80 hover:text-white text-sm">View all programmes</Link>
          </div>
          <FeaturedProgrammesTicker />
        </div>
      </section>

      {/* Accreditation / Affiliations */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AccreditationLogosBar section={sections?.find((s) => s.type === 'list' && (s.name?.toLowerCase().includes('accredit') || s.name?.toLowerCase().includes('affiliation') || s.name?.toLowerCase().includes('partners')))} />
        </div>
      </section>

      {/* Campus Facilities */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Campus Facilities</h2>
            <p className="text-gray-600">Comprehensive infrastructure to support learning and growth</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Central Library', icon: '/img/our-features/presentation-svgrepo-com.svg', desc: 'Access to journals and digital resources' },
              { title: 'Hostels', icon: '/img/footer/Location.svg', desc: 'Separate hostels with secure environment' },
              { title: 'Transport', icon: '/img/our-features/forklift-lifting-svgrepo-com.svg', desc: 'Connectivity across the region' },
              { title: 'Sports & Gym', icon: '/img/our-features/binary-code-loading-symbol-svgrepo-com.svg', desc: 'Facilities for fitness and sports' },
              { title: 'Labs & Workshops', icon: '/img/our-features/chip-microchip-svgrepo-com.svg', desc: 'Well-equipped labs for practical learning' },
              { title: 'AICTE-IDEA Lab', icon: '/img/our-features/ai-svgrepo-com.svg', desc: 'Innovation and prototyping center' },
              { title: 'Wi-Fi Campus', icon: '/img/our-features/computer_networking-icon.svg', desc: 'High-speed internet across campus' },
              { title: 'Medical & Cafeteria', icon: '/img/footer/phone-icon.svg', desc: 'On-campus health and food services' },
            ].map((f, idx) => (
              <div key={idx} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <img src={f.icon} alt={f.title} className="h-10 w-10" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{f.title}</h3>
                    <p className="text-gray-600 text-sm">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Departments</h2>
            <p className="text-gray-600 text-lg">
              Offering cutting-edge programs in engineering and technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Computer Science & Engineering',
                description: 'Leading the way in software development and AI',
                link: '/departments/cse',
              },
              {
                name: 'Electronics & Communication',
                description: 'Innovation in electronics and communication systems',
                link: '/departments/ece',
              },
              {
                name: 'Mechanical Engineering',
                description: 'Excellence in mechanical design and manufacturing',
                link: '/departments/mech',
              },
              {
                name: 'Electrical & Electronics',
                description: 'Power systems and electrical engineering expertise',
                link: '/departments/eee',
              },
              {
                name: 'Civil Engineering',
                description: 'Building infrastructure for tomorrow',
                link: '/departments/civil',
              },
              {
                name: 'Information Technology',
                description: 'Bridging technology and business',
                link: '/departments/it',
              },
            ].map((dept, index) => (
              <Link
                key={index}
                to={dept.link}
                className="card hover:shadow-lg transition-shadow group"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {dept.name}
                </h3>
                <p className="text-gray-600 mb-4">{dept.description}</p>
                <div className="flex items-center text-primary-600 font-medium">
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Swarnandhra?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: '🎓', title: 'NAAC A Grade', description: 'Accredited by NAAC' },
              { icon: '🏆', title: 'NBA Approved', description: 'Quality assurance' },
              { icon: '👨‍🏫', title: 'Expert Faculty', description: '100+ experienced professors' },
              { icon: '💼', title: 'Top Placements', description: 'Leading companies recruit' },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroSlider({ section }) {
  const content = section?.content || {};
  const videoUrl = content.videoUrl || '/img/data/video.mp4';
  const slides = Array.isArray(content.slides) ? content.slides : [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, content.intervalMs || 5000);
    return () => clearInterval(timer);
  }, [slides.length, content.intervalMs]);

  const current = slides[index] || {};

  const goPrev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative h-[50vh] md:h-[60vh] lg:h-[65vh] overflow-hidden">
      <video
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/15 to-transparent pointer-events-none" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="text-white max-w-3xl">
          {current.badge && (
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-white/20 backdrop-blur">
              {current.badge}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {current.title || 'Welcome to Swarnandhra College'}
          </h1>
          {current.subtitle && (
            <p className="text-lg md:text-2xl text-primary-100 mb-8">{current.subtitle}</p>
          )}
          <div className="flex flex-wrap gap-3">
            {current.ctaLink && (
              <Link
                to={current.ctaLink}
                className="inline-flex items-center px-6 py-3 bg-white text-primary-900 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                {current.ctaText || 'Apply Now'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            )}
            {current.secondaryLink && (
              <Link
                to={current.secondaryLink}
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-900 transition-colors"
              >
                {current.secondaryText || 'Learn More'}
              </Link>
            )}
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-center gap-4">
          <button
            aria-label="Previous"
            onClick={goPrev}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            aria-label="Next"
            onClick={goNext}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
}

function NewsScroll({ section }) {
  const fallbackItems = [
    { title: 'Admissions open for 2025-26', url: '/admissions' },
    { title: 'Campus placements excel in 2024', url: '/placements' },
    { title: 'International conference on AI & ML', url: '/events/ai-ml-conference' },
    { title: 'Hackathon winners announced', url: '/news/hackathon-2024' },
    { title: 'NAAC A Grade accreditation retained', url: '/about/accreditations' },
    { title: 'New research lab inaugurated', url: '/research/labs/new' },
  ];

  const items = Array.isArray(section?.content?.items) && section?.content?.items.length
    ? section.content.items
    : fallbackItems;

  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (!items.length) return;
    const timer = setInterval(() => {
      setOffset((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [items.length]);

  const visibleCount = 6;
  const visible = Array.from({ length: Math.min(visibleCount, items.length) }, (_, i) => items[(offset + i) % items.length]);

  return (
    <aside className="h-[50vh] md:h-[60vh] lg:h-[65vh] bg-white rounded-2xl border shadow-sm flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b bg-gray-50 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">News & Updates</h3>
        <Link to="/news" className="text-xs text-primary-700 hover:text-primary-900 font-medium">View all</Link>
      </div>
      <div className="flex-1 overflow-hidden">
        <ul className="divide-y">
          {visible.map((item, idx) => {
            const label = typeof item === 'string' ? item : item.title;
            const url = typeof item === 'string' ? '#' : (item.url || '#');
            return (
              <li key={idx} className="hover:bg-gray-50 transition-colors">
                <Link to={url} className="block px-4 py-3">
                  <p className="text-sm text-gray-800 line-clamp-2">{label}</p>
                </Link>
              </li>
            );
          })}
          {items.length === 0 && (
            <li className="px-4 py-6 text-sm text-gray-500">No news available.</li>
          )}
        </ul>
      </div>
    </aside>
  );
}

function QuickLinksGrid({ section }) {
  const fallback = [
    { label: 'Examination Results', url: '/examinations' },
    { label: 'IQAC', url: '/iqac' },
    { label: 'NIRF', url: '/nirf' },
    { label: 'NAAC SSR', url: '/naac-ssr' },
    { label: 'NBA Report', url: '/nba' },
    { label: 'AICTE-IDEA Lab', url: '/aicte-idea-lab' },
    { label: 'Alumni', url: '/alumni' },
    { label: 'Web Mail', url: '/webmail' },
    { label: 'Grievance', url: '/grievance' },
    { label: 'Contact', url: '/contact' },
    { label: 'News & Gallery', url: '/gallery' },
  ];

  const items = Array.isArray(section?.content?.items) && section?.content?.items.length
    ? section.content.items
    : fallback;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {items.map((item, idx) => {
        const label = typeof item === 'string' ? item : item.label || item.title;
        const url = typeof item === 'string' ? '#' : (item.url || '#');
        return (
          <Link
            key={idx}
            to={url}
            className="group rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 px-4 py-3 flex items-center justify-between"
          >
            <span className="text-sm font-medium">{label}</span>
            <ArrowRight className="h-4 w-4 text-white/70 group-hover:text-white transition-colors" />
          </Link>
        );
      })}
    </div>
  );
}

function AccreditationLogosBar({ section }) {
  const fallbackLogos = [
    { alt: 'NAAC A Grade', src: '/img/footer/NAAC-A-grade-logo.webp', url: '#' },
    { alt: 'NBA Accredited', src: '/img/footer/nba-logo-white.png', url: '#' },
    { alt: 'Affiliated to JNTUK', src: '/img/footer/jntuk-logo-White.png', url: '#' },
  ];

  const items = Array.isArray(section?.content?.items) && section?.content?.items.length
    ? section.content.items
    : fallbackLogos;

  const [paused, setPaused] = React.useState(false);
  const trackRef = React.useRef(null);

  React.useEffect(() => {
    let raf;
    let x = 0;
    const speed = 0.8; // px per frame
    const step = () => {
      if (!paused && trackRef.current) {
        x -= speed;
        const width = trackRef.current.scrollWidth / 2; // one set width
        if (-x >= width) x = 0;
        trackRef.current.style.transform = `translateX(${x}px)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 border border-white/10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={trackRef} className="flex items-center gap-10 px-6 py-4 will-change-transform">
        {doubled.map((item, idx) => {
          const alt = typeof item === 'string' ? item : (item.alt || item.title || 'Accreditation');
          const src = typeof item === 'string' ? item : item.src;
          const url = typeof item === 'string' ? '#' : (item.url || '#');
          return (
            <a key={idx} href={url} className="opacity-80 hover:opacity-100 transition-opacity" aria-label={alt}>
              <img src={src} alt={alt} className="h-10 md:h-12 object-contain" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

function FeaturedProgrammesTicker() {
  const items = [
    { label: 'CSE (AI & ML)', icon: '/img/our-features/ai-ml-icon.svg', url: '/departments/cse' },
    { label: 'Cyber Security', icon: '/img/our-features/advanced-cyber-engineering-svgrepo-com.svg', url: '/departments/cse' },
    { label: 'Data Science', icon: '/img/our-features/artificial-intelligence-svgrepo-com.svg', url: '/departments/cse' },
    { label: 'Robotics', icon: '/img/our-features/robotics-svgrepo-com.svg', url: '/departments/mech' },
    { label: 'ECE', icon: '/img/our-features/electronics-and-communication-icon.svg', url: '/departments/ece' },
    { label: 'EEE', icon: '/img/our-features/electrical-and-electronics-icon.svg', url: '/departments/eee' },
  ];

  const doubled = [...items, ...items];
  const [paused, setPaused] = React.useState(false);
  const trackRef = React.useRef(null);

  React.useEffect(() => {
    let raf;
    let x = 0;
    const speed = 1.2; // px per frame, slightly faster than logos
    const step = () => {
      if (!paused && trackRef.current) {
        x -= speed;
        const width = trackRef.current.scrollWidth / 2; // one set width
        if (-x >= width) x = 0;
        trackRef.current.style.transform = `translateX(${x}px)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={trackRef} className="flex items-stretch gap-4 px-2 py-2 will-change-transform">
        {doubled.map((item, idx) => (
          <Link
            key={`${item.label}-${idx}`}
            to={item.url}
            className="group min-w-[180px] md:min-w-[220px] rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 p-4 flex flex-col items-center text-center"
          >
            <img src={item.icon} alt={item.label} className="h-12 w-12 mb-3" />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
