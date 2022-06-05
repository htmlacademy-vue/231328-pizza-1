import jsonMisc from "@/static/misc.json";
import Vue from "vue";
import router from "@/router";

import { cloneDeep } from "lodash";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_PIZZA_QUATITY,
  SET_MISC,
  UPDATE_MISC,
  SET_PHONE,
  SET_ADDRESS,
  RESET_CART,
} from "@/store/mutation-types";

import { normalizeMisc } from "@/common/helpers";

const setupState = () => ({
  userId: null,
  phone: null,
  address: {
    street: null,
    building: null,
    flat: null,
    comment: null,
  },
  pizzas: [],
  misc: [],
});

export default {
  namespaced: true,
  state: setupState(),
  getters: {
    isEmpty({ pizzas }) {
      return Object.values(pizzas).length !== 0;
    },

    totalPrice(state) {
      let pizzasPrice;
      let miscPrice;

      pizzasPrice = state.pizzas.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
      }, 0);

      miscPrice = state.misc.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
      }, 0);

      return pizzasPrice + miscPrice;
    },
  },
  mutations: {
    [ADD_TO_CART](state, pizzaConstruct) {
      state.pizzas = [...state.pizzas, cloneDeep(pizzaConstruct)];
    },
    [REMOVE_FROM_CART]({ pizzas }, { index }) {
      pizzas.splice(index, 1);
    },
    [UPDATE_PIZZA_QUATITY]({ pizzas }, { index, count }) {
      pizzas[index].quantity = count;
    },
    [SET_MISC](state, data) {
      state.misc = data;
    },
    [UPDATE_MISC]({ misc }, { id, count }) {
      Vue.set(
        misc.find((item) => item.miscId === id),
        "quantity",
        count
      );
    },
    [SET_PHONE](state, str) {
      state.phone = str;
    },
    [SET_ADDRESS](state, obj) {
      state.address = { ...obj };
    },
    [RESET_CART](state) {
      Object.assign(state, setupState());
    },
  },
  actions: {
    query({ commit }) {
      commit(SET_MISC, normalizeMisc(jsonMisc));
    },
    resetCart({ commit }) {
      commit(RESET_CART);
      commit(SET_MISC, normalizeMisc(jsonMisc));
    },
    submitOrder(context) {
      context.dispatch("resetCart");
      router.push("/success");
    },
  },
};
