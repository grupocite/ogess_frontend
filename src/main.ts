import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuth } from '@/stores/auth'

import App from './App.vue'
import router from './router'
import bcrypt from 'bcryptjs'; // Importa la biblioteca de bcrypt que estés utilizando



// ELEMENT PLUS
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import es from 'element-plus/dist/locale/es.mjs'

const app = createApp(App)

app.use(createPinia())
app.use(router)


// ELEMENT PLUS
app.use(ElementPlus, {
    locale: es
})



app.mount('#app')
