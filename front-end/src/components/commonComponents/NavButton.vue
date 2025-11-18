<template>
  <RouterLink :to="to">
    <button>{{ label }}</button>
  </RouterLink>
</template>

<script>
export default {
  name: "NavButton",
  props: {
    label: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
};
</script>
