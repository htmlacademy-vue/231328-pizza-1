<template>
  <div class="content__constructor">
    <AppDrop @drop="setDroppedIngredient($event)">
      <!-- BuilderIsReady отслеживаем когда builder-vuex будет собран и нормализован,
      тк используемые здесь геттрер-методы отрабатывают до того как builder-vuex будет готов к работе
      например, value еще не добавлен в хранилище с dought, но геттер-метод уже вызывается и просит value

      TODO: чекнуть более изящное решение, это кажись говно
       -->
      <div class="pizza" :class="BuilderIsReady && pizzaFoundationClass">
        <div class="pizza__wrapper">
          <div
            v-for="item in pizzaConstruct.ingredients"
            :key="item.id"
            class="pizza__filling"
            :class="[
              getClassByIngredient(item.ingredientId),
              getClassByCount(item.quantity),
            ]"
          ></div>
        </div>
      </div>
    </AppDrop>
  </div>
</template>

<script>
import AppDrop from "@/common/components/AppDrop.vue";
import { mapState, mapGetters, mapMutations } from "vuex";
import { SET_INGREDIENT, UPDATE_INGREDIENT } from "@/store/mutation-types";

export default {
  name: "BuilderPizzaView",
  components: {
    AppDrop,
  },
  computed: {
    ...mapState(["pizzaConstruct"]),
    ...mapState("Builder", ["BuilderIsReady"]),
    ...mapGetters("Builder", ["getSauceById", "getIngredientById"]),
    ...mapGetters(["getIngredientQuantityById"]),

    pizzaFoundationClass() {
      let doughClass = this.pizzaConstruct.doughId === 1 ? "small" : "big";
      let sauceClass = this.getSauceById(this.pizzaConstruct.sauceId).value;
      return `pizza--foundation--${doughClass}-${sauceClass}`;
    },
  },
  methods: {
    ...mapMutations([SET_INGREDIENT, UPDATE_INGREDIENT]),

    setDroppedIngredient({ id }) {
      let ingredientQuantity = this.getIngredientQuantityById(id);
      ingredientQuantity
        ? this[UPDATE_INGREDIENT]({
            id: id,
            count: ingredientQuantity + 1,
          })
        : this[SET_INGREDIENT](id);
    },

    getClassByIngredient(id) {
      return `pizza__filling--${this.getIngredientById(id).value}`;
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
