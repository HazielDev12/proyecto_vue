// src/stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
  }),
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
    loadToken() {
      this.token = localStorage.getItem('token')
    },
    logout() {
      this.token = null
      localStorage.removeItem('token')
    },
  },
})
