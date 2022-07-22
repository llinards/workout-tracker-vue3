<template>
	<div class="max-w-screen-sm mx-auto px-4 py-10">
		<Loading class="loading-icon" v-model:active="isLoading" />
		<!-- error handling -->
		<div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
			<p class="text-red-500">{{ errorMsg }}</p>
		</div>
		<!-- login form -->
		<div v-if="!isLoading">
			<form @submit.prevent="login" class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">
				<h1 class="text-3xl text-at-light-green mb-4">Login</h1>
				<div class="flex flex-col mb-2">
					<label for="email" class="mb-1 text-sm text-at-light-green">E-mail</label>
					<input type="email" v-model="email" name="" id="email" class="p-2 text-grey-500 focus:outline-none" />
				</div>
				<div class="flex flex-col mb-2">
					<label for="password" class="mb-1 text-sm text-at-light-green">Password</label>
					<input type="password" v-model="password" name="" id="password" class="p-2 text-grey-500 focus:outline-none" />
				</div>
				<button type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green">Login</button>
				<router-link class="text-sm mt-6 text-center" :to="{ name: 'Register' }">Don't have an account? <span class="text-at-light-green">Register</span></router-link>
			</form>
		</div>
	</div>
</template>

<script>
import { ref, inject } from "vue";
import { supabase } from "../supabase/init";
import { useRouter } from "vue-router";

export default {
	name: "login",
	setup() {
		// Create data / vars
		const router = useRouter();
		const email = ref(null);
		const password = ref(null);
		const errorMsg = ref(null);
		const store = inject("store");
		const isLoading = ref(false);

		// Login function

		const login = async () => {
			isLoading.value = true;
			try {
				const { error } = await supabase.auth.signIn({
					email: email.value,
					password: password.value,
				});
				if (error) throw error;
				router.push({ name: "Home" });
			} catch (error) {
				errorMsg.value = `Error: ${error.message}`;
				setTimeout(() => {
					errorMsg.value = null;
				}, 5000);
			}
			isLoading.value = false;
		};

		if (store.state.user) {
			router.push({ name: "Home" });
		}

		return { email, password, errorMsg, login, store, isLoading };
	},
};
</script>
