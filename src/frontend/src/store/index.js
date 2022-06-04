import Vue from "vue";
import Vuex from "vuex";

import modules from "@/store/modules";
import { cloneDeep } from "lodash";

import {
  DEFAULT_DOUGH_ID,
  DEFAULT_SIZE_ID,
  DEFAULT_SAUCE_ID,
} from "@/common/constants";

import {
  SET_NAME,
  SET_DOUGH,
  SET_SIZE,
  SET_SAUCE,
  SET_INGREDIENT,
  UPDATE_INGREDIENT,
  DELETE_INGREDIENT,
  SET_PRICE,
  CHANGE_PIZZA,
  RESET_CONSTRUCT,
} from "@/store/mutation-types";

/*
 * Записали state в константу,
 * чтобы можно было сбросить к дефолтному состоянию
 * после добавления пиццы в корзину
 */
const setupState = () => ({
  pizzaConstruct: {
    name: "",
    doughId: DEFAULT_DOUGH_ID,
    sauceId: DEFAULT_SAUCE_ID,
    sizeId: DEFAULT_SIZE_ID,
    ingredients: [],
    quantity: 1,
    price: 0,
  },
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: setupState(),
  getters: {
    getIngredientQuantityById:
      ({ pizzaConstruct }) =>
      (id) => {
        let ingredient = pizzaConstruct.ingredients.find(
          (item) => item.ingredientId === id
        );
        return ingredient ? ingredient.quantity : 0;
      },

    constructIsValid({ pizzaConstruct }) {
      return Object.values(pizzaConstruct).every((item) => item.length !== 0);
    },

    getIngredientsPrice({ pizzaConstruct }, getters, rootState, rootGetters) {
      return pizzaConstruct.ingredients.reduce((acc, item) => {
        return (
          acc +
          rootGetters["Builder/getIngredientById"](item.ingredientId).price *
            item.quantity
        );
      }, 0);
    },

    getPizzaPrice({ pizzaConstruct }, getters, rootState, rootGetters) {
      return (
        rootGetters["Builder/getSizeById"](pizzaConstruct.sizeId).multiplier *
        (rootGetters["Builder/getDoughById"](pizzaConstruct.doughId).price +
          rootGetters["Builder/getSauceById"](pizzaConstruct.sauceId).price +
          getters.getIngredientsPrice)
      );
    },

    getPizzaFromCartByIndex: (state, getters, rootState) => (index) => {
      return rootState.Cart.pizzas[index];
    },
  },
  mutations: {
    [SET_NAME]({ pizzaConstruct }, name) {
      pizzaConstruct.name = name;
    },
    [SET_DOUGH]({ pizzaConstruct }, id) {
      pizzaConstruct.doughId = id;
    },
    [SET_SIZE]({ pizzaConstruct }, id) {
      pizzaConstruct.sizeId = id;
    },
    [SET_SAUCE]({ pizzaConstruct }, id) {
      pizzaConstruct.sauceId = id;
    },
    [SET_INGREDIENT](state, id) {
      state.pizzaConstruct.ingredients.push({
        ingredientId: id,
        quantity: 1,
      });
    },
    [UPDATE_INGREDIENT]({ pizzaConstruct }, { id, count }) {
      pizzaConstruct.ingredients.find(
        (item) => item.ingredientId === id
      ).quantity = count;
    },
    [DELETE_INGREDIENT]({ pizzaConstruct }, id) {
      pizzaConstruct.ingredients = pizzaConstruct.ingredients.filter(
        (item) => item.ingredientId !== id
      );
    },
    [SET_PRICE]({ pizzaConstruct }, price) {
      pizzaConstruct.price = price;
    },
    [CHANGE_PIZZA](state, index) {
      state.pizzaConstruct = cloneDeep(
        this.getters.getPizzaFromCartByIndex(index)
      );
    },
    [RESET_CONSTRUCT](state) {
      Object.assign(state, setupState());
    },
  },
  actions: {
    async init({ dispatch }) {
      dispatch("Builder/query");
      dispatch("Cart/query");
    },
  },
  modules,
});
