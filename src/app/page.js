'use client';
import { useState } from 'react';

// NavbarHero Component
function NavbarHero() {
  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 bg-white shadow-sm gap-2 sm:gap-0">
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl text-indigo-700">TaskPlanner</span>
      </div>
      <div className="flex gap-4 sm:gap-8 text-gray-500 font-medium text-base sm:text-lg">
        <a href="/home" className="hover:text-indigo-600">Dashboard</a>
        <a href="#" className="text-indigo-600 font-semibold">Courses</a>
        <a href="#" className="hover:text-indigo-600">Analytics</a>
        <a href="/settings" className="hover:text-indigo-600">Settings</a>
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
    <section className="bg-gradient-to-r from-indigo-500 to-purple-500 py-10 sm:py-16 text-center text-white px-2">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">Master Task Management</h1>
      <p className="text-base sm:text-lg md:text-xl mb-8">Learn proven strategies to boost productivity and organize your life</p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button className="bg-white text-indigo-700 font-semibold px-6 py-2 rounded shadow hover:bg-indigo-50">Start Learning</button>
        <button className="bg-indigo-600 border border-white font-semibold px-6 py-2 rounded hover:bg-indigo-700">Browse All Courses</button>
      </div>
    </section>
  );
}

// CourseCard Component (Coming Soon)
function CourseCard() {
  return (
    <div className="bg-white rounded-2xl shadow p-4 w-full h-48 sm:h-56 flex items-center justify-center min-w-[180px] min-h-[180px]">
      <span className="text-lg sm:text-xl font-bold text-gray-400">Coming Soon</span>
    </div>
  );
}

// CourseGrid Component
function CourseGrid({ title, count = 3 }) {
  return (
    <section className="my-8 sm:my-10 px-2 sm:px-4 md:px-0 max-w-6xl mx-auto">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
    <section className="bg-gradient-to-r from-indigo-500 to-purple-500 py-10 sm:py-14 text-center text-white">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Ready to Transform Your Productivity?</h2>
      <p className="mb-6 text-base sm:text-lg">Join thousands of learners who have mastered task management</p>
      <button className="bg-white text-indigo-700 font-semibold px-6 py-2 rounded shadow hover:bg-indigo-50">Get Started Today</button>
    </section>
  );
}

// FooterHero Component
function FooterHero() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6 md:gap-8 px-2 sm:px-4">
        <div>
          <div className="font-bold text-lg sm:text-xl text-indigo-400 mb-2">TaskPlanner</div>
          <div className="text-xs sm:text-sm mb-4">Master productivity with our comprehensive task management courses.</div>
        </div>
        <div>
          <div className="font-semibold mb-2">Courses</div>
          <div className="text-xs sm:text-sm">Productivity</div>
          <div className="text-xs sm:text-sm">Time Management</div>
          <div className="text-xs sm:text-sm">Project Planning</div>
        </div>
        <div>
          <div className="font-semibold mb-2">Support</div>
          <div className="text-xs sm:text-sm">Help Center</div>
          <div className="text-xs sm:text-sm">Contact Us</div>
          <div className="text-xs sm:text-sm">FAQ</div>
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
    <div className="bg-gray-50 min-h-screen flex flex-col w-full overflow-x-hidden">
      <NavbarHero />
      <HeroSection />
      <CourseGrid title="Featured Courses" count={3} />
      <CourseGrid title="All Courses" count={4} />
      <div className="flex justify-center my-4 sm:my-6 w-full min-w-0">
        <button className="bg-indigo-500 text-white px-6 py-2 rounded font-semibold hover:bg-indigo-600">Load More Courses</button>
      </div>
      <div className="m-0 p-0 w-full min-w-0">
        <PromoSection />
        <FooterHero />
      </div>
    </div>
  );
}
