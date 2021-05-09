<template>
	<form @submit.prevent="onSubmit" class="main">
		<div class="container">
			<div class="form-row">
				<div class="col-md-4 offset-md-4">
					<h1>РЕГИСТРАЦИЯ</h1>
					<div class="return-error">{{reterror}}</div>

					<label>Имя</label>
					<input type="text" v-model.trim="$v.name.$model" class="form-control"
						   :class="{ 'is-invalid': $v.name.$error }"/>
					<div class="invalid-feedback">
						<div v-if="!$v.name.required">имя обязательно</div>
					</div>
					<br/>

					<label>Email</label>
					<input type="text" v-model.trim="$v.email.$model" class="form-control"
						   :class="{ 'is-invalid': $v.email.$error }" v-on:keyup="onKeyUp"/>
					<div class="invalid-feedback">
						<div v-if="!$v.email.required">email обязателен</div>
						<div v-if="!$v.email.email">неверный email</div>
					</div>
					<br/>

					<label>Пароль</label>
					<input type="password" v-model.trim="$v.password.$model" class="form-control"
						   :class="{ 'is-invalid': $v.password.$error }"/>
					<div class="invalid-feedback">
						<div v-if="!$v.password.required">пароль обязателен</div>
						<div v-if="!$v.password.minLength">мин. длина пароля 6 символов</div>
					</div>
					<br/>

					<label>Подтверждение пароля</label>
					<input type="password" v-model.trim="$v.passwordConfirm.$model" class="form-control"
						   :class="{ 'is-invalid': $v.passwordConfirm.$error }"/>
					<div class="invalid-feedback">
						<div v-if="!$v.passwordConfirm.sameAsPassword">пароли не совпадают</div>
					</div>
					<br/>

					<button class="btn btn-primary">СОХРАНИТЬ</button>
					<br/><br/>
					<a href="/">авторизация</a>
				</div>
			</div>

		</div>

	</form>
</template>

<script>
	import {required, email, minLength, sameAs} from "vuelidate/lib/validators";

	export default {
		data() {
			return {
				name: "",
				email: "",
				password: "",
				passwordConfirm: "",
				reterror: "",
				is_admin: null
			}
		},
		validations: {
			name: {
				required
			},
			password: {
				required,
				minLength: minLength(6)
			},
			passwordConfirm: {
				sameAsPassword: sameAs('password')
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

				let data = {
					name: this.name,
					email: this.email,
					password: this.password,
					is_admin: this.is_admin
				}
				this.$store.dispatch('register', data)
					.then(() => this.$router.push('/'))
					.catch(err => this.reterror = err)
			}
		}
	}
</script>
