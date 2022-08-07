<template>
  <div class="popup">
    <span class="close" @click="confirm()">
      <span class="visually-hidden">Закрыть попап</span>
    </span>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a class="button" @click="confirm()">Отлично, я жду!</a>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { mapState } from "vuex";
export default {
  name: "Success",
  computed: {
    ...mapState("Auth", ["isAuthenticated"]),
  },
  methods: {
    confirm() {
      this.isAuthenticated ? router.push("/orders") : router.push("/");
    },
  },
};
</script>

<style></style>
