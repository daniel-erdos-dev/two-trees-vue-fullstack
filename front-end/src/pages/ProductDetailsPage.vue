<template>
  <LoadingComponent v-if="isLoading" />
  <ProductDetails v-else-if="product" :product="product" />
  <NotFoundPage v-else />
</template>

<script>
import NotFoundPage from "@/pages/NotFoundPage.vue";
import LoadingComponent from "@/components/commonComponents/LoadingComponent.vue";
import ProductDetails from "@/components/ProductDetails.vue";
import axios from "axios";

export default {
  name: "ProductDetailsPage",
  components: {
    NotFoundPage,
    LoadingComponent,
    ProductDetails,
  },
  data() {
    return {
      product: null,
      isLoading: true,
    };
  },
  async created() {
    try {
      const productId = this.$route.params.id;
      const response = await axios.get(`/api/products/${productId}`);
      this.product = response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      this.isLoading = false;
    }
  },
};
</script>
