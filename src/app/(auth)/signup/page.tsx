'use client';
import Password from '@/components/password';
import Input from '@/components/ui/input';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login Form Data:', form);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-[#1f1c2c] via-[#928dab] to-[#1f1c2c] px-4">
      <div className="relative p-8 rounded-2xl shadow-xl bg-white/10 backdrop-blur-md border border-white/30 w-full max-w-md animate-fadeIn">
         <h2 className="text-2xl font-bold text-white text-center mb-6 ">
          Sign up to 
          <span className="text-slate-800 px-2">
            NextMentor
          </span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
           <Input
           type='text'
           name='username'
           value={form.username}
           placeholder='Username'
           onChange={handleChange}
           required
          />
          
          
          <Input
           type='email'
           name='email'
           value={form.email}
           placeholder='Email'
           onChange={handleChange}
           required
          />

          <Password
            name='password'
            value={form.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition duration-300 cursor-pointer"
          >
            Sign Up
          </button>

          <div className='flex justify-center gap-2'>
            <h1 className='text-gray-800 font-semibold text-sm'>Already have an account?</h1>
            
              <Link
              href={'/signin'}
              className='font-semibold text-sm text-gray-100 hover:underline '
              >
              Log in
              </Link>
           
          </div>
        </form>
      </div>
    </div>
  );
}
