import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { ArrowRight } from 'lucide-react';

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
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Swarnandhra College
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Shaping Future Engineers & Technologists
            </p>
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
