import jsonPizza from "@/static/pizza.json";
import { SET_BUILDER } from "@/store/mutation-types";
import {
  normalizeDough,
  normalizeSizes,
  normalizeSauces,
  normalizeIngredients,
} from "@/common/helpers";

export default {
  namespaced: true,
  state: {
    dough: [],
    ingredients: [],
    sauces: [],
    sizes: [],
  },
  getters: {
    getDoughById: (state) => (id) => {
      return state.dough.find((item) => item.id == id);
    },
    getSizeById: (state) => (id) => {
      return state.sizes.find((item) => item.id == id);
    },
    getSauceById: (state) => (id) => {
      return state.sauces.find((item) => item.id == id);
    },
    getIngredientById: (state) => (id) => {
      return state.ingredients.find((item) => item.id == id);
    },
  },
  mutations: {
    [SET_BUILDER](state, data) {
      state.dough = data.dough;
      state.ingredients = data.ingredients;
      state.sauces = data.sauces;
      state.sizes = data.sizes;
    },
  },
  actions: {
    query({ commit }) {
      const data = jsonPizza;

      data.dough = normalizeDough(data.dough);
      data.ingredients = normalizeIngredients(data.ingredients);
      data.sauces = normalizeSauces(data.sauces);
      data.sizes = normalizeSizes(data.sizes);

      commit(SET_BUILDER, data);
    },
  },
};
