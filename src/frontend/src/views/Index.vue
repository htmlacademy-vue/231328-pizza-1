<template>
  <div class="page page--index">
    <AppLayout :price="priceToCart" />
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector :doughs="doughs" @getDoughParams="setDough" />

          <BuilderSizeSelector :data="sizes" @getSizeParams="setSize" />

          <BuilderIngredientsSelector
            :ingredients="ingredients"
            :sauces="sauces"
            @getSauceParams="setSauce"
            @getIngredientParams="setIngredient"
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
                :dough="pizzaConstruct.dough.title"
                :sauce="pizzaConstruct.sauce.title"
                :ingredients="pizzaConstruct.ingredients"
                @dropIngredientParams="dropIngredient"
              />

              <BuilderPriceCounter
                :total="getTotalPrice"
                :isValid="pizzaConstructValidator"
                @addToCart="addToCart"
              />
            </label>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import miscData from "@/static/misc.json";
import pizzaData from "@/static/pizza.json";
import pizza from "@/static/pizza.json";
import userData from "@/static/user.json";

import {
  normalizeData,
  sizes,
  doughs,
  sauces,
  normalizeIngredients,
} from "@/common/helpers.js";

import AppLayout from "@/layouts/AppLayout";

import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "Index",
  components: {
    AppLayout,
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  data: () => ({
    miscData,
    pizzaData,
    userData,
    pizza,
    pizzaConstruct: {
      isValid: false,
      name: "",
      dough: {
        id: "",
        title: "",
        price: 0,
      },
      size: {
        id: "",
        title: "",
        quantity: 0,
      },
      sauce: {
        id: "",
        title: "",
        price: 0,
      },
      ingredients: [],
    },
    priceToCart: 0,
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

    doughs: function () {
      return normalizeData(this.pizza.dough, doughs);
    },

    sizes: function () {
      return normalizeData(this.pizza.sizes, sizes);
    },

    sauces: function () {
      return normalizeData(this.pizza.sauces, sauces);
    },

    ingredients: function () {
      return normalizeIngredients(this.pizza.ingredients);
    },

    getIngredientsPrice() {
      return this.pizzaConstruct.ingredients.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
    },

    getTotalPrice() {
      return (
        this.pizzaConstruct.size.quantity *
        (this.pizzaConstruct.dough.price +
          this.pizzaConstruct.sauce.price +
          this.getIngredientsPrice)
      );
    },
  },
  methods: {
    setDough(params) {
      this.pizzaConstruct.dough.id = params.id;
      this.pizzaConstruct.dough.title = params.title;
      this.pizzaConstruct.dough.price = params.value;
    },

    setSize(params) {
      this.pizzaConstruct.size.id = params.id;
      this.pizzaConstruct.size.title = params.title;
      this.pizzaConstruct.size.quantity = params.value;
    },

    setSauce(params) {
      this.pizzaConstruct.sauce.id = params.id;
      this.pizzaConstruct.sauce.title = params.title;
      this.pizzaConstruct.sauce.price = params.value;
    },

    setIngredient(params) {
      const ingredient = this.getIngredientById(params.id);

      this.draggableIngredient(params);

      if (ingredient) {
        params.quantity === 0 ? this.deleteIngredientById(params.id) : "";
        ingredient.quantity = params.quantity;
        ingredient.price = params.price;
        return;
      }

      this.pizzaConstruct.ingredients.push({
        ingredientId: params.id,
        name: params.name,
        quantity: 1,
        price: params.price,
      });
    },

    deleteIngredientById(id) {
      this.pizzaConstruct.ingredients.find(function (item, index, array) {
        item.ingredientId === id ? array.splice(index, 1) : "";
      });
    },

    getIngredientById(id) {
      return this.pizzaConstruct.ingredients.find(
        (item) => item.ingredientId == id
      );
    },

    draggableIngredient(params) {
      let elementDrag = document.querySelector(`.${params.name} [draggable]`);
      elementDrag.setAttribute("draggable", params.quantity <= 2);
    },

    dropIngredient(params) {
      let elemPlusButton = document.querySelector(
        `.${params.name} .counter__button--plus`
      );
      elemPlusButton.dispatchEvent(new Event("click"));
    },

    addToCart(price) {
      this.priceToCart = price;
    },
  },
};
</script>

<style></style>
