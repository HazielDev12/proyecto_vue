<template>
  <Navbar />
  <div class="container my-4">
    <h2 class="mb-4">Enviar recordatorio</h2>

    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead class="table-dark text-center">
          <tr>
            <th>Usuario</th>
            <th>Email</th>
            <th>Libro</th>
            <th>Fecha préstamo</th>
            <th>Fecha devolución</th>
            <th>Enviar Recordatorio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prestamo in prestamos" :key="prestamo.id_prestamo">
            <td>{{ prestamo.usuario_nombre }}</td>
            <td>{{ prestamo.usuario_email }}</td>
            <td>{{ prestamo.libro_titulo }}</td>
            <td>{{ prestamo.fecha_prestamo }}</td>
            <td>{{ prestamo.fecha_devolucion }}</td>
            <td class="text-center">
              <button class="btn btn-outline-primary btn-sm" @click="abrirModal(prestamo)">
                <i class="bi bi-envelope-fill"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="modalAbierto" class="modal d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Enviar recordatorio</h5>
            <button type="button" class="btn-close" @click="modalAbierto = false"></button>
          </div>
          <div class="modal-body">
            <p><strong>Para:</strong> {{ correo.to }}</p>
            <p><strong>Asunto:</strong> {{ correo.subject }}</p>
            <p><strong>Mensaje:</strong></p>
            <div class="p-2 bg-light border rounded" v-html="correo.body"></div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-success" @click="enviarCorreo">Enviar</button>
            <button class="btn btn-secondary" @click="modalAbierto = false">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import { ref, onMounted } from 'vue'

const prestamos = ref([])
const modalAbierto = ref(false)
const correo = ref({
  to: '',
  name: 'BIBLIOTECA BIU YI',
  subject: '',
  body: '',
})
const token = localStorage.getItem('token')

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:8000/PROJECT/prestamos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    prestamos.value = await res.json()
  } catch (err) {
    console.error('Error al obtener préstamos:', err)
  }
})

const abrirModal = (prestamo) => {
  correo.value.to = prestamo.usuario_email
  correo.value.subject = `Recordatorio BIBLIOTECA BIU YI`
  correo.value.body = `
    Hola ${prestamo.usuario_nombre},<br><br>
    <b>Le recordamos que se acerca la fecha de entrega de <i>${prestamo.libro_titulo}</i></b>, 
    el cual adquirió el día <b>${prestamo.fecha_prestamo}</b> y tiene una fecha programada de devolución el día <b>${prestamo.fecha_devolucion}</b>.<br>
    <br>
    Evite entregar fuera de tiempo para evitar recargos.<br><br>
    Saludos,<br>
    BIBLIOTECA BIU YI
  `
  modalAbierto.value = true
}

const enviarCorreo = async () => {
  try {
    const res = await fetch('http://localhost:8000/PROJECT/emails/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(correo.value),
    })

    if (!res.ok) throw new Error('Error al enviar el correo')

    alert('Correo enviado exitosamente')
    modalAbierto.value = false
  } catch (err) {
    console.error('Error al enviar el correo:', err)
    alert('No se pudo enviar el recordatorio')
  }
}
</script>
