<template>
  <div class="img-wrap">
    <img :src="product.imageUrl" :alt="product.name" />
  </div>
  <div class="product-details">
    <h1>{{ product.name }}</h1>
    <h3 class="price">{{ product.price }}</h3>
  </div>
  <NavButton
    to="/sign-in"
    label="Sign in"
    v-if="!isSignedIn"
    class="add-to-cart"
  />
  <AddToCartButtons v-else :product="product" />
</template>

<script>
import AddToCartButtons from "./AddToCartButtons.vue";
import NavButton from "./commonComponents/NavButton.vue";
import { authStore } from "../stores/authStore.js";

export default {
  name: "ProductDetails",
  components: {
    AddToCartButtons,
    NavButton,
  },
  props: ["product"],
  computed: {
    isSignedIn() {
      return authStore.isSignedIn;
    },
  },
};
</script>
