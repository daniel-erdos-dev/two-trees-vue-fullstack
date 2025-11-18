<template>
  <h1>Registration</h1>
  <div class="user-handler-page">
    <form @submit.prevent="handleRegistration" class="user-handler-form">
      <div class="input-group">
        <input v-model="email" type="text" placeholder="Email" required />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { authStore } from "../stores/authStore.js";
import axios from "axios";

export default {
  name: "RegistrationPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleRegistration() {
      try {
        await authStore.register(this.email, this.password);
        await axios.post("/api/users/", {
          id: authStore.getUserId(),
          email: this.email,
        });
        this.$router.push("/products");
      } catch (error) {
        console.error("Error during registration:", error);
      }
    },
  },
};
</script>
