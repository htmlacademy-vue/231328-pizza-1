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
      <router-link to="cart">{{ totalPrice }} ₽</router-link>
    </div>
    <div class="header__user">
      <router-link class="header__login" to="login">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AppLayoutHeader",
  computed: {
    ...mapGetters("Cart", ["totalPrice"]),
  },
};
</script>

<style></style>
