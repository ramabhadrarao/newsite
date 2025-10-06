import React, { useState } from 'react';

export default function MegaMenu() {
  const [active, setActive] = useState(null);

  const categories = [
    { key: 'about', label: 'About' },
    { key: 'academics', label: 'Academics' },
    { key: 'admissions', label: 'Admissions' },
    { key: 'departments', label: 'Departments' },
    { key: 'research', label: 'R&D' },
    { key: 'library', label: 'Library' },
    { key: 'student', label: 'Student Support' },
    { key: 'facilities', label: 'Facilities' },
    { key: 'staff', label: 'Staff' },
  ];

  const panel = (key) => {
    switch (key) {
      case 'about':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              'Profile','Vision & Mission','Founder Secretary','Management','Principal','Vice-Principal',
              'Governing Board','Strategic Plan','Organogram','Best Practices','IT Policy','Maintenance Policy',
              'Awards','Milestones','Rankings','MOUs','College Undertaking','Photo Gallery','College Video',
            ].map((label) => (
              <a key={label} href="#" className="text-sm text-gray-700 hover:text-gray-900">{label}</a>
            ))}
          </div>
        );
      case 'academics':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              'Academic Council','Board of Studies','Finance Committee','Curriculum & Syllabus (UG)','Curriculum & Syllabus (PG)',
              'Previous Years','Committees',
            ].map((label) => (
              <a key={label} href="#" className="text-sm text-gray-700 hover:text-gray-900">{label}</a>
            ))}
          </div>
        );
      case 'admissions':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              'Admission Manual 2019-20','Admission Manual 2020-21','Courses Offered','Fee Structure',
              'UG Admission','PG Admission','Admission Analysis',
            ].map((label) => (
              <a key={label} href="#" className="text-sm text-gray-700 hover:text-gray-900">{label}</a>
            ))}
          </div>
        );
      case 'departments':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'CSE','AI & ML','CSE-Data Science','CSE-Business Systems','CSE-Cyber Security','AI & DS','Civil','ECE','EEE','IT','Mechanical','Robotics','MBA','MCA','S&H','BCA','BBA',
            ].map((label) => (
              <a key={label} href="#" className="text-sm text-gray-700 hover:text-gray-900">{label}</a>
            ))}
          </div>
        );
      case 'research':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              'About R&D','Sponsored Research','Consultancy & Training','Publications','Academic Research Facilities',
              'Patents','Collaborations & MoUs','Promotion Policy','Revenue Sharing Policy','Central Facility','Statistical Database',
              'Nanotechnology Research Center','Start-Up','State Code of Ethics',
            ].map((label) => (
              <a key={label} href="#" className="text-sm text-gray-700 hover:text-gray-900">{label}</a>
            ))}
          </div>
        );
      case 'library':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              'About Library','Infrastructure','Working Hours','Rules & Regulations','Library Staff','Digital Library',
              'Print Journals','Bound Journals','E-Journals','List of CDs','Books','New Arrivals','Rare Books','E-Books',
              'Video Gallery','Previous Year Question Papers','E-Subscriptions',
            ].map((label) => (
              <a key={label} href="#" className="text-sm text-gray-700 hover:text-gray-900">{label}</a>
            ))}
          </div>
        );
      case 'student':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              'IEI Student Chapter','IEEE Student Chapter','IEEE Student Branch','IET Chapter','ISTE Student Chapter',
              'EEE Association','Civil Association','MCA Association','Maths Club','Ensav Club','SOSSC Club',
            ].map((label) => (
              <a key={label} href="#" className="text-sm text-gray-700 hover:text-gray-900">{label}</a>
            ))}
          </div>
        );
      case 'facilities':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              'ATM','Cafeteria','WIFI','Media Centre','Common Rooms','ICT/Smart Classrooms','Green Initiatives',
              'Games & Sports','Language Laboratories','RO Water Plant','Solar Power Plant','Medical Facility',
            ].map((label) => (
              <a key={label} href="#" className="text-sm text-gray-700 hover:text-gray-900">{label}</a>
            ))}
          </div>
        );
      case 'staff':
        return (
          <div className="grid grid-cols-2 gap-6">
            {['Teaching Staff','Non-Teaching Staff'].map((label) => (
              <a key={label} href="#" className="text-sm text-gray-700 hover:text-gray-900">{label}</a>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="relative z-30 border-b border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm"
      onMouseLeave={() => setActive(null)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Triggers */}
        <div className="flex items-center justify-between py-2">
          <nav className="hidden md:flex flex-wrap items-center gap-1">
            {categories.map((c) => {
              const isActive = active === c.key;
              return (
                <button
                  key={c.key}
                  onMouseEnter={() => setActive(c.key)}
                  onFocus={() => setActive(c.key)}
                  aria-expanded={isActive}
                  className={`relative group h-10 px-3 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive ? 'text-gray-900 bg-black/5' : 'text-gray-800 hover:text-gray-900 hover:bg-black/5'
                  }`}
                >
                  {c.label}
                  <span
                    className={`pointer-events-none absolute left-2 right-2 bottom-0 h-0.5 rounded-full transition-opacity duration-200 ${
                      isActive ? 'opacity-100 bg-gray-900' : 'opacity-0 group-hover:opacity-60 bg-gray-800'
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Panels */}
      {active && (
        <div className="absolute inset-x-0 top-full bg-white border-t border-gray-200 shadow-2xl ring-1 ring-black/5 rounded-b-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Panel header for category context */}
            <div className="mb-3">
              <div className="text-xs font-semibold tracking-wide text-gray-500 uppercase">{categories.find((c) => c.key === active)?.label}</div>
            </div>
            <div className="grid gap-6">
              {/* Links grid */}
              <div className="[&>a]:px-2 [&>a]:py-1 [&>a]:rounded-md [&>a]:text-sm [&>a]:text-gray-800 [&>a:hover]:text-gray-900 [&>a:hover]:bg-blue-50">
                {panel(active)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}