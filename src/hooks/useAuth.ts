import { useMutation, useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const { setUser, logout: clearAuth } = useAuthStore();
  const router = useRouter();

  const getMe = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get('/auth/me'),
    retry: false,
    enabled: !!useAuthStore.getState().isAuthenticated,
  });

  const loginMutation = useMutation({
    mutationFn: (data: any) => api.post('/auth/login', data),
    onSuccess: (res: any) => {
      setUser(res.data.user);
      router.push('/dashboard');
      toast.success('Welcome back!');
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: any) => api.post('/auth/register', data),
    onSuccess: () => {
      router.push('/login');
      toast.success('Registration successful! Please login.');
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => api.post('/auth/logout'),
    onSuccess: () => {
      clearAuth();
      router.push('/login');
      toast.success('Logged out successfully');
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: any) => api.put(`/users/${useAuthStore.getState().user?.id}`, data),
    onSuccess: (res: any) => {
      setUser(res.data.user);
      toast.success('Profile updated successfully');
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: () => api.delete(`/users/${useAuthStore.getState().user?.id}`),
    onSuccess: () => {
      clearAuth();
      router.push('/signup');
      toast.success('Account deleted successfully');
    },
    onError: (err: any) => {
      toast.error(err);
    },
  });

  return {
    user: getMe.data?.data?.user,
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    logout: logoutMutation.mutate,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
    deleteAccount: deleteAccountMutation.mutate,
    isDeleting: deleteAccountMutation.isPending,
  };
};
