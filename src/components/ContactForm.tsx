'use client';

import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useContacts, Contact } from '@/hooks/useContacts';
import { User, Mail, Phone, MapPin, Building, Star } from 'lucide-react';

interface ContactFormProps {
  initialData?: Contact;
  onSuccess: () => void;
}

export const ContactForm = ({ initialData, onSuccess }: ContactFormProps) => {
  const { createContact, updateContact } = useContacts();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstname: initialData?.firstname || '',
    lastname: initialData?.lastname || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    company: initialData?.company || '',
    favorite: initialData?.favorite || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData) {
        await updateContact({ id: initialData.id, data: formData });
      } else {
        await createContact(formData);
      }
      onSuccess();
    } catch (error) {
       // handled by hook toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label="First Name" 
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
          placeholder="John"
        />
        <Input 
          label="Last Name" 
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
          placeholder="Doe"
        />
      </div>

      <Input 
        label="Email Address" 
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="john@example.com"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label="Phone Number" 
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 000-0000"
        />
        <Input 
          label="Company" 
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Acme Inc."
        />
      </div>

      <Input 
        label="Address" 
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="123 Street Name, City"
      />

      <div className="flex items-center gap-2 p-4 bg-slate-50 rounded-2xl">
        <input 
          type="checkbox" 
          id="favorite" 
          name="favorite"
          checked={formData.favorite}
          onChange={handleChange}
          className="w-5 h-5 rounded-lg border-slate-300 text-primary focus:ring-primary/20"
        />
        <label htmlFor="favorite" className="text-sm font-bold text-slate-700 flex items-center gap-2 cursor-pointer">
          <Star className={`w-4 h-4 ${formData.favorite ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
          Mark as favorite
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <Button 
          type="submit" 
          className="flex-1 h-12 shadow-lg shadow-primary/20" 
          isLoading={loading}
        >
          {initialData ? 'Update Contact' : 'Save Contact'}
        </Button>
      </div>
    </form>
  );
};
