import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "../mutation-types.js";

export default {
  namespaced: true,
  state: {
    addresses: null,
  },
  getters: {
    getAddressById: (state) => (id) =>
      state.addresses.find((item) => item.id == id),
  },
  actions: {
    async query({ commit }) {
      const data = await this.$api.addresses.query();
      commit(
        SET_ENTITY,
        {
          path: "Profile.addresses",
          value: data,
        },
        { root: true }
      );
    },

    async post({ commit }, address) {
      const data = await this.$api.addresses.post(address);
      commit(
        ADD_ENTITY,
        {
          path: "Profile.addresses",
          value: data,
        },
        { root: true }
      );
    },

    async put({ commit }, address) {
      await this.$api.addresses.put(address);
      commit(
        UPDATE_ENTITY,
        {
          path: "Profile.addresses",
          value: address,
        },
        { root: true }
      );
    },

    async delete({ commit }, id) {
      await this.$api.addresses.delete(id);
      commit(
        DELETE_ENTITY,
        {
          path: "Profile.addresses",
          id,
        },
        { root: true }
      );
    },
  },
};
