<template>
	<div class="container mt-10 px-4">
		<Loading class="loading-icon" v-model:active="isLoading" />
		<div v-if="!isLoading">
			<!-- No Data -->
			<div v-if="data.length === 0" class="w-full flex flex-col items-center">
				<h1 class="text-2xl">Looks empty here...</h1>
				<router-link class="mt-6 py-2 px-6 rounded-sm text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green" :to="{ name: 'Create' }">Create Workout</router-link>
			</div>
			<!-- Data -->
			<div v-else :class="{ 'page-load': isLoading }" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				<router-link class="flex flex-col items-center bg-light-grey p-8 shadow-md cursor-pointer" v-for="(workout, index) in data" :key="index" :to="{ name: 'ViewWorkout', params: { workoutId: workout.id } }">
					<!-- Cardio image -->
					<img v-if="workout.workout_type === 'cardio'" src="@/assets/images/running-light-green.png" class="h-24 w-auto" alt="" />
					<!-- Strenght image -->
					<img v-else src="@/assets/images/dumbbell-light-green.png" class="h-24 w-auto" alt="" />
					<p class="mt-6 py-1 px-3 text-xs text-white bg-at-light-green shadow-md rounded-lg">
						{{ workout.workout_type }}
					</p>
					<h1 class="mt-8 mb-2 text-center text-xl text-at-light-green">
						{{ workout.workout_name }}
					</h1>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, computed, inject } from "vue";
import { supabase } from "../supabase/init";
export default {
	name: "Home",
	setup() {
		// Create data / vars
		const store = inject("store");
		const data = ref([]);
		const currentUser = computed(() => store.state.user);
		const isLoading = ref(false);

		// Get data
		const getData = async () => {
			isLoading.value = true;
			try {
				const { data: workouts, error } = await supabase
					.from("workouts")
					.select("*")
					.eq("user_id", currentUser.value.id)
					.order("id", { ascending: true });
				if (error) throw error;
				data.value = workouts;
			} catch (error) {
				// implement better error handling
				console.warn(error.message);
			}
			isLoading.value = false;
		};

		// Run data function
		getData();

		return { data, currentUser, isLoading };
	},
};
</script>
