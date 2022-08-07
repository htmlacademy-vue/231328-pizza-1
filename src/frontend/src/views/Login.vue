<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent="login">
      <div class="sign-form__input">
        <AppInput
          title="E-mail"
          name="email"
          type="email"
          placeholder="example@mail.ru"
          v-model="email"
          autofocus
          required
        />
      </div>

      <div class="sign-form__input">
        <AppInput
          title="Пароль"
          name="pass"
          type="password"
          placeholder="***********"
          v-model="password"
          :required="true"
        />
      </div>
      <AppButton type="submit">Авторизоваться</AppButton>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    async login() {
      await this.$store.dispatch("Auth/login", {
        email: this.email,
        password: this.password,
      });
      // Чтобы появились адреса
      await this.$store.dispatch("Profile/query");
      await this.$store.dispatch("Cart/query");
      // После успешной авторизации отправляем пользователя на главную страницу.
      await this.$router.push("/");
    },
  },
};
</script>

<style></style>
