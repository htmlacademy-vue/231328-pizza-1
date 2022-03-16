<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector :dough="dough" @onChangeDough="setDough" />

        <BuilderSizeSelector :sizes="sizes" @onChangeSizes="setSize" />

        <BuilderIngredientsSelector
          :sauces="sauces"
          :ingredients="ingredients"
          @onChangeSauce="setSauce"
          @onChangeIngredient="setIngredient"
        />

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
              v-model="pizzaConstruct.name"
            />

            <BuilderPizzaView
              :dough="pizzaConstruct.dough.id"
              :sauce="pizzaConstruct.sauce.id"
              :ingredients="pizzaConstruct.ingredients"
              @dropIngredient="setDroppedIngredient"
            />

            <BuilderPriceCounter
              :total="getTotalPrice"
              :isValid="pizzaConstructValidator"
            />
          </label>
        </div>
      </div>
    </form>
    <router-view />
  </main>
</template>

<script>
import miscData from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import userData from "@/static/user.json";

import {
  normalizeDough,
  normalizeSizes,
  normalizeSauces,
  normalizeIngredients,
} from "@/common/helpers.js";

import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  data: () => ({
    miscData,
    userData,
    pizza,
    dough: normalizeDough(pizza.dough),
    sizes: normalizeSizes(pizza.sizes),
    sauces: normalizeSauces(pizza.sauces),
    ingredients: normalizeIngredients(pizza.ingredients),
    pizzaConstruct: {
      name: "",
      dough: {
        id: 2,
        price: 300,
      },
      size: {
        id: 2,
        multiplier: 2,
      },
      sauce: {
        id: 2,
        price: 50,
      },
      ingredients: [],
    },
  }),
  computed: {
    pizzaConstructValidator: function () {
      return this.pizzaConstruct.name &&
        this.pizzaConstruct.dough.id &&
        this.pizzaConstruct.size.id &&
        this.pizzaConstruct.sauce.id &&
        this.pizzaConstruct.ingredients.length
        ? true
        : false;
    },

    getIngredientsPrice() {
      return this.pizzaConstruct.ingredients.reduce((acc, item) => {
        return acc + item.price * item.count;
      }, 0);
    },

    getTotalPrice() {
      return (
        this.pizzaConstruct.size.multiplier *
        (this.pizzaConstruct.dough.price +
          this.pizzaConstruct.sauce.price +
          this.getIngredientsPrice)
      );
    },
  },
  methods: {
    setDough(data) {
      this.pizzaConstruct.dough.id = data.id;
      this.pizzaConstruct.dough.price = data.price;
    },

    setSize(data) {
      this.pizzaConstruct.size.id = data.id;
      this.pizzaConstruct.size.multiplier = data.multiplier;
    },

    setSauce(data) {
      this.pizzaConstruct.sauce.id = data.id;
      this.pizzaConstruct.sauce.price = data.price;
    },

    setIngredient(data) {
      const ingredient = this.getIngredientById(
        this.pizzaConstruct.ingredients,
        data.id
      );

      this.getIngredientById(this.ingredients, data.id).count = data.count;

      if (ingredient) {
        data.count === 0
          ? this.deleteIngredientById(this.pizzaConstruct.ingredients, data.id)
          : "";
        ingredient.count = data.count;
        return;
      }

      this.pizzaConstruct.ingredients.push({
        id: data.id,
        value: data.value,
        price: data.price,
        count: data.count,
      });
    },

    setDroppedIngredient(data) {
      this.setIngredient(data);
      this.getIngredientById(
        this.pizzaConstruct.ingredients,
        data.id
      ).count += 1;
      this.getIngredientById(this.ingredients, data.id).count += 1;
    },

    getIngredientById(array, id) {
      return array.find((item) => item.id == id);
    },

    deleteIngredientById(array, id) {
      array.filter(function (item, index, array) {
        item.id === id ? array.splice(index, 1) : "";
      });
    },

    addToCart(price) {
      this.priceToCart = price;
      console.log("index");
      this.$emit("addToCart", this.priceToCart);
    },
  },
};
</script>

<style></style>
