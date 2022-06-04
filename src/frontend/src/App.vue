<template>
  <div id="app">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "./layouts/AppLayout.vue";
export default {
  name: "App",
  created() {
    this.$store.dispatch("init");
  },
  components: { AppLayout },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
#app,
.layout__default {
  min-height: 100vh;
}

.layout__default {
  display: flex;
  flex-direction: column;
}
</style>
