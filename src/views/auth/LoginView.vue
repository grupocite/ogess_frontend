<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../stores/auth'
import { ElMessage } from 'element-plus'
import bcrypt from 'bcryptjs' // Importa la biblioteca de bcrypt que estés utilizando
import { Modal } from 'bootstrap'
import axios from 'axios'

export default defineComponent({
  setup() {
    const state = reactive({
      email: '',
      password: '',
      newPassword: '',
      confirmPassword: ''
    })

    const openModal = () => {
      const myModalElement = document.getElementById('personalizado')
      if (myModalElement) {
        const myModal = new Modal(myModalElement, { backdrop: false })
        myModal.show()
      }
    }

    const showModal = ref(false)
    const newPassword = ref('')
    const confirmPassword = ref('')
    const headers = useAuth().headers()
    const tokens = ref('')

    const { login } = useAuth()
    const router = useRouter()

    const emailInput = ref()
    const passwordInput = ref()
    const passwordInputChange = ref()

    const handleSubmit = async () => {
      const email = emailInput.value.value
      const password = passwordInput.value.value

      if (!email || !password) {
        ElMessage.warning('Ingrese sus credenciales')
        return
      }

      if (password === 'ogess2023') {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/login`,
            {
              email,
              password
            },
            {
              ...headers
            }
          )

          if (response.status === 200 && response.data.access_token) {
            const token = response.data.access_token
            tokens.value = token

            console.log(token)

            openModal()
            showModal.value = true
            newPassword.value = ''
            confirmPassword.value = ''
          } else {
            console.error('No se recibió un token en la respuesta.')
          }
        } catch (error) {
          console.error(error)
        }
      } else {
        try {
          await login(email, password)
          router.push('/')
        } catch (error) {
          console.log(error)
        }
      }
    }

    const savePassword = async () => {
      const newPassword = state.newPassword
      const confirmPassword = state.confirmPassword

      console.log(newPassword)

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/actualizar-contrasena`,
          {
            password: newPassword,
            password_confirmation: confirmPassword
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + tokens.value
            }
          }
        )

        if (response.status === 200) {

          
          if (response.data && response.data.message) {
            ElMessage.success(response.data.message)
          }
          
          router.push('/')
        } else {
          console.error('Error al cambiar la contraseña.')
        }
      } catch (error) {
        console.error('Error al cambiar la contraseña:', error)
      }
    }

    const showPassword = ref(false)

    const passwordVisibility = () => {
      showPassword.value = !showPassword.value
    }

    return {
      email: state.email,
      password: state.password,
      handleSubmit,
      emailInput,
      tokens,
      passwordInput,
      showPassword,
      state,
      headers,
      passwordInputChange,
      passwordVisibility,
      showModal,
      newPassword,
      savePassword,
      confirmPassword
    }
  }
})
</script>

<template>
  <div class="fixed-container">
    <div class="container">
      <div class="img">
        <img src="@/assets/img/bg.svg" />
      </div>
      <div class="login-content">
        <form @submit.prevent="handleSubmit">
          <img src="@/assets/img/avatar.svg" />
          <h2 class="title">BIENVENIDO</h2>
          <div class="input-div one">
            <div class="i">
              <i class="fas fa-user"></i>
            </div>
            <div class="div">
              <input type="text" class="input" id="emailRef" ref="emailInput" placeholder="user" />
            </div>
          </div>
          <div class="input-div pass">
            <div class="i">
              <i class="fas fa-lock"></i>
            </div>
            <div class="div">
              <input
                type="password"
                class="input"
                id="passwordRef"
                ref="passwordInput"
                placeholder="password"
              />
            </div>
          </div>
          <button class="btn" value="Login">Iniciar</button>
        </form>
      </div>
    </div>
  </div>

  <!-- Modal Personalizado -->
  <div
    class="modal fade custom-modal custom-backdrop-modal"
    id="personalizado"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" style="margin: 0 auto">
      <div class="modal-content">
        <br />
        <div class="modal-header">
          <h5 class="modal-title custom-title" id="exampleModalLabel">Cambiar Contraseña</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" style="padding: 20px">
          <form>
            <div class="mb-3">
              <label for="new-password" class="col-form-label">Nueva Contraseña:</label>
              <input
                type="password"
                class="form-control"
                id="new-password"
                ref="passwordInputChange"
                v-model="state.newPassword"
              />
            </div>
            <div class="mb-3">
              <label for="confirm-password" class="col-form-label">Confirmar Contraseña:</label>
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                v-model="state.confirmPassword"
              />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="savePassword">Cambiar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
** {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.modal-dialog {
  width: 762px;
}

/* Estilo para alinear el label "Recipient" a la izquierda de los campos de entrada */
.col-form-label {
  text-align: left;
  display: block;
  margin-right: 10px; // Ajusta el margen entre el label y los campos de entrada
}

.custom-backdrop-modal {
  background: rgba(0, 0, 0, 0.6); // Color oscuro con transparencia para el fondo
}

.modal-content {
  height: 400px;
}

.custom-title {
  text-align: center;
  margin: 0 auto;
}

/* Aumentar la altura de los inputs específicos */
#recipient-name {
  height: 80px; // Ajusta la altura de los inputs a 40 píxeles, puedes ajustar el valor según tus necesidades
}

.modal-body {
  text-align: center;
  margin: 0 auto;
}

.modal-b {
  padding-left: 24px;
}

.fixed-container {
  position: fixed; // Hace que el contenedor sea fijo en la pantalla
  top: 0;
  left: 0;
  width: 100%; // Opcionalmente, pued@es especificar un ancho máximo
  height: 100%; // Opcionalmente, puedes especificar una altura máxima
  overflow: auto; // Agrega desplazamiento si el contenido es demasiado grande para la pantalla
  // Resto de tu CSS actual...
}

/* Aplicar estilos al botón de cierre */
.btn-close {
  position: absolute;
  top: 10px; // Ajusta el valor superior según sea necesario
  right: 10px; // Ajusta el valor derecho según sea necesario
  font-size: 1.5rem; // Ajusta el tamaño de fuente según sea necesario
}

/* Asegurarse de que el botón de cierre tenga un índice Z alto para estar por encima del contenido */
.btn-close {
  z-index: 9999;
}

body {
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
}

.wave {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100%;
  z-index: -1;
}

.container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 7rem;
  padding: 0 2rem;
}

.img {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.login-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
}

.img img {
  width: 600px;
}

form {
  width: 360px;
}

.login-content img {
  height: 100px;
}

.login-content h2 {
  margin: 15px 0;
  color: #333;
  text-transform: uppercase;
  font-size: 2.9rem;
}

.login-content .input-div {
  position: relative;
  display: grid;
  grid-template-columns: 7% 93%;
  margin: 25px 0;
  padding: 5px 0;
  border-bottom: 2px solid #d9d9d9;
}

.login-content .input-div.one {
  margin-top: 0;
}

.i {
  color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
}

.i i {
  transition: 0.3s;
}

.input-div > div {
  position: relative;
  height: 45px;
}

.input-div > div > h5 {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 18px;
  transition: 0.3s;
}

.input-div:before,
.input-div:after {
  content: '';
  position: absolute;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background-color: #38d39f;
  transition: 0.4s;
}

.input-div:before {
  right: 50%;
}

.input-div:after {
  left: 50%;
}

.input-div.focus:before,
.input-div.focus:after {
  width: 50%;
}

.input-div.focus > div > h5 {
  top: -5px;
  font-size: 15px;
}

.input-div.focus > .i > i {
  color: #38d39f;
}

.input-div > div > input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: none;
  padding: 0.5rem 0.7rem;
  font-size: 1.2rem;
  color: #555;
  font-family: 'poppins', sans-serif;
}

.input-div.pass {
  margin-bottom: 4px;
}

a {
  display: block;
  text-align: right;
  text-decoration: none;
  color: #999;
  font-size: 0.9rem;
  transition: 0.3s;
}

a:hover {
  color: #38d39f;
}

.btn {
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  outline: none;
  border: none;
  background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
  background-size: 200%;
  font-size: 1.2rem;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  text-transform: uppercase;
  margin: 1rem 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn-secondary {
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  outline: none;
  border: none;
  background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
  background-size: 200%;
  font-size: 1.2rem;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  text-transform: uppercase;
  margin: 1rem 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn:hover {
  background-position: right;
}

@media screen and (max-width: 1050px) {
  .container {
    grid-gap: 5rem;
  }
}

@media screen and (max-width: 1000px) {
  form {
    width: 290px;
  }

  .login-content h2 {
    font-size: 2.4rem;
    margin: 8px 0;
  }

  .img img {
    width: 400px;
  }
}

@media screen and (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
  }

  .img {
    display: none;
  }

  .wave {
    display: none;
  }

  .login-content {
    justify-content: center;
  }
}
</style>
