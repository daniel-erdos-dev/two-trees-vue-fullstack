<template>
  <h1>Shopping Cart</h1>
  <div v-if="cartItems.length === 0">
    <p>Your cart is empty.</p>
  </div>
  <div v-else id="shopping-cart-container">
    <ShoppingCartList
      :cartItems="cartItems"
      :userId="userId"
      @item-removed="onItemRemoved"
    />
    <button class="checkout-button">Proceed to Checkout</button>
  </div>
</template>

<script>
import ShoppingCartList from "@/components/ShoppingCartList.vue";
import axios from "axios";
import { authStore } from "@/stores/authStore.js";

export default {
  name: "ShoppingCartPage",
  components: {
    ShoppingCartList,
  },
  data() {
    return {
      cartItems: [],
    };
  },
  computed: {
    userId() {
      return authStore.getUserId();
    },
  },
  methods: {
    onItemRemoved(cartItemId) {
      const itemIndex = this.cartItems.findIndex(
        (item) => item.cartItemId === cartItemId
      );
      if (itemIndex !== -1) {
        const newCartItems = [...this.cartItems];
        newCartItems.splice(itemIndex, 1);
        this.cartItems = newCartItems;
      }
    },
  },
  async created() {
    try {
      const response = await axios.get(`/api/users/${this.userId}/cart`);
      this.cartItems = response.data;
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  },
};
</script>
