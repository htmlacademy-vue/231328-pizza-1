import Vue from "vue";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";
import { get, set, assign, remove } from "lodash";
import modules from "@/store/modules";
import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  getters: {
    // Получаем любую сущность по переданному пути
    getEntity: (state, getters, rootState) => (path) => {
      return get(rootState, path);
    },

    // Получаем любую объект или его значение ключа по id
    getEntityById:
      (state, { getEntity }) =>
      (path, id) => {
        // Ключ в искомом объекте
        let key = path.split("#")[1];
        // Путь искомого объекта
        path = path.split("#")[0];

        // ATTENTION: опциональная цепочка
        if (key) {
          // Если передали ключ, то возвращаем значение переданного ключа в искомом объекте
          return getEntity(path)?.find((entity) => entity.id == id)?.[key];
        }
        // А если нет, то возвращаем сам искомый объект
        return getEntity(path)?.find((entity) => entity.id == id);
      },
  },
  mutations: {
    [SET_ENTITY](state, { path, value }) {
      set(state, path, value);
    },

    [ADD_ENTITY](state, { path, value }) {
      get(state, path).push(value);
    },

    [UPDATE_ENTITY](state, { path, value }) {
      const targetState = get(state, path);
      const index = targetState.findIndex(({ id }) => id === value.id);
      ~index && assign(targetState[index], value);
    },

    [DELETE_ENTITY](state, { path, id }) {
      remove(get(state, path), function (item) {
        return item.id === id;
      });
      set(state, path, [...get(state, path)]);
    },
  },
  actions: {
    async init({ rootState, dispatch }) {
      dispatch("Builder/query");
      dispatch("Cart/query");
      if (rootState.Auth.isAuthenticated) {
        dispatch("Profile/query");
        dispatch("Orders/query");
      }
    },
  },
  plugins: [VuexPlugins],
  modules,
});
