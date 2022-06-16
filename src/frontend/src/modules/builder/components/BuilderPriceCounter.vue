<template>
  <div class="content__result">
    <!-- Смотри BuilderPizzaView.vue зачем нужен BuilderIsReady -->
    <p>Итого: {{ BuilderIsReady && getPizzaPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="!constructIsValid"
      @click="addToCart"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import {
  ADD_TO_CART,
  SET_PRICE,
  RESET_CONSTRUCT,
} from "@/store/mutation-types";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapState(["pizzaConstruct"]),
    ...mapState("Builder", ["BuilderIsReady"]),
    ...mapGetters(["constructIsValid", "getPizzaPrice"]),
  },
  methods: {
    ...mapMutations("Cart", [ADD_TO_CART]),
    ...mapMutations([SET_PRICE, RESET_CONSTRUCT]),

    addToCart() {
      this[SET_PRICE](this.getPizzaPrice);
      this[ADD_TO_CART](this.pizzaConstruct);
      this[RESET_CONSTRUCT]();
    },
  },
};
</script>

<style></style>
