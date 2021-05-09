<template>
	<div class="main">
		<div class="container">
			<div class="form-row">
				<div class="col-md-12">
					<h1>Привет, {{username}}!</h1><br/><br/><br/>
					<button @click="logout" class="btn btn-primary">ВЫХОД</button>
					<br/><br/>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				username: localStorage.getItem('username')
			};
		},
		methods: {
			logout: function () {
				this.$store.dispatch('logout')
					.then(() => {
						this.$router.push('/')
					})
			},
		},
	}
</script>
