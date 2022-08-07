<template>
  <div id="app">
    <AppLayout>
      <transition name="slide" :appear="isAnimated">
        <router-view />
      </transition>
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
  computed: {
    isAnimated() {
      return this.$route.name !== "Success" && this.$route.name !== "Login";
    },
  },
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

.slide-enter-active {
  transition: all 0.5s ease-out;
}

.slide-enter {
  opacity: 0;
  transform: translateX(50%);
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-enter-to {
  opacity: 1;
}
</style>
