import Vue from 'vue'
import Vuex from 'vuex'
//---import axios from 'axios'

Vue.use(Vuex)
const admin_name='Admin';
const admin_email='vsd62@yandex.ru';
const admin_pass='administrator';

// localStorage.removeItem('users');

export default new Vuex.Store({
	state: {
		status: '',
		token: localStorage.getItem('token') || '',
		user : {}
	},
	mutations: {
		auth_request(state){
			state.status = 'loading'
		},
		auth_success(state, token, user){
			state.status = 'success'
			state.token = token
			state.user = user
		},
		auth_error(state){
			state.status = 'error'
		},
		register_request(state){
			state.status = 'loading'
		},
		register_success(state, token, user){
			state.status = 'success'
			state.token = token
			state.user = user
		},
		register_error(state){
			state.status = 'error'
		},

		logout(state){
			state.status = ''
			state.token = ''
		},
	},
	actions: {
		login({commit}, user){
			return new Promise((resolve, reject) => {
				commit('auth_request');
				/*

				Здесь должно быть обращение к серверному скрипту, например, с помощью axios

				*/
				/* -------------------------------------------- */
				/* Эмуляция коммуникации с бэкендом             */
				/* -------------------------------------------- */

				this.users=[];
				this.isOk=false;
				localStorage.setItem('intro', '');
				if(user.email===admin_email && user.password===admin_pass) {
						this.isOk=true;
						localStorage.setItem('username', admin_name);
				}
				else {
					if (localStorage.getItem('users')) {
						try {
							this.users = JSON.parse(localStorage.getItem('users'));
						} catch(e) {
							localStorage.removeItem('users');
						}
					}

					for(var i=0; i<this.users.length; i++) {
						if(user.email===this.users[i].email && user.password===this.users[i].password) {
							this.isOk=true;
							localStorage.setItem('username', this.users[i].name);
							break;
						}
					}
				}
				if(this.isOk) {
					let token = "dsfsd4gs454545gbdgFFAfdsdg";
					localStorage.setItem('token', token);

					commit('auth_success', token, user);
					resolve(true);	
				}
				else {
					this.err='такой пользователь отсутствует';
					commit('auth_error', this.err)
					localStorage.removeItem('token')
					localStorage.removeItem('username');
					reject(this.err)	                
				}
			})

		},
		register({commit}, user) {
			localStorage.setItem('intro', '');
			return new Promise((resolve, reject) => {
				commit('register_request');
				/*

				Здесь должно быть обращение к серверному скрипту, например, с помощью axios

				*/
				/* -------------------------------------------- */
				/* Эмуляция коммуникации с бэкендом             */
				/* -------------------------------------------- */

				this.users=[];
				this.isOk=true;

				if(user.email===admin_email) {
						this.isOk=false;
				}
				else {
					if (localStorage.getItem('users')) {
						try {
							this.users = JSON.parse(localStorage.getItem('users'));
						} catch(e) {
							localStorage.removeItem('users');
						}
					}

					for(var i=0; i<this.users.length; i++) {
						if(user.email===this.users[i].email) {
							this.isOk=false;
							break;
						}
					}
				}

				if(this.isOk) {			
					this.users.push(user);
					const parsed = JSON.stringify(this.users);
					localStorage.setItem('users', parsed);
					localStorage.setItem('intro', '1');
					let token = "";
					localStorage.removeItem('token');
					commit('register_success', token, user);
					resolve(true);	
				}

				else {
					this.err='Такой email уже есть!';
					commit('register_error', this.err);
					reject(this.err);	                
				}


			})
		},
		logout({commit}){
			return new Promise((resolve) => {
				commit('logout');
				localStorage.removeItem('token');
				localStorage.removeItem('username');
				resolve();
			})

		},
	},
	getters : {
		isLoggedIn: state => !!state.token,
		authStatus: state => state.status,
	}
})
