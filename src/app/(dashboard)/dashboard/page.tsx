'use client';

import { DashboardLayout } from '@/components/DashboardLayout';
import { useContacts, Contact } from '@/hooks/useContacts';
import { Card } from '@/components/ui/Card';
import { Users, Star, Clock, Plus, MoreVertical, ShieldCheck, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

export default function DashboardPage() {
  const { contacts, isLoading } = useContacts();

  const stats = [
    { label: 'Total Contacts', value: contacts.length, icon: Users, color: 'bg-primary' },
    { label: 'Favorites', value: contacts.filter((c: Contact) => c.favorite).length, icon: Star, color: 'bg-amber-400' },
    { label: 'Recently Added', value: contacts.slice(0, 5).length, icon: Clock, color: 'bg-emerald-400' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat: any, i: number) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="flex items-center gap-5 p-6 border-none shadow-sm hover:shadow-md transition-shadow">
                <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              Recent Contacts <Badge className="bg-primary/10 text-primary">{contacts.length} Total</Badge>
            </h3>
            <div className="flex gap-3">
              <Link href="/contacts">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
              <Link href="/contacts">
                <Button size="sm"><Plus className="w-4 h-4" /> Add New</Button>
              </Link>
            </div>
          </div>

          <Card className="p-0 overflow-hidden border-none shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Details</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Tags</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {isLoading ? (
                    <tr><td colSpan={5} className="p-10 text-center text-slate-400">Loading contacts...</td></tr>
                  ) : contacts.length === 0 ? (
                    <tr><td colSpan={5} className="p-10 text-center text-slate-400">No contacts found. Create your first one!</td></tr>
                  ) : (
                    contacts.slice(0, 10).map((contact: Contact, i: number) => (
                      <motion.tr 
                        key={contact.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                              {contact.firstname?.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{contact.firstname} {contact.lastname}</p>
                              <p className="text-xs text-slate-400 font-medium">Added on {new Date(contact.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="space-y-1">
                            {contact.email && (
                              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 line-clamp-1">
                                <Mail className="w-3 h-3 text-primary/60" /> {contact.email}
                              </div>
                            )}
                            {contact.phone && (
                              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                                <Phone className="w-3 h-3 text-emerald-500/60" /> {contact.phone}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-wrap gap-1.5">
                            {contact.tags?.map((tag: any) => (
                              <Badge key={tag.id} className="bg-slate-100 text-slate-600 border-none px-2 py-0">
                                {tag.name}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          {contact.favorite ? (
                            <Badge className="bg-amber-50 text-amber-600 border border-amber-100">
                              <Star className="w-3 h-3 mr-1 fill-current" /> Favorite
                            </Badge>
                          ) : (
                            <Badge className="bg-blue-50 text-blue-600 border border-blue-100">
                              <ShieldCheck className="w-3 h-3 mr-1" /> Active
                            </Badge>
                          )}
                        </td>
                        <td className="px-6 py-5">
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="w-5 h-5 text-slate-400" />
                          </Button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
