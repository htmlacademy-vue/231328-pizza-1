<template>
  <div id="app">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "./layouts/AppLayout.vue";
import { setAuth } from "@/common/helpers";

export default {
  name: "App",
  created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
    this.$store.dispatch("init");
  },
  components: { AppLayout },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
@import "~@/assets/scss/layout/header";
#app,
.layout__default {
  min-height: 100vh;
}

.layout__default {
  display: flex;
  flex-direction: column;
}
</style>
