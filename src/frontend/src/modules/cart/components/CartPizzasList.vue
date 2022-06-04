<template>
  <ul class="cart-list sheet">
    <li class="cart-list__item" v-for="(pizza, index) of pizzas" :key="index">
      <div class="product cart-list__product">
        <img
          src="@/assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          :alt="pizza.name"
        />
        <div class="product__text">
          <h2>{{ pizza.name }}</h2>
          <ul>
            <li>
              {{ getSizeById(pizza.sizeId).name }},
              {{ getDoughDescription(pizza.doughId) }}
            </li>
            <li>Соус: {{ getSauceById(pizza.sauceId).name }}</li>
            <li>Начинка: {{ getIngredientsList(pizza.ingredients) }}</li>
          </ul>
        </div>
      </div>

      <ItemCounter
        :name="pizza.name"
        :count="pizza.quantity"
        :min="0"
        :max="99"
        class="cart-list__counter"
        @update:count="[updateQuantity(index, $event), checkPizzasQuantity()]"
      />

      <div class="cart-list__price">
        <b>{{ pizza.price * pizza.quantity }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          type="button"
          class="cart-list__edit"
          @click="changePizza(index)"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import {
  REMOVE_FROM_CART,
  UPDATE_PIZZA_QUATITY,
  CHANGE_PIZZA,
} from "@/store/mutation-types";

export default {
  name: "CartPizzasList",
  components: {
    ItemCounter,
  },
  computed: {
    ...mapState("Cart", ["pizzas"]),
    ...mapGetters("Builder", [
      "getDoughById",
      "getSizeById",
      "getSauceById",
      "getIngredientById",
    ]),
    ...mapGetters("Cart", ["isEmpty"]),
  },
  methods: {
    ...mapMutations("Cart", [UPDATE_PIZZA_QUATITY, REMOVE_FROM_CART]),
    ...mapMutations([CHANGE_PIZZA]),

    ...mapActions("Cart", {
      resetCart: "resetCart",
    }),

    getDoughDescription(id) {
      return this.getDoughById(id).name == "Тонкое"
        ? "на тонком тесте"
        : "на толстом тесте";
    },
    getIngredientsList(ingredients) {
      return ingredients
        .map((item) => this.getIngredientById(item.ingredientId).name)
        .join(", ");
    },
    updateQuantity(index, count) {
      count > 0
        ? this[UPDATE_PIZZA_QUATITY]({ index, count })
        : this[REMOVE_FROM_CART]({ index });
    },
    changePizza(index) {
      this.$router.push({ name: "Index" });
      this[CHANGE_PIZZA](index);
      this[REMOVE_FROM_CART](index);
    },
    checkPizzasQuantity() {
      // Если пицц нет вызываем action
      !this.isEmpty ? this.resetCart() : "";
    },
  },
};
</script>

<style></style>
