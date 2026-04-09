'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';
import { Send } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary via-accent to-primary/80 overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-white/20 blur-[150px] rounded-full animate-float" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-primary-light/20 blur-[150px] rounded-full animate-float" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Card className="p-8 md:p-10 bg-white/90 backdrop-blur-2xl border-white/50 shadow-2xl space-y-8 rounded-[2.5rem]">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/30 rotate-3">
              <Send className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back!</h1>
            <p className="text-slate-500">We missed you! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="space-y-1">
              <Input
                label="Password"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex justify-end">
                <button type="button" className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                  Forgot password?
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-12" isLoading={isLoading}>
              Sign in
            </Button>
          </form>

          <div className="text-center">
            <p className="text-slate-500 text-sm">
              Don't have an account?{' '}
              <Link href="/signup" className="text-primary font-bold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
