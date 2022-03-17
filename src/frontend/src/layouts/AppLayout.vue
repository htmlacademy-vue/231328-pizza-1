<template>
  <component :is="layout">
    <AppLayoutHeader />
    <slot />
  </component>
</template>

<script>
import AppLayoutHeader from "./AppLayoutHeader";

const defaultLayout = "AppLayoutDefault";

export default {
  name: "AppLayout",
  components: {
    AppLayoutHeader,
  },
  computed: {
    layout: function () {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>

<style></style>
