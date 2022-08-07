import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
// Создание тестового хранилища (см. доп инфу внтури)
import { generateMockStore } from "@/store/mocks";
import Index from "@/views/Index";
import AppInput from "@/common/components/AppInput";
import SheetCard from "@/common/components/SheetCard";
import AppButton from "@/common/components/AppButton";

// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
// Добавляем к нему глобальный компонент AppIcon.
localVue.component("AppInput", AppInput);
localVue.component("SheetCard", SheetCard);
localVue.component("AppButton", AppButton);
// Добавляем в него Vuex.
localVue.use(Vuex);

describe("Index", () => {
  // Заглушка вместо реального router-view
  const stubs = ["router-view"];

  // Переменные, которые будут переопределяться заново для каждого теста
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(Index, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  // Удаляем тест-обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });
});

/* Список элементов для тестирования:
setDough(id)
*/
