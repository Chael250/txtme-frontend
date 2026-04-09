'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Search, Bell, Settings, User } from 'lucide-react';
import { motion } from 'framer-motion';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-900">
      <Sidebar />
      <main className="flex-1 ml-72 p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Welcome, {user?.firstname}! 👋
            </h2>
            <p className="text-slate-500 font-medium">Here's what's happening in your network today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-white border-none rounded-2xl px-6 py-3 w-64 shadow-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none pl-12"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
            </div>
            <button className="p-3 bg-white rounded-2xl shadow-sm hover:bg-slate-50 text-slate-400 hover:text-primary transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center text-primary font-bold">
                {user?.firstname?.charAt(0)}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-bold text-slate-900 leading-none mb-1">
                  {user?.firstname} {user?.lastname}
                </p>
                <p className="text-xs font-semibold text-slate-400">Admin Account</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
