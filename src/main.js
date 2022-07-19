import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import Loading from "vue-loading-overlay";

import "./assets/tailwind.css";
import "./assets/main.css";

createApp(App)
	.use(router)
	.component("Loading", Loading)
	.mount("#app");
