<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="cart">{{ cartPrice }} ₽</router-link>
    </div>
    <div class="header__user">
      <router-link class="header__login" to="login">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import EventBus from "@/common/eventBus";

export default {
  name: "AppLayoutHeader",
  data: () => ({
    cartPrice: null,
  }),
  mounted() {
    EventBus.$on("emitFromChild", (data) => {
      this.cartPrice += data;
    });
  },
};
</script>

<style></style>
