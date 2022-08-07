<template>
  <div class="content__result">
    <p>Итого: {{ BuilderIsReady && getPizzaPrice(construct) }} ₽</p>
    <AppButton
      type="button"
      :disabled="!constructIsValid"
      @click="addToCart"
      data-test="button"
    >
      Готовьте!
    </AppButton>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { ADD_ENTITY } from "@/store/mutation-types";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapState("Builder", ["BuilderIsReady", "construct"]),
    ...mapGetters("Builder", ["constructIsValid", "getPizzaPrice"]),
  },
  methods: {
    ...mapMutations([ADD_ENTITY]),
    ...mapActions("Builder", ["resetConstruct"]),

    addToCart() {
      this[ADD_ENTITY]({
        path: "Cart.pizzas",
        value: this.construct,
      });
      this.resetConstruct();
    },
  },
};
</script>

<style></style>
