import { SET_ENTITY } from "../mutation-types.js";

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    user: [],
  },
  getters: {
    // геттер-функция для получения параметра по его названию из объекта user
    getUserAttribute: (state) => (attr) => state.user ? state.user[attr] : "",

    isAuthUser({ user }) {
      return user;
    },
  },
  actions: {
    // во время успешного логина:
    async login({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      // 1. получаем с сервера токен и сохраняем его в LocalStorage
      this.$jwt.saveToken(data.token);
      // 2. Добавляем заголовок авторизации в axios
      await this.$api.auth.setAuthHeader();
      // 3. Отправляем запрос на получение профиля пользователя
      dispatch("getMe");
    },

    // Во время логаута мы можем очистить токен только на фронтенде,
    // а можем также отправить запрос на сервер для логаута.
    // По умолчанию делаем логаут с запросом на сервер.
    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      // удаляем токен в LocalStorage
      this.$jwt.destroyToken();
      // Обновляем заголовок авторизации в axios (по факту очищаем его)
      this.$api.auth.setAuthHeader();
      // Указываем, что пользователь не авторизован, и очищаем объект пользователя
      commit(
        SET_ENTITY,
        { path: "Auth.isAuthenticated", value: false },
        { root: true }
      );
      commit(SET_ENTITY, { path: "Auth.user", value: null }, { root: true });
    },

    // Получаем данные авторизованного пользователя
    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit(
          SET_ENTITY,
          { path: "Auth.isAuthenticated", value: true },
          { root: true }
        );
        commit(SET_ENTITY, { path: "Auth.user", value: data }, { root: true });
      } catch {
        // Если токен авторизации невалиден, или мы не смогли получить
        // данные пользователя по другой причине, делаем логаут без запроса на логаут на сервер.
        dispatch("logout", false);
      }
    },
  },
};
