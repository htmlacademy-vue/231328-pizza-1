/* eslint-disable */
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
    async query({ commit }) {
      let data = {};

      const doughApi = await this.$api.dough.query();
      const ingredientsApi = await this.$api.ingredients.query();
      const saucesApi = await this.$api.sauces.query();
      const sizesApi = await this.$api.sizes.query();

      data.dough = normalizeDough(doughApi);
      data.ingredients = normalizeIngredients(ingredientsApi);
      data.sauces = normalizeSauces(saucesApi);
      data.sizes = normalizeSizes(sizesApi);

      commit(SET_BUILDER, data);
    },
  },
};
