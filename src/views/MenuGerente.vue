<template>
  <Navbar />
  <div class="container text-center mt-5">
    <h2 class="mb-4">Menú del Gerente</h2>
    <div class="d-flex flex-wrap justify-content-center gap-4">
      <div class="card menu-card p-4 shadow-sm" style="width: 250px; cursor: pointer;" @click="goTo('prestamosGerente')">
        <i class="bi bi-book fs-1 text-info"></i>
        <i class="bi bi-arrow-down-up fs-1 text-info"></i>
        <h3 class="mt-3">Préstamos</h3>
      </div>
      <div class="card menu-card p-4 shadow-sm" style="width: 250px; cursor: pointer;" @click="goTo('EnviarRecordatorio')">
        <i class="bi bi-envelope-exclamation fs-1 text-warning"></i>
        <h3 class="mt-3">Enviar recordatorio</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goTo = (ruta) => {
  router.push(`/${ruta}`)
}
</script>

<style scoped>
.menu-card {
  background-color: #f8f9fa;
  max-width: 250px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

</style>