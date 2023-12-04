import { defineStore } from 'pinia';
import axios from 'axios';
import { ElMessage } from 'element-plus';

export const useAuth = defineStore({
	id: 'auth',
	state: () => ({
		token: localStorage.getItem('token') ?? null,
		user: JSON.parse(localStorage.getItem('user') ?? 'null'),
		refreshTokenInterval: 0
	}),
	getters: {
		isAuthenticated: (state) => !!state.token,
	},
	actions: {
		headers(){
			return {
				headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token }
			}
		},
		headersMultipart(){
			return {
				headers: { 'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + this.token }
			}
		},
		refreshToken() {
			axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, null, this.headers())
				.then((response) => {
					const newToken = response.data.access_token;
					localStorage.setItem('token', newToken);
					this.token = newToken;
				})
				.catch((error) =>{
				console.error('Error al actualizar el token:', error);
			});
		},
		startRefreshTokenTimer() {
			// Cancela el temporizador existente si existe
			if (this.refreshTokenInterval !== 0) {
				clearInterval(this.refreshTokenInterval);
			}

			const horas = 5;
            const segundosEnUnaHora = 3600; // 1 hora = 3600 segundos
            const duracionEnSegundos = horas * segundosEnUnaHora;
            const duracionEnMilisegundos = duracionEnSegundos * 1000;
	  
            const expiresInMs = duracionEnMilisegundos;
			this.refreshTokenInterval = setInterval(this.refreshToken, expiresInMs);
		},
		async login(email: string, password: string) {
			const formData = {email: email,password: password};
			try {
				const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, formData);
				const token = response.data.access_token;
				const user = response.data.user;
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(user));
				this.$patch({ token, user });
				this.startRefreshTokenTimer();
				location.href = '/';

			} catch (error: any) {
				if (error.response && error.response.status === 422) {
					ElMessage.warning(error.response.data.message);
				}else if (error.response && error.response.status === 400) {
					ElMessage.warning(error.response.data.message);
				}
			}
		},
		logout() {
			axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, null, this.headers())
				.then((res) => {
					if(res.status){
						this.token = null;
						this.user = null;
						localStorage.removeItem('token');
						localStorage.removeItem('user');
					}
				})
				.catch((error) =>{
				console.error('Ocurrio un error al cerra sesion:', error);
			});
		},
		initialize() {
			const token = localStorage.getItem('token');
			const user = localStorage.getItem('user');
			
			if (token && user) {
				this.token = token;
				this.user = JSON.parse(user);
			}
			if (this.isAuthenticated) {
				this.startRefreshTokenTimer();
			}
		},
	},
});