<template>
  <div class="content__result">
    <!-- Смотри BuilderPizzaView.vue зачем нужен BuilderIsReady -->
    <p>Итого: {{ BuilderIsReady && getPizzaPrice(construct) }} ₽</p>
    <AppButton type="button" :disabled="!constructIsValid" @click="addToCart">
      Готовьте!
    </AppButton>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { SET_ENTITY, ADD_ENTITY } from "@/store/mutation-types";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapState("Builder", ["BuilderIsReady", "construct"]),
    ...mapGetters("Builder", ["constructIsValid", "getPizzaPrice"]),
  },
  methods: {
    ...mapMutations([SET_ENTITY, ADD_ENTITY]),
    ...mapActions("Builder", ["resetConstruct", "addToCart"]),

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
