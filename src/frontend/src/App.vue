<template>
  <div id="app">
    <Index />
  </div>
</template>

<script>
import Index from "./views/Index.vue";
export default {
  components: { Index },
  name: "App",
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
