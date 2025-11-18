<template>
  <div class="nav-bar">
    <div class="logo-wrap">
      <RouterLink to="/products" class="products-link">
        <img :src="logo" alt="Two Trees Olive Oil Logo" id="main-logo" />
      </RouterLink>
    </div>
    <div v-if="isUserSignedIn" class="user-welcome">Hello {{ userEmail }}!</div>
    <div class="nav-links">
      <div v-if="!isUserSignedIn" class="navbar-right">
        <NavButton to="/sign-in" label="Sign in" />
        <NavButton to="/register" label="Register" />
      </div>
      <div v-if="isUserSignedIn" class="navbar-right">
        <NavButton to="/cart" label="Shopping Cart" />
        <button @click="signOut">Sign out</button>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/logo-hexagon.svg";
import { authStore } from "@/stores/authStore";
import NavButton from "./commonComponents/NavButton.vue";

export default {
  name: "NavBar",
  components: { NavButton },
  data() {
    return {
      logo,
      authStore, // Make authStore reactive in template
    };
  },
  computed: {
    isUserSignedIn() {
      return authStore.isSignedIn;
    },
    userEmail() {
      return authStore.getUserEmail();
    },
  },
  methods: {
    async signOut() {
      await authStore.signOutFromFirebase();
      this.$router.push("/products");
    },
  },
};
</script>
