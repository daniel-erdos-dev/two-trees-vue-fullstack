import { createApp } from "vue";
import App from "./App.vue";
import "./main.css";
import * as VueRouter from "vue-router";
import ShoppingCartPage from "./pages/ShoppingCartPage.vue";
import ProductsPage from "./pages/ProductsPage.vue";
import ProductDetailsPage from "./pages/ProductDetailsPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";
import SignInPage from "./pages/SignInPage.vue";
import RegistrationPage from "./pages/RegistrationPage.vue";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDWiG6vMr6I6qDI1JseJ92KzV32MvBEZx4",
  authDomain: "fullstackvue-62a4a.firebaseapp.com",
  projectId: "fullstackvue-62a4a",
  storageBucket: "fullstackvue-62a4a.firebasestorage.app",
  messagingSenderId: "56653411058",
  appId: "1:56653411058:web:9b4a614e810e1a64dd566b",
  measurementId: "G-LMNVF6NP49",
};

initializeApp(firebaseConfig);

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory("/"),
  routes: [
    { path: "/", redirect: "/products" },
    { path: "/cart", component: ShoppingCartPage },
    { path: "/products", component: ProductsPage },
    { path: "/products/:id", component: ProductDetailsPage },
    { path: "/sign-in", component: SignInPage },
    { path: "/register", component: RegistrationPage },
    { path: "/:pathMatch(.*)*", component: NotFoundPage },
  ],
});

createApp(App).use(router).mount("#app");
