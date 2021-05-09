import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Login from './components/Login.vue'
import Hello from './components/Hello.vue'
import Register from './components/Register.vue'

Vue.use(Router)

let router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'login',
			component: Login,
			meta: {
				onlyPublic: true
			}
		},
		{
			path: '/register',
			name: 'register',
			component: Register,
			meta: {
				onlyPublic: true
			}
		},
		{
			path: '/hello',
			name: 'hello',
			component: Hello,
			meta: {
				requiresAuth: true
			}
		}
	]
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (store.getters.isLoggedIn) {
			next()
			return
		}
		next('/')
	} else {
		if (to.matched.some(record => record.meta.onlyPublic)) {
			if (!store.getters.isLoggedIn) {
				next()
				return
			}
			next('/hello')
		}
	}

})

export default router