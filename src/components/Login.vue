<template>
	<form @submit.prevent="onSubmit" class="main">
		<div class="container">
			<div v-html='intro'>АВТОРИЗАЦИЯ</div>
			<div class="form-row">
				<div class="col-md-4 offset-md-4">

					<div class="return-error">{{reterror}}</div>
					<input placeholder="Введите свой email" type="text" v-model.trim="$v.email.$model" class="form-control" :class="{ 'is-invalid': $v.email.$error }" v-on:keyup="onKeyUp"/>
					<div class="invalid-feedback">
						<div v-if="!$v.email.required">email обязателен</div>
						<div v-if="!$v.email.email">неверный email</div>
					</div>
					<br/>

					<input placeholder="Введите пароль" type="password" v-model.trim="$v.password.$model" class="form-control" :class="{ 'is-invalid': $v.password.$error }" v-on:keyup="onKeyUp"/>
					<div class="invalid-feedback">
						<div v-if="!$v.password.required">пароль обязателен</div>
						<div v-if="!$v.password.minLength">мин. длина пароля 6 символов</div>
					</div>
					<br/>
					<button class="btn btn-primary mr-1">ВОЙТИ</button>
					<br/><br/>
					<a href="/register">регистрация</a>
				</div>
			</div>

		</div>

	</form>
</template>

<script>
	import {required, email, minLength} from "vuelidate/lib/validators";

	export default {
		data() {
			return {
				email: "",
				password: "",
				reterror: "",
			};
		},
		computed: {
			intro: function () {
				if (localStorage.getItem('intro') == '') {
					return '<h1>АВТОРИЗАЦИЯ</h1>';
				} else {
					localStorage.setItem('intro', '');
					return '<h2 class="green">РЕГИСТРАЦИЯ ПРОШЛА УСПЕШНО</h2><h4>Введите свои данные</h4>'
				}
			}
		},
		validations: {
			password: {
				required,
				minLength: minLength(6)
			},
			email: {required, email}
		},
		methods: {
			onKeyUp() {
				this.reterror = ''
			},
			async onSubmit() {
				this.$v.$touch();
				if (this.$v.$invalid) return;

				let email = this.email;
				let password = this.password;
				this.$store.dispatch('login', {email, password})
					.then(() => this.$router.push('/hello'))
					.catch(err => this.reterror = err)
			}
		},
		mounted() {
			localStorage.setItem('intro', '');
		}

	}
</script>