import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import api from '../services/api';

const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        role: null,

        login: async (email, password) => {
          try {
            const res = await api.post('/auth/login', { email, password });
            const { token, user } = res.data;
            set({ user, token, role: user?.role || null });
            return { success: true };
          } catch (err) {
            const msg = err?.response?.data?.msg || err?.message || 'Login failed';
            return { success: false, error: msg };
          }
        },

        register: async ({ email, password, name, role, department }) => {
          try {
            const res = await api.post('/auth/register', {
              email,
              password,
              name,
              role,
              department,
            });
            const { token, user } = res.data;
            set({ user, token, role: user?.role || null });
            return { success: true };
          } catch (err) {
            const msg = err?.response?.data?.msg || err?.message || 'Registration failed';
            return { success: false, error: msg };
          }
        },

        logout: async () => {
          const token = get().token;
          try {
            // best-effort; JWT is stateless
            if (token) {
              await api.post('/auth/logout');
            }
          } finally {
            set({ user: null, token: null, role: null });
          }
        },

        fetchMe: async () => {
          try {
            const res = await api.get('/auth/me');
            const me = res.data;
            set({
              user: me,
              token: get().token,
              role: me?.role || null,
            });
            return { success: true };
          } catch (err) {
            return { success: false, error: err?.response?.data?.msg || err?.message };
          }
        },

        isAuthenticated: () => !!get().token,
      }),
      {
        name: 'auth-storage',
      }
    )
  )
);

export default useAuthStore;


