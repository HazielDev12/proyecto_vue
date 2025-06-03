<template>
  <header class="navbar">
    <nav class="nav-left">
      <button v-if="!enMenu" @click="volver">Volver al menú</button>
    </nav>
    <nav class="nav-right">
      <button @click="logout"><i class="bi bi-box-arrow-left me-2"></i>Cerrar sesión</button>
    </nav>
  </header>
</template>

<script setup>
// import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const router = useRouter() //para redireccionar programáticamente (como router.push('/login'))
const route = useRoute() //para acceder a la ruta actual

const enMenu = computed(() => {
  return route.path === '/Menu' || route.path === '/MenuGerente'
})

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('id_rol')
  localStorage.removeItem('id_usuario')
  router.push('/login')
}

function volver() {
  const rol = parseInt(localStorage.getItem('id_rol'))
  if (rol === 1) {
    router.push('/MenuGerente')
  } else if (rol === 2) {
    router.push('/Menu')
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
}

.nav-left,
.nav-right {
  display: flex;
  align-items: center;
}

button {
  background: none;
  border: 1px solid #ccc;
  color: #333;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #f0f0f0;
}
</style>
