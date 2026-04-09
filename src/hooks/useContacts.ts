import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export interface Contact {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  address?: string;
  company?: string;
  avatar?: string;
  tags: { id: string; name: string }[];
  notes: { id: string; content: string }[];
  favorite: boolean;
  createdAt: string;
}

export const useContacts = () => {
  const queryClient = useQueryClient();

  const getContacts = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const res: any = await api.get('/contacts');
      return res.data;
    },
  });

  const createContact = useMutation({
    mutationFn: (data: Partial<Contact>) => api.post('/contacts', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact created successfully');
    },
    onError: (err: any) => toast.error(err),
  });

  const updateContact = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Contact> }) => 
      api.put(`/contacts/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact updated');
    },
    onError: (err: any) => toast.error(err),
  });

  const deleteContact = useMutation({
    mutationFn: (id: string) => api.delete(`/contacts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Contact deleted');
    },
    onError: (err: any) => toast.error(err),
  });

  const searchContacts = (query: string) => useQuery({
    queryKey: ['contacts', 'search', query],
    queryFn: async () => {
      const res: any = await api.get(`/contacts/search?q=${query}`);
      return res.data;
    },
    enabled: query.length > 2,
  });

  const aiSearch = useMutation({
    mutationFn: (query: string) => api.post('/contacts/ai-search', { query }),
    onSuccess: (res: any) => {
      // Handle AI search results
    },
  });

  return {
    contacts: getContacts.data?.contacts || [],
    isLoading: getContacts.isLoading,
    createContact: createContact.mutateAsync,
    updateContact: updateContact.mutate,
    isUpdating: updateContact.isPending,
    deleteContact: deleteContact.mutate,
    searchContacts,
    aiSearch: aiSearch.mutate,
    isSearchingAi: aiSearch.isPending,
  };
};
