<template>
  <div class="content__constructor">
    <AppDrop @drop="onDrop">
      <div class="pizza" :class="pizzaFoundationClass">
        <div class="pizza__wrapper">
          <div
            v-for="item in ingredients"
            :key="item.ingredientId + 1"
            class="pizza__filling"
            :class="[
              getClassByIngredient(item.name),
              getClassByQuantity(item.quantity),
            ]"
          ></div>
        </div>
      </div>
    </AppDrop>
  </div>
</template>

<script>
import AppDrop from "@/common/components/AppDrop.vue";
// import EventBus from "@/common/EventBus";

export default {
  name: "BuilderPizzaView",
  components: {
    AppDrop,
  },
  props: {
    dough: {
      type: String,
      required: true,
    },
    sauce: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },
  computed: {
    pizzaFoundationClass() {
      return `pizza--foundation--${this.dough == "Тонкое" ? "small" : "big"}-${
        this.sauce == "Томатный" ? "tomato" : "creamy"
      }`;
    },
  },
  methods: {
    getClassByIngredient(name) {
      return `pizza__filling--${name}`;
    },

    getClassByQuantity(quantity) {
      let quantityClass = "";

      if (quantity == 2) {
        quantityClass = "pizza__filling--second";
      } else if (quantity == 3) {
        quantityClass = "pizza__filling--third";
      }

      return quantityClass;
    },

    onDrop(data) {
      this.$emit("dropIngredientParams", data);
    },
  },
};
</script>

<style></style>
