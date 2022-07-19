<template>
	<header class="bg-at-light-green text-white">
		<Loading class="loading-icon" v-model:active="isLoading" />
		<nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
			<div>
				<router-link class="cursor-pointer flex items-center gap-x-4" :to="{ name: 'Home' }">
					<img class="w-14" src="../assets/images/dumbbell-light.png" alt="" />
					<h1 class="text-lg">My Workout Tracker</h1>
				</router-link>
			</div>
			<ul class="flex flex-1 justify-end gap-x-10">
				<router-link class="cursor-pointer" :to="{ name: 'Home' }">Home</router-link>
				<router-link v-if="user" class="cursor-pointer" :to="{ name: 'Create' }">Create</router-link>
				<router-link v-if="!user" class="cursor-pointer" :to="{ name: 'Login' }">Login</router-link>
				<li @click="logout" v-if="user" class="cursor-pointer">Logout</li>
			</ul>
		</nav>
	</header>
</template>

<script>
import store from "../store/index";
import { ref, computed } from "vue";
import { supabase } from "../supabase/init";
import { useRouter } from "vue-router";
export default {
	setup() {
		// Get user from store
		const user = computed(() => store.state.user);

		// Setup ref to router
		const router = useRouter();

		const isLoading = ref(false);

		// Logout function
		const logout = async () => {
			//needs to be updated
			isLoading.value = true;
			await supabase.auth.signOut();
			router.push({ name: "Login" });
			isLoading.value = false;
		};

		return { logout, user, isLoading };
	},
};
</script>
