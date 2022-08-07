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
          <h2 data-test="pizza-name">{{ pizza.name }}</h2>
          <ul>
            <li data-test="pizza-size-dough">
              {{ getEntityById("Builder.builder.sizes#name", pizza.sizeId) }},
              {{
                getEntityById(
                  "Builder.builder.dough#connotation",
                  pizza.doughId
                )
              }}
            </li>
            <li data-test="pizza-sauce">
              Соус:
              {{ getEntityById("Builder.builder.sauces#name", pizza.sauceId) }}
            </li>
            <li data-test="pizza-ingredients">
              Начинка: {{ getIngredientsList(pizza.ingredients) }}
            </li>
          </ul>
        </div>
      </div>

      <ItemCounter
        :name="pizza.name"
        :count="pizza.quantity"
        :min="0"
        :max="99"
        class="cart-list__counter"
        @update:count="updateQuantity(pizza, $event)"
      />

      <div class="cart-list__price">
        <b>{{ getPizzaPrice(pizza) * pizza.quantity }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          type="button"
          class="cart-list__edit"
          @click="changePizza(pizza)"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import { mapState, mapGetters, mapMutations } from "vuex";
import {
  SET_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutation-types";

export default {
  name: "CartPizzasList",
  components: {
    ItemCounter,
  },
  computed: {
    ...mapState("Cart", ["pizzas"]),
    ...mapGetters(["getEntityById"]),
    ...mapGetters("Builder", ["getPizzaPrice"]),
    ...mapGetters("Cart", ["getIngredientsList"]),
  },
  methods: {
    ...mapMutations([SET_ENTITY, UPDATE_ENTITY, DELETE_ENTITY]),

    updateQuantity(pizza, quantity) {
      if (quantity > 0) {
        this[UPDATE_ENTITY]({
          path: "Cart.pizzas",
          value: { ...pizza, quantity },
        });
      } else {
        this[DELETE_ENTITY]({
          path: "Cart.pizzas",
          id: pizza.id,
        });
      }
    },

    changePizza(pizza) {
      // 1. Делаем переход на страницу настройки пиццы
      this.$router.push({ name: "Index" });
      // 2. Мутируем конструктор
      this[SET_ENTITY]({
        path: "Builder.construct",
        value: pizza,
      });
      // 3. Удаляем из корзины
      this[DELETE_ENTITY]({
        path: "Cart.pizzas",
        id: pizza.id,
      });
    },
  },
};
</script>

<style></style>
