<template>
  <h1>Products</h1>
  <div class="grid-wrap">
    <ProductsList :products="products" />
  </div>
</template>

<script>
import ProductsList from '@/components/ProductsList.vue';
import axios from 'axios';

export default {
  name: 'ProductsPage',
  components: {
    ProductsList,
  },
  data() {
    return {
      products: [],
    };
  },
  async created() {
    try {
      const response = await axios.get('/api/products');
      this.products = response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
}
</script>