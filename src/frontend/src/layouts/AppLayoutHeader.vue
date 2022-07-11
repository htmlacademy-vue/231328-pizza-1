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
      <template v-if="isAuthenticated">
        <router-link to="profile">
          <picture>
            <source
              type="image/webp"
              :srcset="
                require(`@/assets/img/users/user5.webp`) +
                ' 1x, ' +
                require(`@/assets/img/users/user5@2x.webp`) +
                ' 2x'
              "
            />
            <img
              :src="user.avatar"
              :srcset="require(`@/assets/img/users/user5@2x.jpg`)"
              :alt="user.name"
              width="32"
              height="32"
            />
          </picture>
          <span>{{ user.name }}</span>
        </router-link>
        <!-- Сейчас слушаются только кастомные события компонента.
        Чтобы слушать нативные DOM события добавляем модификатор .native
        https://ru.vuejs.org/v2/guide/migration.html#Listening-for-Native-Events-on-Components-with-v-on-changed
        -->
        <router-link
          v-if="isAuthenticated"
          class="header__logout"
          to="/"
          @click.native="logout()"
        >
          <span>Выйти</span>
        </router-link>
      </template>
      <router-link v-else class="header__login" to="login">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "AppLayoutHeader",
  computed: {
    ...mapState("Auth", ["isAuthenticated", "user"]),
    ...mapGetters("Cart", ["totalPrice"]),
  },
  methods: {
    ...mapActions("Auth", {
      logout: "logout",
    }),
  },
};
</script>

<style></style>
