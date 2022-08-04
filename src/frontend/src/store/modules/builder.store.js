import { SET_ENTITY } from "@/store/mutation-types";
import { uniqueId } from "lodash";
import {
  DEFAULT_DOUGH_ID,
  DEFAULT_SIZE_ID,
  DEFAULT_SAUCE_ID,
} from "@/common/constants";

// Вынесли в переменную для сброса state в дальнейшем
const setupConstructState = () => ({
  id: uniqueId(), // id для дальнейших манипуляций в коризине
  name: "",
  doughId: DEFAULT_DOUGH_ID,
  sauceId: DEFAULT_SAUCE_ID,
  sizeId: DEFAULT_SIZE_ID,
  ingredients: [],
  quantity: 1,
});

export default {
  namespaced: true,
  state: {
    BuilderIsReady: false,
    builder: {
      dough: [],
      ingredients: [],
      sauces: [],
      sizes: [],
    },
    construct: {
      // ...setupConstructState(),
      id: "1",
      name: "Пицца «Четыре сыра»",
      doughId: DEFAULT_DOUGH_ID,
      sauceId: DEFAULT_SAUCE_ID,
      sizeId: DEFAULT_SIZE_ID,
      ingredients: [
        { id: 2, quantity: 1 },
        { id: 6, quantity: 1 },
        { id: 5, quantity: 1 },
        { id: 7, quantity: 1 },
      ],
      quantity: 1,
    },
  },
  getters: {
    constructIsValid({ construct }) {
      return Object.values(construct).every((item) => item.length !== 0);
    },

    getIngredientsPrice:
      (state, getter, rootState, { getEntityById }) =>
      (ingredients) => {
        return ingredients.reduce((acc, item) => {
          return (
            acc +
            getEntityById(
              "Builder.builder.ingredients#price",
              item.ingredientId || item.id
            ) *
              item.quantity
          );
        }, 0);
      },

    getPizzaPrice:
      (state, { getIngredientsPrice }, rootState, { getEntityById }) =>
      (pizza) => {
        return (
          getEntityById("Builder.builder.sizes#multiplier", pizza.sizeId) *
          (getEntityById("Builder.builder.dough#price", pizza.doughId) +
            getEntityById("Builder.builder.sauces#price", pizza.sauceId) +
            getIngredientsPrice(pizza.ingredients))
        );
      },
  },
  actions: {
    async query({ commit }) {
      // Создали объект для данных
      let data = {};

      // Получили данные из API
      data.dough = await this.$api.dough.query();
      data.ingredients = await this.$api.ingredients.query();
      data.sauces = await this.$api.sauces.query();
      data.sizes = await this.$api.sizes.query();

      // Перебрали объект данных и вызвали мутацию на каждой итерации
      Object.keys(data).forEach(function (key) {
        commit(
          SET_ENTITY,
          { path: `Builder.builder.${key}`, value: this[key] },
          { root: true }
        );
      }, data);

      // Builder готов к использованию = true
      // Требуется чтобы отрабатывали getters-методы
      commit(
        SET_ENTITY,
        { path: "Builder.BuilderIsReady", value: true },
        { root: true }
      );
    },

    resetConstruct({ commit }) {
      commit(
        SET_ENTITY,
        { path: "Builder.construct", value: setupConstructState() },
        { root: true }
      );
    },
  },
};
