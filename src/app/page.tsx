'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Send, Shield, Sparkles, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Send className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900">TxtMe</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Features</Link>
            <Link href="#about" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">About</Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-light text-primary text-sm font-semibold mb-6">
              Powered by AI 🧠
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Elevate Your <span className="text-primary italic">Contact</span> <br /> Management with Ease
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              TxtMe combines intelligent search, secure storage, and natural language magic to help you manage your network like never before.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto px-8 py-4">
                  Start now — It's Free
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4">
                  Explore Features
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Floating UI Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-20 relative max-w-5xl mx-auto"
          >
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full -z-10" />
            <Card className="p-2 border-slate-200 shadow-2xl overflow-hidden bg-white/50 backdrop-blur-xl">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bbbda5366391?auto=format&fit=crop&q=80&w=2000" 
                alt="Dashboard Mockup"
                className="rounded-xl w-full h-auto"
              />
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16">
            Unlock the Power of Your Network
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Sparkles className="w-6 h-6" />, 
                title: "AI Search", 
                desc: "Find contacts using natural language like 'The Emily from MTN'."
              },
              { 
                icon: <Shield className="w-6 h-6" />, 
                title: "Secure Storage", 
                desc: "Your data is protected with industry-standard encryption and security."
              },
              { 
                icon: <Zap className="w-6 h-6" />, 
                title: "Instant Filters", 
                desc: "Organize your contacts with lightning-fast tagging and filtering."
              }
            ].map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 text-left"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 border-t border-slate-200 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <Send className="text-white w-3 h-3" />
            </div>
            <span className="font-bold text-slate-900">TxtMe</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-slate-500">
            <Link href="#" className="hover:text-primary">Terms</Link>
            <Link href="#" className="hover:text-primary">Privacy</Link>
            <Link href="#" className="hover:text-primary">Github</Link>
          </div>
          <p className="text-sm text-slate-400">© 2026 TxtMe Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
