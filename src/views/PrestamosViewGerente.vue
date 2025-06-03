<template>
  <Navbar />
  <div class="container mt-4">
    <h2 class="mb-4 text-center">Estado de préstamos</h2>

    <div v-if="prestamos.length" class="table-responsive">
      <table class="table table-bordered table-striped text-center">
        <thead class="table-dark">
          <tr>
            <th>ID Préstamo</th>
            <th>Ejemplar</th>
            <th>ID Usuario</th>
            <th>Usuario</th>
            <th>Fecha Préstamo</th>
            <th>Fecha Devolución</th>
            <th>Devuelto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in prestamos" :key="p.id_prestamo">
            <td>{{ p.id_prestamo }}</td>
            <td>{{ p.libro_titulo }}</td>
            <td>{{ p.id_usuario }}</td>
            <td>{{ p.usuario_nombre }}</td>

            <!-- Editables -->
            <td>
              <input v-if="editando === p.id_prestamo" v-model="p.fecha_prestamo" type="date" class="form-control" />
              <span v-else>{{ formatearFecha(p.fecha_prestamo) }}</span>
            </td>
            <td>
              <input v-if="editando === p.id_prestamo" v-model="p.fecha_devolucion" type="date" class="form-control" />
              <span v-else>{{ formatearFecha(p.fecha_devolucion) || '-' }}</span>
            </td>
            <td>
              <select v-if="editando === p.id_prestamo" v-model="p.devuelto" class="form-select">
                <option :value="true">Sí</option>
                <option :value="false">No</option>
              </select>
              <span v-else> <i
                  :class="p.devuelto ? 'bi bi-check-square-fill text-success' : 'bi bi-x-square-fill text-danger'"></i>
              </span>
            </td>

            <!-- Acciones -->
            <td class="text-center">
              <button v-if="editando === p.id_prestamo" @click="guardarCambios(p)" class="btn btn-success btn-sm"
                title="Guardar">
                <i class="bi bi-check-lg"></i>
              </button>
              <button v-else @click="editarFila(p.id_prestamo)" class="btn btn-primary btn-sm" title="Editar">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button @click="eliminarPrestamo(p.id_prestamo)" class="btn btn-danger btn-sm ms-2">
                <i class="bi bi-trash"></i>
              </button>
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
const editando = ref(null)

const editarFila = (id) => {
  editando.value = id
}

const guardarCambios = async (p) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`http://localhost:8000/PROJECT/prestamos/${p.id_prestamo}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_prestamo: p.id_prestamo,
        id_usuario: p.id_usuario,
        id_ejemplar: p.id_ejemplar,
        fecha_prestamo: p.fecha_prestamo,
        fecha_devolucion: p.fecha_devolucion,
        devuelto: p.devuelto,
      }),
    })

    if (!res.ok) {
      throw new Error('Error al guardar los cambios')
    }

    editando.value = null
  } catch (err) {
    console.error(err)
    alert('No se pudo guardar los cambios')
  }
}

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:8000/PROJECT/prestamos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.status === 401) {
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

const eliminarPrestamo = async (id) => {
  if (!confirm('¿Seguro que deseas eliminar este préstamo?')) return;

  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:8000/PROJECT/prestamos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('Error al eliminar');

    // Quitar préstamo del arreglo local para actualizar vista
    prestamos.value = prestamos.value.filter(p => p.id_prestamo !== id);
  } catch (error) {
    alert('No se pudo eliminar el préstamo');
    console.error(error);
  }
};

</script>
