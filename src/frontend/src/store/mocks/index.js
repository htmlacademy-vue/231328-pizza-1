/*
 * Здесь мы создаём тест-хранилище с подключёнными модулями и мутациями из
 * оригинального хранилища. Также наша вспомогательная функция принимает объект
 * действий. Это jest-функции, которые мы обновляем перед каждым тестом. Таким
 * образом, мы имеем возможность переопределить тест-действия хранилища и не
 * отправлять запросы на сервер во время тестов. Мутации, состояние модулей — всё
 * из оригинального хранилища.
 */
import { cloneDeep, merge } from "lodash";
import { mutations, getters } from "@/store";
import { SET_ENTITY } from "../mutation-types";
import { DOUGH, SIZES, SAUCES, INGREDIENTS } from "@/common/constants";
import pizza from "@/static/pizza.json";
import modules from "@/store/modules";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";

export const generateMockStore = (actions) => {
  const modulesCopy = cloneDeep(modules);
  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      modulesCopy[module] = { ...modulesCopy[module], actions };
    });
  }

  return new Vuex.Store({
    state: {},
    getters,
    mutations,
    modules: modulesCopy,
    plugins: [VuexPlugins],
  });
};

export const createBuilder = (store) => {
  let normalize = {
    dough: DOUGH,
    sizes: SIZES,
    sauces: SAUCES,
    ingredients: INGREDIENTS,
  };
  let normalizeBuilder = merge(pizza, normalize);

  store.commit(SET_ENTITY, {
    path: "Builder.builder",
    value: { ...normalizeBuilder },
  });

  store.commit(SET_ENTITY, {
    path: "Builder.BuilderIsReady",
    value: true,
  });
};

export const createConstruct = (store) => {
  store.commit(SET_ENTITY, {
    path: "Builder.construct",
    value: {
      id: "1",
      name: "Пицца «Четыре сыра»",
      doughId: 1,
      sauceId: 1,
      sizeId: 1,
      ingredients: [
        { id: 2, quantity: 3 },
        { id: 6, quantity: 2 },
        { id: 5, quantity: 1 },
        { id: 7, quantity: 1 },
      ],
      quantity: 1,
    },
  });
};
