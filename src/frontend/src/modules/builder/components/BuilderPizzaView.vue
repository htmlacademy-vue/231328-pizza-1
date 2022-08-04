<template>
  <div class="content__constructor">
    <AppDrop @drop="setDroppedIngredient($event)">
      <!-- BuilderIsReady отслеживаем когда builder-vuex будет собран и нормализован,
      тк используемые здесь геттрер-методы отрабатывают до того как builder-vuex будет готов к работе,
      например, value еще не добавлен в хранилище с dought, но геттер-метод уже вызывается и просит value

      TODO: чекнуть более изящное решение, это кажись говно
       -->
      <div class="pizza" :class="BuilderIsReady && pizzaFoundationClass">
        <div class="pizza__wrapper">
          <transition-group name="ingredient">
            <div
              v-for="item in construct.ingredients"
              :key="item.id"
              class="pizza__filling"
              :class="[
                getClassByIngredient(item.id),
                getClassByCount(item.quantity),
              ]"
            ></div>
          </transition-group>
        </div>
      </div>
    </AppDrop>
  </div>
</template>

<script>
import AppDrop from "@/common/components/AppDrop.vue";
import { mapState, mapGetters, mapMutations } from "vuex";
import { ADD_ENTITY, UPDATE_ENTITY } from "@/store/mutation-types";

export default {
  name: "BuilderPizzaView",
  components: {
    AppDrop,
  },
  computed: {
    ...mapState("Builder", ["BuilderIsReady", "construct"]),
    ...mapGetters(["getEntityById"]),

    pizzaFoundationClass() {
      let doughClass = this.construct.doughId === 1 ? "small" : "big";
      let sauceClass = this.getEntityById(
        "Builder.builder.sauces#value",
        this.construct.sauceId
      );
      return `pizza--foundation--${doughClass}-${sauceClass}`;
    },
  },
  methods: {
    ...mapMutations([ADD_ENTITY, UPDATE_ENTITY]),

    setDroppedIngredient({ id }) {
      let ingredientQuantity = this.getEntityById(
        "Builder.construct.ingredients#quantity",
        id
      );
      if (ingredientQuantity) {
        this[UPDATE_ENTITY]({
          path: "Builder.construct.ingredients",
          value: {
            id: id,
            quantity: ingredientQuantity + 1,
          },
        });
      } else {
        this[ADD_ENTITY]({
          path: "Builder.construct.ingredients",
          value: {
            id: id,
            quantity: 1,
          },
        });
      }
    },

    getClassByIngredient(id) {
      return `pizza__filling--${this.getEntityById(
        "Builder.builder.ingredients#value",
        id
      )}`;
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

<style>
.ingredient-enter-active {
  transition: all 0.5s;
  transform: scale(1);
}

.ingredient-enter {
  transform: scale(1.4);
}
</style>
