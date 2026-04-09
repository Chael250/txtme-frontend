'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Sparkles, Search, MessageSquare, ArrowRight, User, Mail, Phone, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { Badge } from '@/components/ui/Badge';
import { Contact } from '@/hooks/useContacts';

export default function AISearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (forcedQuery?: string) => {
    const q = forcedQuery || query;
    if (!q.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    try {
      const res: any = await api.post('/contacts/ai-search', { query: q }).catch(() => 
         api.get(`/contacts/search?q=${q}`)
      );
      
      const contacts = res.data.contacts || res.data || [];
      setResults(contacts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-20">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black tracking-tight">AI Network Intelligence</h1>
          <p className="text-slate-500 font-medium max-w-lg mx-auto">
            Search your contacts using natural language. Try "Find Emily from MTN" or "Who works at Google?"
          </p>
        </div>

        <div className="relative group max-w-2xl mx-auto">
          <Input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Ask anything about your contacts..."
            className="h-16 pl-14 pr-32 text-lg rounded-[2rem] border-primary/20 shadow-xl focus:ring-primary/10"
          />
          <Sparkles className="w-6 h-6 text-primary/40 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
          <Button 
            onClick={() => handleSearch()}
            isLoading={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-6 rounded-3xl shadow-lg"
          >
            Search <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {!isLoading && results.length === 0 && (
          <div className="space-y-6 max-w-2xl mx-auto">
            {hasSearched ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center p-12 bg-white rounded-[2rem] shadow-sm border border-slate-100"
              >
                <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No contacts found</h3>
                <p className="text-slate-500 font-medium">
                  We couldn't find any contacts matching your query. <br/>Try adjusting your search or using different keywords.
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Contacts from Rwanda', 'People tagged as "Friends"', 'Who is John McCormick?'].map((suggestion: string) => (
                  <button 
                    key={suggestion}
                    onClick={() => { setQuery(suggestion); handleSearch(suggestion); }}
                    className="p-4 bg-white/50 border border-slate-100 rounded-2xl text-left hover:bg-white hover:shadow-md transition-all group flex items-center justify-between"
                  >
                    <span className="text-sm font-semibold text-slate-600 group-hover:text-primary">{suggestion}</span>
                    <MessageSquare className="w-4 h-4 text-slate-300 group-hover:text-primary" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {results.map((contact: Contact, i: number) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow border-none group overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48 h-48 bg-slate-100 rounded-2xl flex items-center justify-center relative overflow-hidden shrink-0">
                       <User className="w-16 h-16 text-slate-300" />
                       <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
                    </div>
                    <div className="flex-1 space-y-4 py-2">
                       <div className="flex items-center justify-between px-2 md:px-0">
                          <div>
                             <h3 className="text-2xl font-black tracking-tight">{contact.firstname} {contact.lastname}</h3>
                             <div className="flex items-center gap-2">
                                <p className="text-slate-400 font-bold text-sm uppercase">Added {new Date(contact.createdAt).toLocaleDateString()}</p>
                                <span className="text-slate-200">|</span>
                                <p className="text-primary font-bold text-sm uppercase tracking-wider">{contact.company || 'Individual'}</p>
                             </div>
                          </div>
                          <Badge className="bg-primary-light text-primary py-1 px-4">Match found ✨</Badge>
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3 text-slate-600 font-medium">
                             <Mail className="w-4 h-4 text-primary/50" /> {contact.email}
                          </div>
                          {contact.phone && (
                            <div className="flex items-center gap-3 text-slate-600 font-medium">
                               <Phone className="w-4 h-4 text-emerald-500/50" /> {contact.phone}
                            </div>
                          )}
                       </div>

                       <div className="flex flex-wrap gap-2 pt-2">
                          {contact.tags?.map((tag: any) => (
                            <div key={tag.id} className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-500">
                               <Tag className="w-3 h-3" /> {tag.name}
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
}
