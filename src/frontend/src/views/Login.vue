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
          ref="email"
          title="E-mail"
          name="email"
          type="email"
          placeholder="example@mail.ru"
          v-model="email"
          :required="true"
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
  mounted() {
    // при входе на страницу ставим фокус на email-инпуте
    // требуется указать элементу ref="email"
    // Обращаемся к ref компонеты, а после к ref <ipnut>'a внутри уже самой компоненты
    this.$refs.email.$refs.input.focus();
  },
  methods: {
    async login() {
      // Если есть невалидное поле - не отправлять запрос на сервер.
      // Также в миксине мы присваиваем текст ошибки
      // if (
      //   !this.$validateFields(
      //     { email: this.email, password: this.password },
      //     this.validations
      //   )
      // ) {
      //   return;
      // }
      // Если поля валидны - отправляем запрос на сервер.
      await this.$store.dispatch("Auth/login", {
        email: this.email,
        password: this.password,
      });
      // После успешной авторизации отправляем пользователя на главную страницу.
      await this.$router.push("/");
    },
  },
};
</script>

<style></style>
