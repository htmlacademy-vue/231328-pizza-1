/*
 * Здесь мы создаём тест-хранилище с подключёнными модулями и мутациями из
 * оригинального хранилища. Также наша вспомогательная функция принимает объект
 * действий. Это jest-функции, которые мы обновляем перед каждым тестом. Таким
 * образом, мы имеем возможность переопределить тест-действия хранилища и не
 * отправлять запросы на сервер во время тестов. Мутации, состояние модулей — всё
 * из оригинального хранилища.
 */
import { cloneDeep } from "lodash";
import { mutations } from "@/store";
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
    mutations,
    modules: modulesCopy,
    plugins: [VuexPlugins],
  });
};
