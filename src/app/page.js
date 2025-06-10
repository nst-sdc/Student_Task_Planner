'use client';
import { useState } from 'react';

// NavbarHero Component
function NavbarHero() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl text-indigo-700">TaskPlanner</span>
      </div>
      <div className="flex gap-8 text-gray-500 font-medium">
        <a href="#" className="hover:text-indigo-600">Dashboard</a>
        <a href="#" className="text-indigo-600 font-semibold">Courses</a>
        <a href="#" className="hover:text-indigo-600">Analytics</a>
        <a href="#" className="hover:text-indigo-600">Settings</a>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <img src="https://ui-avatars.com/api/?name=Nihal&background=4f46e5&color=fff" alt="avatar" className="w-8 h-8 rounded-full" />
        </span>
      </div>
    </nav>
  );
}

// HeroSection Component
function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-indigo-500 to-purple-500 py-16 text-center text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Master Task Management</h1>
      <p className="text-lg md:text-xl mb-8">Learn proven strategies to boost productivity and organize your life</p>
      <div className="flex justify-center gap-4">
        <button className="bg-white text-indigo-700 font-semibold px-6 py-2 rounded shadow hover:bg-indigo-50">Start Learning</button>
        <button className="bg-indigo-600 border border-white font-semibold px-6 py-2 rounded hover:bg-indigo-700">Browse All Courses</button>
      </div>
    </section>
  );
}

// CourseCard Component (Coming Soon)
function CourseCard() {
  return (
    <div className="bg-white rounded-2xl shadow p-4 w-full max-w-xs h-64 flex items-center justify-center">
      <span className="text-xl font-bold text-gray-400">Coming Soon</span>
    </div>
  );
}

// CourseGrid Component
function CourseGrid({ title, count = 3 }) {
  return (
    <section className="my-10 px-4 md:px-0 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <CourseCard key={i} />
        ))}
      </div>
    </section>
  );
}

// PromoSection Component
function PromoSection() {
  return (
    <section className="bg-gradient-to-r from-indigo-500 to-purple-500 py-14 text-center text-white">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to Transform Your Productivity?</h2>
      <p className="mb-6">Join thousands of learners who have mastered task management</p>
      <button className="bg-white text-indigo-700 font-semibold px-6 py-2 rounded shadow hover:bg-indigo-50">Get Started Today</button>
    </section>
  );
}

// FooterHero Component
function FooterHero() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8 px-4">
        <div>
          <div className="font-bold text-xl text-indigo-400 mb-2">TaskPlanner</div>
          <div className="text-sm mb-4">Master productivity with our comprehensive task management courses.</div>
        </div>
        <div>
          <div className="font-semibold mb-2">Courses</div>
          <div className="text-sm">Productivity</div>
          <div className="text-sm">Time Management</div>
          <div className="text-sm">Project Planning</div>
        </div>
        <div>
          <div className="font-semibold mb-2">Support</div>
          <div className="text-sm">Help Center</div>
          <div className="text-sm">Contact Us</div>
          <div className="text-sm">FAQ</div>
        </div>
        <div>
          <div className="font-semibold mb-2">Connect</div>
          <div className="flex gap-3">
            <span>🐦</span>
            <span>💼</span>
            <span>▶️</span>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-8">© 2024 TaskPlanner. All rights reserved.</div>
    </footer>
  );
}

export default function LandingPage() {
  const [search, setSearch] = useState('');
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <NavbarHero />
      <HeroSection />
      {/* Search and filter bar */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between py-6 px-4">
        <div className="flex gap-2 w-full md:w-auto">
          <input className="border rounded px-4 py-2 w-40" placeholder="" disabled />
          <input className="border rounded px-4 py-2 w-40" placeholder="" disabled />
        </div>
        <input
          className="border rounded px-4 py-2 w-full md:w-80"
          placeholder="Search courses..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <CourseGrid title="Featured Courses" count={3} />
      <CourseGrid title="All Courses" count={4} />
      <div className="flex justify-center my-6">
        <button className="bg-indigo-500 text-white px-6 py-2 rounded font-semibold hover:bg-indigo-600">Load More Courses</button>
      </div>
      {/* Remove margin between promo and footer */}
      <div className="m-0 p-0">
        <PromoSection />
        <FooterHero />
      </div>
    </div>
  );
}
