import { SET_ENTITY, DELETE_ENTITY } from "../mutation-types.js";

export default {
  namespaced: true,
  state: {
    orders: null,
  },
  actions: {
    async query({ commit }) {
      const data = await this.$api.orders.query();
      commit(
        SET_ENTITY,
        {
          path: "Orders.orders",
          value: data,
        },
        { root: true }
      );
    },

    async delete({ commit }, id) {
      await this.$api.orders.delete(id);
      commit(
        DELETE_ENTITY,
        {
          path: "Orders.orders",
          id,
        },
        { root: true }
      );
    },
  },
};
