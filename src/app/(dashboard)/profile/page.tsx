'use client';

import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { User, Mail, Shield, AlertTriangle, Save, Trash2, AtSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';

export default function ProfilePage() {
  const { user, updateProfile, isUpdating, deleteAccount, isDeleting } = useAuth();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    username: user?.username || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Account Settings</h1>
          <p className="text-slate-500 font-medium text-lg">Manage your personal information and security preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="p-8 border-none shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl">
                      <User className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold">Personal Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">First Name</label>
                      <Input 
                        value={formData.firstname}
                        onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                        placeholder="John"
                        className="bg-slate-50/50 border-slate-100 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Last Name</label>
                       <Input 
                         value={formData.lastname}
                         onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                         placeholder="Doe"
                         className="bg-slate-50/50 border-slate-100 rounded-xl"
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Username</label>
                     <div className="relative">
                        <Input 
                          value={formData.username}
                          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                          placeholder="johndoe"
                          className="bg-slate-50/50 border-slate-100 rounded-xl pl-10"
                        />
                        <AtSign className="w-4 h-4 text-slate-300 absolute left-4 top-1/2 -translate-y-1/2" />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                     <div className="relative">
                        <Input 
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          className="bg-slate-50/50 border-slate-100 rounded-xl pl-10"
                        />
                        <Mail className="w-4 h-4 text-slate-300 absolute left-4 top-1/2 -translate-y-1/2" />
                     </div>
                  </div>

                  <div className="pt-4">
                    <Button 
                      disabled={isUpdating}
                      className="w-full md:w-auto px-8 h-12 rounded-2xl shadow-lg shadow-primary/20"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isUpdating ? 'Saving Changes...' : 'Save Settings'}
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          </div>

          {/* Right Column: Account Status & Actions */}
          <div className="space-y-6">
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.1 }}
            >
              <Card className="p-6 border-none shadow-sm bg-primary/5">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-slate-900">Account Status</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 font-medium">Account Tier</span>
                    <span className="font-black text-primary uppercase">Pro Account</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 font-medium">Joined TxtMe</span>
                    <span className="font-bold text-slate-700">12 days ago</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
            >
              <Card className="p-6 border-none shadow-sm bg-red-50 border border-red-100">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <h3 className="font-bold text-red-900 uppercase tracking-wider text-xs">Danger Zone</h3>
                </div>
                <p className="text-sm text-red-600 font-medium mb-6 leading-relaxed">
                  Removing your account is permanent. All contacts, tags, and data will be lost forever.
                </p>
                <Button 
                  onClick={() => setIsDeleteModalOpen(true)}
                  variant="outline" 
                  className="w-full border-red-200 text-red-600 hover:bg-red-500 hover:text-white transition-all rounded-xl font-bold h-11"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete your account?"
      >
        <div className="space-y-6">
          <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-4">
            <div className="p-2 bg-red-100 text-red-600 rounded-lg shrink-0">
               <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-red-900">This is irreversible</p>
              <p className="text-sm text-red-600 font-medium">
                You will lose access to all your contacts and organized data forever.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 rounded-xl h-12"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-red-600 hover:bg-red-700 text-white border-none rounded-xl h-12 font-bold shadow-lg shadow-red-200"
              onClick={() => deleteAccount()}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Yes, Delete'}
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
