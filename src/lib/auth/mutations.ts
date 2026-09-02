import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { cartKeys } from '@/lib/cart/cart.queries';
import { mergeGuestCart } from '@/lib/cart/merge-guest-cart';
import { claimGuestOrders } from '@/lib/order/claim-guest-orders';
import { createClient } from '@/lib/supabase/client';

import { authKeys } from './queries';

import type { LoginRequest, RegisterRequest, User } from '@/types/auth';

export function useRegister() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (input: RegisterRequest) => {
      const { error } = await createClient().auth.signUp({
        email: input.email,
        password: input.password,
        options: {
          data: { first_name: input.firstName, last_name: input.lastName, phone: input.phone },
        },
      });
      if (error) {
        throw error;
      }
      return { message: 'Check your email to confirm your account.' };
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.push('/auth/verify-email');
    },
    onError: (error: Error) => toast.error(error.message || 'Registration failed'),
  });
}
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: LoginRequest) => {
      const { error } = await createClient().auth.signInWithPassword(input);
      if (error) {
        throw error;
      }
    },
    onSuccess: async () => {
      await Promise.allSettled([claimGuestOrders(), mergeGuestCart()]);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: authKeys.all }),
        queryClient.invalidateQueries({ queryKey: cartKeys.all }),
        queryClient.invalidateQueries({ queryKey: ['orders'] }),
      ]);
      toast.success('Welcome back!');
      router.replace('/');
      router.refresh();
    },
    onError: (error: Error) => toast.error(error.message || 'Login failed'),
  });
}
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { error } = await createClient().auth.signOut();
      if (error) {
        throw error;
      }
    },
    onSettled: () => {
      queryClient.clear();
      toast.success('Signed out');
      router.replace('/');
      router.refresh();
    },
  });
}
export function useResendVerification() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { error } = await createClient().auth.resend({ type: 'signup', email });
      if (error) {
        throw error;
      }
      return { message: 'Verification email sent.' };
    },
    onSuccess: (data) => toast.success(data.message),
  });
}
export function useVerifyEmail() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (_token: string) => ({
      message: 'Email verification is handled by the secure confirmation link.',
    }),
    onSuccess: (data) => {
      toast.success(data.message);
      router.push('/auth/login');
    },
  });
}
export function useForgotPassword() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { error } = await createClient().auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
      });
      if (error) {
        throw error;
      }
      return { message: 'Password reset link sent.' };
    },
    onSuccess: (data) => toast.success(data.message),
  });
}
export function useResetPassword() {
  return useMutation({
    mutationFn: async (input: { newPassword: string }) => {
      const { error } = await createClient().auth.updateUser({ password: input.newPassword });
      if (error) {
        throw error;
      }
      return { message: 'Password updated.' };
    },
    onSuccess: (data) => toast.success(data.message),
  });
}
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: FormData): Promise<User> => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Sign in required');
      }
      const patch = {
        first_name: String(form.get('firstName') ?? ''),
        last_name: String(form.get('lastName') ?? ''),
        phone: String(form.get('phone') ?? '') || null,
        updated_at: new Date().toISOString(),
      };
      const { error } = await supabase.from('profiles').update(patch).eq('id', user.id);
      if (error) {
        throw error;
      }
      await queryClient.invalidateQueries({ queryKey: authKeys.me() });
      return queryClient.getQueryData(authKeys.me()) as User;
    },
    onSuccess: () => toast.success('Profile updated'),
    onError: (error: Error) => toast.error(error.message),
  });
}
export function useUploadAvatar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file: File) => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Sign in required');
      }
      const path = `${user.id}/avatar-${Date.now()}.${file.name.split('.').pop()}`;
      const { error } = await supabase.storage.from('avatars').upload(path, file, { upsert: true });
      if (error) {
        throw error;
      }
      const { data } = supabase.storage.from('avatars').getPublicUrl(path);
      await supabase.from('profiles').update({ avatar_url: data.publicUrl }).eq('id', user.id);
      await queryClient.invalidateQueries({ queryKey: authKeys.me() });
      return queryClient.getQueryData(authKeys.me()) as User;
    },
    onSuccess: () => toast.success('Avatar uploaded'),
    onError: (error: Error) => toast.error(error.message),
  });
}
export function useChangePassword() {
  return useMutation({
    mutationFn: async (input: { newPassword: string }) => {
      const { error } = await createClient().auth.updateUser({ password: input.newPassword });
      if (error) {
        throw error;
      }
      return { message: 'Password changed.' };
    },
    onSuccess: (data) => toast.success(data.message),
    onError: (error: Error) => toast.error(error.message),
  });
}
