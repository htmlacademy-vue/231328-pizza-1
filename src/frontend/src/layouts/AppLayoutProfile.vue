<template>
  <div class="layout__profile">
    <slot />
    <AppLayoutSidebar />
  </div>
</template>

<script>
import AppLayoutSidebar from "./AppLayoutSidebar";

export default {
  name: "AppLayoutDefault",
  components: {
    AppLayoutSidebar,
  },
};
</script>

<style></style>
