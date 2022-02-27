<template>
  <div class="content__constructor">
    <AppDrop @drop="$emit('dropIngredient', $event)">
      <div class="pizza" :class="pizzaFoundationClass">
        <div class="pizza__wrapper">
          <div
            v-for="item in ingredients"
            :key="item.id"
            class="pizza__filling"
            :class="[
              getClassByIngredient(item.value),
              getClassByCount(item.count),
            ]"
          ></div>
        </div>
      </div>
    </AppDrop>
  </div>
</template>

<script>
import AppDrop from "@/common/components/AppDrop.vue";

export default {
  name: "BuilderPizzaView",
  components: {
    AppDrop,
  },
  props: {
    dough: {
      type: Number,
      required: true,
    },
    sauce: {
      type: Number,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },
  computed: {
    pizzaFoundationClass() {
      return `pizza--foundation--${this.dough == 1 ? "small" : "big"}-${
        this.sauce == 1 ? "tomato" : "creamy"
      }`;
    },
  },
  methods: {
    getClassByIngredient(value) {
      return `pizza__filling--${value}`;
    },

    getClassByCount(count) {
      let countClass = "";
      if (count === 2) {
        countClass = "pizza__filling--second";
      } else if (count === 3) {
        countClass = "pizza__filling--third";
      }
      return countClass;
    },
  },
};
</script>

<style></style>
