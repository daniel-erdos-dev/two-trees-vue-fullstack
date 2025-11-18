<template>
  <div v-if="itemInCart === 0" class="add-to-cart">
    <button :disabled="isAddingInProgress" @click="addToCart">
      Add to cart
    </button>
  </div>
  <div v-else class="add-to-cart-multiple">
    <button :disabled="isRemovingInProgress" @click="removeFromCart">-</button>
    <input
      id="itemCounter"
      type="number"
      min="1"
      :value="itemInCart"
      readonly
    />
    <button :disabled="isAddingInProgress" @click="addToCart">+</button>
  </div>
</template>

<script>
import axios from "axios";
import { authStore } from "../stores/authStore";

export default {
  name: "AddToCartButtons",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isAddingInProgress: false,
      isRemovingInProgress: false,
      cart: [],
      itemInCart: 0,
    };
  },
  computed: {
    userId() {
      return authStore.getUserId();
    },
  },
  methods: {
    async addToCart() {
      this.isAddingInProgress = true;
      try {
        const response = await axios.post(`/api/users/${this.userId}/cart`, {
          productId: this.product.id,
        });

        // Add the new item to local cart data
        const newCartItem = {
          cartItemId: response.data.cartItemId,
          id: this.product.id,
          ...this.product,
        };
        this.cart.push(newCartItem);

        this.itemInCart += 1;
        this.isAddingInProgress = false;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          await axios.post("/api/users", {
            id: this.userId,
            email: authStore.getUserEmail(),
          });

          const response = await axios.post(`/api/users/${this.userId}/cart`, {
            productId: this.product.id,
          });

          // Add the new item to local cart data
          const newCartItem = {
            cartItemId: response.data.cartItemId,
            id: this.product.id,
            ...this.product,
          };
          this.cart.push(newCartItem);

          this.itemInCart += 1;
          this.isAddingInProgress = false;
        } else {
          console.error("Error adding item to cart:", error);
          this.isAddingInProgress = false;
        }
      }
    },
    async removeFromCart() {
      this.isRemovingInProgress = true;
      try {
        this.currentItemInCart = this.cart.findLast(
          (item) => item.id === this.product.id
        );

        if (!this.currentItemInCart) {
          console.warn("No item found to remove");
          this.isRemovingInProgress = false;
          return;
        }

        await axios.delete(
          `/api/users/${this.userId}/cart/${this.currentItemInCart.cartItemId}`
        );

        // Update local cart data by removing the deleted item
        this.cart = this.cart.filter(
          (item) => item.cartItemId !== this.currentItemInCart.cartItemId
        );

        this.itemInCart -= 1;
        this.isRemovingInProgress = false;
      } catch (error) {
        console.error("Error removing item from cart:", error);
        this.isRemovingInProgress = false;
      }
    },
  },
  async created() {
    try {
      const cartResponse = await axios.get(`/api/users/${this.userId}/cart`);
      this.cart = cartResponse.data;
      this.itemInCart = this.cart.filter(
        (item) => item.id === this.product.id
      ).length;
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  },
};
</script>
