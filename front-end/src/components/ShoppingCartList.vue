<template>
  <div
    v-for="cartItem in cartItems"
    :key="cartItem.cartItemId"
    class="product-container"
  >
    <img :src="cartItem.imageUrl" :alt="cartItem.name" class="product-image" />
    <div class="details-wrap">
      <h3>{{ cartItem.name }}</h3>
      <p>{{ cartItem.price }}</p>
    </div>
    <button class="remove-button" @click="removeFromCart(cartItem.cartItemId)">
      Remove from Cart
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ShoppingCartList",
  props: ["cartItems", "userId"],
  methods: {
    async removeFromCart(cartItemId) {
      try {
        await axios.delete(`/api/users/${this.userId}/cart/${cartItemId}`);
        this.$emit("item-removed", cartItemId);
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    },
  },
};
</script>
