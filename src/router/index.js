// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import PrestamosViewCliente from '@/views/PrestamosViewCliente.vue'
import PrestamosViewGerente from '@/views/PrestamosViewGerente.vue'
import PrestarLibro from '@/views/PrestarLibro.vue'
import Menu from '@/views/Menu.vue'
import MenuGerente from '@/views/MenuGerente.vue'
import EnviarRecordatorio from '@/views/EnviarRecordatorio.vue'
const routes = [
  //1 para gerente, 2 para CLiente
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  {
    path: '/prestamosCliente',
    component: PrestamosViewCliente,
    meta: { requiresAuth: true, roles: [2] },
  },
  {
    path: '/prestamosGerente',
    component: PrestamosViewGerente,
    meta: { requiresAuth: true, roles: [1] },
  },
  {
    path: '/prestarLibro',
    component: PrestarLibro,
    meta: { requiresAuth: true, roles: [2] },
  },
  {
    path: '/Menu',
    component: Menu,
    meta: { requiresAuth: true, roles: [2] },
  },
  {
    path: '/MenuGerente',
    component: MenuGerente,
    meta: { requiresAuth: true, roles: [1] },
  },
  {
    path: '/EnviarRecordatorio',
    component: EnviarRecordatorio,
    meta: { requiresAuth: true, roles: [1] },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const role = parseInt(localStorage.getItem('id_rol'))

  // Si intenta ir al login y ya tiene token, redirige según su rol
  if (to.path === '/login' && token) {
    return role === 1 ? next('/MenuGerente') : next('/Menu')
  }

  // Si necesita autenticación y no hay token, lo mandamos al login
  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  // Si hay roles definidos y el rol no coincide, redirige a su menú
  if (to.meta.roles && !to.meta.roles.includes(role)) {
    return role === 1 ? next('/MenuGerente') : next('/Menu')
  }

  next()
})

export default router
