<template>
  <h1>Sign-in Page</h1>
  <div class="user-handler-page">
    <form @submit.prevent="handleSignIn" class="user-handler-form">
      <div class="input-group">
        <input v-model="email" type="text" placeholder="Email" required />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script>
import { authStore } from "../stores/authStore.js";

export default {
  name: "SignInPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleSignIn() {
      try {
        await authStore.signIn(this.email, this.password);

        this.$router.push("/products");
      } catch (error) {
        console.error("Error signing in:", error);
      }
    },
  },
};
</script>
