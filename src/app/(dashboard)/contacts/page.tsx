'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useContacts, Contact } from '@/hooks/useContacts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { ContactForm } from '@/components/ContactForm';
import { 
  Plus, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MapPin, 
  Star, 
  Trash2, 
  ArrowRight,
  User,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';

export default function ContactsPage() {
  const { contacts, isLoading, deleteContact, updateContact } = useContacts();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | undefined>(undefined);

  const filteredContacts = contacts.filter((c: Contact) => 
    c.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      deleteContact(id);
    }
  };

  const handleToggleFavorite = (contact: Contact) => {
    updateContact({ id: contact.id, data: { isFavorite: !contact.isFavorite } });
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingContact(undefined);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your Contacts</h1>
            <p className="text-slate-500 font-medium">Manage and organize your professional network.</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="rounded-2xl h-12 shadow-lg shadow-primary/20">
            <Plus className="w-5 h-5" /> Add New Contact
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Input 
              placeholder="Search by name, email, or company..."
              className="pl-12 h-12 rounded-2xl border-none shadow-sm focus:ring-primary/10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
          </div>
          <Button variant="outline" className="h-12 rounded-2xl px-6 bg-white border-none shadow-sm">
            <Filter className="w-5 h-5 mr-2" /> Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredContacts.map((contact: Contact, i: number) => (
              <motion.div
                key={contact.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
              >
                <Card className="p-6 border-none shadow-sm hover:shadow-xl transition-all group relative overflow-hidden h-full flex flex-col">
                  <div className={`absolute top-0 right-0 w-32 h-32 ${contact.isFavorite ? 'bg-amber-400/5' : 'bg-primary/5'} blur-3xl -z-10 rounded-full transition-transform group-hover:scale-150`} />
                  
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl font-black text-slate-600 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                      {contact.firstname?.charAt(0)}
                    </div>
                    <div className="flex gap-1">
                      <button 
                         onClick={() => handleToggleFavorite(contact)}
                         className={`p-2 rounded-xl transition-all ${contact.isFavorite ? 'text-amber-400' : 'text-slate-300 hover:text-amber-400 hover:bg-amber-50'}`}
                      >
                        <Star className={`w-5 h-5 ${contact.isFavorite ? 'fill-current' : ''}`} />
                      </button>
                      <button 
                        onClick={() => handleDelete(contact.id)}
                        className="p-2 text-slate-300 hover:text-red-500 rounded-xl hover:bg-red-50 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 flex-1">
                    <div>
                      <h3 className="text-xl font-black text-slate-900">{contact.firstname} {contact.lastname}</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {contact.company || 'Professional Client'}
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {contact.email && (
                        <div className="flex items-center gap-3 text-sm text-slate-600 font-semibold truncate group-hover:text-primary transition-colors">
                          <Mail className="w-4 h-4 text-slate-300 group-hover:text-primary/50" /> {contact.email}
                        </div>
                      )}
                      {contact.phone && (
                        <div className="flex items-center gap-3 text-sm text-slate-600 font-semibold">
                          <Phone className="w-4 h-4 text-slate-300" /> {contact.phone}
                        </div>
                      )}
                      {contact.address && (
                        <div className="flex items-center gap-3 text-sm text-slate-600 font-semibold line-clamp-1">
                          <MapPin className="w-4 h-4 text-slate-300" /> {contact.address}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {contact.tags?.map((tag: any) => (
                        <Badge key={tag.id} className="bg-slate-50 text-slate-500 border-none px-3 py-1 font-bold">
                           {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant="ghost" 
                    onClick={() => handleEdit(contact)}
                    className="w-full mt-6 bg-slate-50 hover:bg-primary hover:text-white rounded-xl font-bold py-6 group-hover:shadow-md transition-all"
                  >
                    View / Edit profile <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={editingContact ? 'Edit Contact' : 'New Contact'}
      >
        <ContactForm 
          initialData={editingContact} 
          onSuccess={closeModal} 
        />
      </Modal>
    </DashboardLayout>
  );
}
