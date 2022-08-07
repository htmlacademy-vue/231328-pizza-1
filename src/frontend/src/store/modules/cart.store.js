import router from "@/router";
import { SET_ENTITY } from "@/store/mutation-types";

const setupState = () => ({
  userId: null,
  phone: null,
  isFormValid: false,
  isPickup: false,
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
      return Object.values(pizzas).length === 0;
    },

    totalPrice({ pizzas, misc }, { getPizzasPrice, getMiscPrice }) {
      return getPizzasPrice(pizzas) + getMiscPrice(misc);
    },

    getPizzasPrice: (state, getters, rootState, rootGetters) => (pizzas) => {
      return pizzas.reduce((acc, curr) => {
        return acc + rootGetters["Builder/getPizzaPrice"](curr) * curr.quantity;
      }, 0);
    },

    getMiscPrice: () => (misc) => {
      return misc.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
      }, 0);
    },

    getIngredientsList:
      (state, getters, rootState, { getEntityById }) =>
      (ingredients) => {
        let arr = [];
        ingredients.forEach((ingredient) => {
          arr.push(
            getEntityById(
              "Builder.builder.ingredients#name",
              ingredient.ingredientId || ingredient.id
            )
          );
        });
        return arr.join(", ");
      },
  },
  actions: {
    async query({ commit, rootState }) {
      // 1. Получили данные доп. товаров из API
      const misc = await this.$api.misc.query();

      // 2. Установили доп. товары прежде нормализовав
      commit(
        SET_ENTITY,
        { path: "Cart.misc", value: misc },
        { root: true } // Вызвать мутации которые зареганы вне модуля(namespaced: true) / в глобальном простианстве имен
      );

      if (rootState.Auth.isAuthenticated) {
        // 3. Установили id пользователя
        commit(
          SET_ENTITY,
          {
            path: "Cart.userId",
            value: rootState.Auth.user.id || null,
          },
          { root: true }
        );

        // 4. Установили телефон пользователя
        commit(
          SET_ENTITY,
          {
            path: "Cart.phone",
            value: rootState.Auth.user.phone || null,
          },
          { root: true }
        );
      }
    },

    setupAddress({ commit }) {
      commit(
        SET_ENTITY,
        {
          path: "Cart.address",
          value: setupState().address,
        },
        { root: true }
      );
    },

    async submitOrder({ rootState, commit, dispatch }, deliveryType) {
      if (deliveryType === "false") {
        commit(
          SET_ENTITY,
          {
            path: "Cart.address",
            value: null,
          },
          { root: true }
        );
      }
      try {
        await this.$api.orders.post(rootState.Cart);
        commit(
          SET_ENTITY,
          {
            path: "Cart",
            value: setupState(),
          },
          { root: true }
        );
        dispatch("query");
        if (rootState.Auth.isAuthenticated)
          dispatch("Orders/query", "", { root: true });
        router.push("/success");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
