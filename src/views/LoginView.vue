<template>
  <div class="container mt-5 pt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card shadow p-4">
          <h2 class="text-center mb-4">Iniciar sesión</h2>
          <i class="bi bi-person-circle display-1 text-primary mb-5 mt-3 text-center"></i>

          <div class="mb-3">
            <i class="bi bi-envelope-fill"></i>
            <label for="email" class="form-label">Correo electrónico</label>
            <input id="email" v-model="email" type="email" class="form-control" placeholder="Ingresa tu correo"
              required />
          </div>

          <div class="mb-5">
            <i class="bi bi-lock-fill"></i>
            <label for="password" class="form-label">Contraseña</label>
            <input id="password" v-model="password" type="password" class="form-control"
              placeholder="Ingresa tu contraseña" required />
          </div>

          <button @click="login" class="btn btn-primary w-100 mb-3"><i class="bi bi-box-arrow-in-right me-2"></i> Ingresar
            Ingresar</button>

          <div v-if="error" class="alert alert-danger mt-3 text-center" role="alert">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  error.value = ''

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
    email: email.value,
    password: password.value,
  })

  const requestOptions = {
    method: 'POST',
    headers,
    body: raw,
    redirect: 'follow',
  }

  try {
    const response = await fetch('http://localhost:8000/PROJECT/usuarios/login', requestOptions)

    if (!response.ok) {
      const errorData = await response.json()
      error.value = errorData.mensaje || 'Credenciales incorrectas'
      return
    }

    const result = await response.json()

    // Guarda el token y el rol en localStorage
    localStorage.setItem('token', result.token)
    localStorage.setItem('id_rol', result.user.role)
    localStorage.setItem('id_usuario', result.user.id)

    // Redirige según el rol
    if (result.user.role === 1) {
      router.push('/MenuGerente') // o donde quieras
    } else {
      router.push('/Menu')
    }
  } catch (err) {
    console.error('Error de red:', err)
    error.value = 'No se pudo conectar con el servidor'
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
