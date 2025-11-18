<template>
    <div class="product-item" v-for="product in products" :key="product.id">
      <img :src="product.imageUrl" :alt="product.name" />
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ product.price }}</p>
      <RouterLink :to="`/products/${product.id}`">
        <button>View details</button>
      </RouterLink>
    </div>
</template>

<script>
export default {
  name: 'ProductsList',
  props: ['products'],
}
</script>