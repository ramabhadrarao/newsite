import React, { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Award, Users, BookOpen, TrendingUp, Globe, Microscope, Laptop, Building, Zap, GraduationCap, Target } from 'lucide-react';
import MegaMenu from '../../components/navigation/MegaMenu';

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
    <div className="min-h-screen">
      {/* Mega menu placed above Latest News */}
      <MegaMenu />
      {/* Top Latest News Bar (above Hero) */}
      <TopNewsBar />
      {/* Hero Section with Advanced Gradients */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-theme-gradient">
        {/* Background Video */}
        <video
          src="/img/data/video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Gradient Overlay over Video for legibility */}
        <div className="absolute inset-0 bg-theme-overlay"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}></div>

        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white">NAAC A+ Accredited | Autonomous Institution</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Shape Your
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
              Future Today
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Where innovation meets excellence. Join India's leading autonomous engineering college 
            and transform your dreams into reality.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link
              to="/admissions"
              className="group px-8 py-4 btn-theme text-white rounded-full font-bold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
            >
              Apply Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              Explore Campus
            </Link>
          </div>

          {/* Stats moved to Key Highlights section below */}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Key Highlights Section (Students, Placement Rate, Awards, Global Partners) */}
      <section className="py-14 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">Key Highlights</h2>
            <p className="text-base md:text-lg text-gray-600">A quick snapshot of our scale and success</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Users, label: '10,000+', sublabel: 'Students' },
              { icon: GraduationCap, label: '95%', sublabel: 'Placement Rate' },
              { icon: Award, label: '50+', sublabel: 'Awards' },
              { icon: Globe, label: '100+', sublabel: 'Global Partners' }
            ].map((stat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-xl font-semibold text-gray-900 mb-1 text-center">{stat.label}</div>
                <div className="text-sm text-gray-600 text-center">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programmes (from reference) */}
      <section className="py-20 bg-theme-gradient text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Featured Programmes</h2>
            <p className="text-base md:text-lg text-purple-200">UG and PG Degree Courses including MCA & MBA</p>
          </div>
          
          <FeaturedProgramsRef />
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              Academic Excellence
            </h2>
            <p className="text-base md:text-lg text-gray-600">World-class departments driving innovation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Computer Science & Engineering',
                description: 'AI, ML, Data Science & Cybersecurity',
                icon: Laptop,
                gradient: 'from-blue-500 to-cyan-500',
                link: '/departments/cse',
              },
              {
                name: 'Electronics & Communication',
                description: 'IoT, VLSI & Embedded Systems',
                icon: Zap,
                gradient: 'from-purple-500 to-pink-500',
                link: '/departments/ece',
              },
              {
                name: 'Mechanical Engineering',
                description: 'Robotics, CAD/CAM & Thermal Engineering',
                icon: Building,
                gradient: 'from-orange-500 to-red-500',
                link: '/departments/mech',
              },
              {
                name: 'Electrical & Electronics',
                description: 'Power Systems & Renewable Energy',
                icon: TrendingUp,
                gradient: 'from-green-500 to-teal-500',
                link: '/departments/eee',
              },
              {
                name: 'Civil Engineering',
                description: 'Structural Design & Smart Cities',
                icon: Building,
                gradient: 'from-yellow-500 to-orange-500',
                link: '/departments/civil',
              },
              {
                name: 'Information Technology',
                description: 'Cloud Computing & Full Stack Development',
                icon: Globe,
                gradient: 'from-indigo-500 to-purple-500',
                link: '/departments/it',
              },
            ].map((dept, index) => (
              <Link
                key={index}
                to={dept.link}
                className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-transparent shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${dept.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative p-8">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${dept.gradient} mb-6 shadow-lg`}>
                    <dept.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {dept.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">{dept.description}</p>
                  
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-purple-600">
                    Explore Program
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Facilities */}
      <section className="py-20 bg-theme-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              World-Class Infrastructure
            </h2>
            <p className="text-xl text-blue-200">State-of-the-art facilities for holistic development</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Central Library', icon: BookOpen, desc: '100,000+ books & e-resources' },
              { title: 'Research Labs', icon: Microscope, desc: 'Cutting-edge equipment' },
              { title: 'Smart Classrooms', icon: Laptop, desc: 'Technology-enabled learning' },
              { title: 'Sports Complex', icon: Target, desc: 'Olympic-standard facilities' },
              { title: 'Innovation Hub', icon: Zap, desc: 'AICTE-IDEA Lab certified' },
              { title: 'Hostels', icon: Building, desc: 'Safe & comfortable living' },
              { title: 'Auditorium', icon: Users, desc: '1000+ seating capacity' },
              { title: 'Cafeteria', icon: Globe, desc: 'Multi-cuisine dining' },
            ].map((facility, idx) => (
              <div key={idx} className="group p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <facility.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:text-purple-400 transition-colors" />
                <h3 className="text-xl font-bold mb-2">{facility.title}</h3>
                <p className="text-gray-400 text-sm">{facility.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Swarnandhra?
            </h2>
            <p className="text-xl text-gray-600">Leading the way in technical education</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: 'NAAC A+ Grade', description: 'Highest accreditation standard', color: 'from-yellow-500 to-orange-500' },
              { icon: Target, title: 'NBA Approved', description: 'Quality education assured', color: 'from-blue-500 to-cyan-500' },
              { icon: Users, title: '300+ Faculty', description: 'Experienced & dedicated', color: 'from-purple-500 to-pink-500' },
              { icon: TrendingUp, title: 'Top Placements', description: 'Leading companies recruit', color: 'from-green-500 to-teal-500' },
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex p-6 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110`}>
                  <feature.icon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-theme-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of successful alumni who started their careers at Swarnandhra
          </p>
          <Link
            to="/admissions"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/50 transition-all duration-300 transform hover:scale-105"
          >
            Apply for Admission 2025-26
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function NewsMarquee() {
  const news = [
    'Admissions Open for 2025-26 Academic Year',
    'Campus Placements Reach All-Time High - 95% Placement Rate',
    'International Conference on AI & ML - March 2025',
    'Students Win National Hackathon Championship',
    'NAAC A+ Grade Accreditation Renewed',
    'New Research Lab for Advanced Robotics Inaugurated',
    'Industry Collaboration with Top Tech Giants',
    'Student Team Wins Smart India Hackathon',
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-xl p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-sm">
          Latest News
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {[...news, ...news].map((item, idx) => (
            <span key={idx} className="inline-block mx-8 text-gray-700 font-medium">
              🔹 {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TopNewsBar() {
  const news = [
    'Admissions Open for 2025-26 Academic Year',
    'Campus Placements Reach All-Time High - 95% Placement Rate',
    'International Conference on AI & ML - March 2025',
    'Students Win National Hackathon Championship',
    'NAAC A+ Grade Accreditation Renewed',
  ];

  return (
    <section className="relative z-20 bg-theme-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-2">
          <div className="flex-shrink-0 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-semibold">Latest News</div>
          <div className="flex-1 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap">
              {[...news, ...news].map((item, idx) => (
                <span key={idx} className="inline-block mx-6 text-white/90 text-xs md:text-sm">
                  • {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramsShowcase() {
  const programs = [
    { name: 'AI & Machine Learning', icon: '🤖', color: 'from-blue-500 to-cyan-500' },
    { name: 'Cyber Security', icon: '🔒', color: 'from-red-500 to-pink-500' },
    { name: 'Data Science', icon: '📊', color: 'from-purple-500 to-indigo-500' },
    { name: 'Robotics & Automation', icon: '🦾', color: 'from-orange-500 to-yellow-500' },
    { name: 'Cloud Computing', icon: '☁️', color: 'from-teal-500 to-green-500' },
    { name: 'IoT & Embedded', icon: '🌐', color: 'from-pink-500 to-purple-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((program, idx) => (
        <div key={idx} className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${program.color} opacity-20 rounded-full blur-3xl group-hover:opacity-40 transition-opacity`}></div>
          
          <div className="relative">
            <div className="text-5xl mb-4">{program.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{program.name}</h3>
            <div className="flex items-center text-purple-300 font-semibold group-hover:text-white">
              Learn More
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FeaturedProgramsRef() {
  const bcaPrograms = [
    { title: 'BCA-Bachelor of Computer Applications', icon: '/img/our-features/Computer-Science-icon.svg' },
    { title: 'BBA-Bachelor of Business Administration', icon: '/img/our-features/business-information-reporting-svgrepo-com.svg' },
    { title: 'BMS -  Bachelor of Management Studies', icon: '/img/our-features/business systems.svg' },
  ];

  const btechPrograms = [
    { title: 'Computer Science & Engineering', icon: '/img/our-features/Computer-Science-icon.svg' },
    { title: 'Information Technology', icon: '/img/our-features/electronics-and-communication-icon.svg' },
    { title: 'Artificial intelligence and Machine Learning', icon: '/img/our-features/ai-svgrepo-com.svg' },
    { title: 'Robotics', icon: '/img/our-features/robotics-svgrepo-com.svg' },
    { title: 'Computer Science and Engineering (Data Science)', icon: '/img/our-features/affiliate-affiliation-affilitate-svgrepo-com.svg' },
    { title: 'Artificial Intelligence (Al) and Data Science', icon: '/img/our-features/ai-ml-icon.svg' },
    { title: 'Computer Science and Engineering (Cyber Security)', icon: '/img/our-features/advanced-cyber-engineering-svgrepo-com.svg' },
    { title: 'Computer Science and Engineering and Business Systems', icon: '/img/our-features/business systems.svg' },
    { title: 'Mechanical Engineering', icon: '/img/our-features/mechanical-icon.svg' },
    { title: 'Civil Engineering', icon: '/img/our-features/forklift-lifting-svgrepo-com.svg' },
    { title: 'Electrical & Electronics Engineering', icon: '/img/our-features/electrical-and-electronics-icon.svg' },
    { title: 'Electronics and Communication Engineering', icon: '/img/our-features/computer_networking-icon.svg' },
  ];

  const pgPrograms = [
    { title: 'Computer Science & Engineering', icon: '/img/our-features/Computer-Science-icon.svg' },
    { title: 'Power Electronics and Systems', icon: '/img/our-features/electronics-and-communication-icon.svg' },
    { title: 'CAD/CAM', icon: '/img/our-features/mechanical-icon.svg' },
    { title: 'Structural Engineering', icon: '/img/our-features/forklift-lifting-svgrepo-com.svg' },
    { title: 'Communication Systems', icon: '/img/our-features/electrical-and-electronics-icon.svg' },
    { title: 'Thermal Engineering', icon: '/img/our-features/noun-thermal-engineering-5268792.svg' },
    { title: 'VLSI System Design', icon: '/img/our-features/chip-microchip-svgrepo-com.svg' },
    { title: 'Master of Business Administration (MBA)', icon: '/img/our-features/business-information-reporting-svgrepo-com.svg' },
    { title: 'Masters in Computer Applications (MCA)', icon: '/img/our-features/binary-code-loading-symbol-svgrepo-com.svg' },
  ];

  const ItemCard = ({ title, icon }) => (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors">
      <img src={icon} alt={title} className="w-10 h-10 object-contain" />
      <p className="text-sm md:text-base font-medium text-white/90">{title}</p>
    </div>
  );

  return (
    <div className="space-y-14">
      {/* UG PROGRAMME - BCA ,BBA,BMS (3 Years) */}
      <div>
        <div className="text-center mb-6">
          <h4 className="text-xl md:text-2xl font-semibold">UG PROGRAMME - BCA , BBA , BMS <span className="text-white/70">(3 Years)</span></h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {bcaPrograms.map((p, i) => (
            <ItemCard key={i} title={p.title} icon={p.icon} />
          ))}
        </div>
      </div>

      {/* UG PROGRAMME - B.TECH (4 Years) */}
      <div>
        <div className="text-center mb-6">
          <h4 className="text-xl md:text-2xl font-semibold">UG PROGRAMME - B.TECH <span className="text-white/70">(4 Years)</span></h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {btechPrograms.map((p, i) => (
            <ItemCard key={i} title={p.title} icon={p.icon} />
          ))}
        </div>
      </div>

      {/* PG PROGRAMME - M.TECH/MBA/MCA (2 Years) */}
      <div>
        <div className="text-center mb-6">
          <h4 className="text-xl md:text-2xl font-semibold">PG PROGRAMME - M.TECH / MBA / MCA <span className="text-white/70">(2 Years)</span></h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {pgPrograms.map((p, i) => (
            <ItemCard key={i} title={p.title} icon={p.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}