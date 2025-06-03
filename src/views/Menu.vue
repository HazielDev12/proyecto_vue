<template>
  <Navbar />
  <div class="container text-center mt-5">
    <h2 class="mb-4">Menú principal</h2>
<!--     <div class="text-muted text-center mb-3">
      Ruta actual: {{ route.path }}
    </div> -->
    <div class="d-flex flex-wrap justify-content-center gap-4">
      <div class="card menu-card p-4 shadow-sm" style="width: 250px; cursor: pointer;" @click="goTo('prestamosCliente')">
        <i class="bi bi-eye fs-1 text-primary"></i>
        <h3 class="mt-3">Ver libros prestados</h3>
      </div>
      <div class="card menu-card p-4 shadow-sm" style="width: 250px; cursor: pointer;" @click="goTo('prestarlibro')">
        <i class="bi bi-book fs-1 text-success"></i>
        <h3 class="mt-3">Prestar libros</h3>
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
