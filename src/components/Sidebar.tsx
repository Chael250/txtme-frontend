'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Search, 
  Settings, 
  LogOut, 
  Send,
  PlusCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/components/ui/Button';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Contacts', href: '/contacts' },
  { icon: Search, label: 'AI Search', href: '/search' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 bg-primary text-white flex flex-col p-6 z-50 rounded-r-[3rem] shadow-2xl">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12 ml-2">
        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center rotate-6 shadow-lg">
          <Send className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold tracking-tight">TxtMe</span>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 5 }}
                className={cn(
                  "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group",
                  isActive ? "bg-white text-primary shadow-lg" : "hover:bg-white/10 text-white/70 hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-white/60 group-hover:text-white")} />
                <span className="font-semibold">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute -right-2 w-1.5 h-8 bg-white rounded-l-full" 
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto space-y-4">
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/5">
          <p className="text-xs text-white/50 mb-3 uppercase tracking-widest font-bold">Quick Action</p>
          <Button variant="secondary" className="w-full bg-white text-primary hover:bg-slate-100 border-none transition-transform hover:scale-105 active:scale-95">
            <PlusCircle className="w-4 h-4 mr-2" /> New Contact
          </Button>
        </div>
        
        <button 
          onClick={() => logout()}
          className="flex items-center gap-4 px-4 py-3.5 w-full rounded-2xl hover:bg-red-500/20 text-white/60 hover:text-white transition-all group"
        >
          <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
}
