<template>
  <NavBar :isUserSignedIn="isUserSignedIn" />
  <div class="page-wrap">
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
  data() {
    return {
      isUserSignedIn: false,
    };
  },
};
</script>
