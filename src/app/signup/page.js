'use client';
import { useState } from 'react';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2">
      <div className="bg-white p-4 sm:p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">Sign Up</h1>
        {submitted ? (
          <div className="text-green-600 text-center">Signup successful! (Backend coming soon)</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" className="border rounded px-3 py-2" />
            <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="Email" className="border rounded px-3 py-2" />
            <input name="password" value={form.password} onChange={handleChange} required type="password" placeholder="Password" className="border rounded px-3 py-2" />
            <button type="submit" className="bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700">Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
} 