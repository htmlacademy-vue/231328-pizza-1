<template>
  <div class="layout__default">
    <slot />
  </div>
</template>

<script>
export default {
  name: "AppLayoutDefault",
  props: {
    price: {
      type: Number,
      required: false,
    },
  },
};
</script>

<style></style>
