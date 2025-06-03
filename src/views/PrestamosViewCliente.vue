<template>
  <Navbar />
  <div class="container mt-4">
    <h2 class="mb-4 text-center">Mis Préstamos</h2>

    <div v-if="prestamos.length" class="table-responsive">
      <table class="table table-bordered table-striped text-center">
        <thead class="table-dark">
          <tr>
            <th>Ejemplar</th>
            <th>Fecha Préstamo</th>
            <th>Fecha Devolución</th>
            <th>Devuelto</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in prestamos" :key="p.id_prestamo">
            <td>{{ p.libro_titulo }}</td>
            <td>{{ formatearFecha(p.fecha_prestamo) }}</td>
            <td>{{ formatearFecha(p.fecha_devolucion) || '-' }}</td>
            <td>
              <i :class="p.devuelto ? 'bi bi-check-square-fill text-success' : 'bi bi-x-square-fill text-danger'"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="text-center text-muted">No tienes préstamos.</p>
  </div>
</template>
<script setup>
import Navbar from '@/components/Navbar.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const prestamos = ref([])
const error = ref('')
const router = useRouter()

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:8000/PROJECT/prestamos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.status === 401) {
      // Token inválido o expirado
      router.push('/login')
      return
    }
    const data = await res.json()
    prestamos.value = data
  } catch (e) {
    error.value = 'No se pudo cargar los préstamos'
    console.error(e)
  }
})

const formatearFecha = (iso) => {
  if (!iso) return '-'
  const [año, mes, dia] = iso.split('-')
  return `${dia}-${mes}-${año}`
}

</script>

<style scoped>
</style>
