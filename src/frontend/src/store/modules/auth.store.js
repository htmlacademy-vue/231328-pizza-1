export default {
  namespaced: true,
  state: {
    user: null,
  },

  getters: {
    isAuthUser({ user }) {
      return user;
    },
  },
};
