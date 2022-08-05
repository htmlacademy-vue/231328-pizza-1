import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
// Создание тестового хранилища (см. доп инфу внтури)
import { generateMockStore } from "@/store/mocks";
import pizza from "@/static/pizza.json";
import { SET_ENTITY } from "@/store/mutation-types";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import SelectorItem from "@/common/components/SelectorItem";
// Создаём локальный тестовый экземпляр Vue.
const localVue = createLocalVue();
// Добавляем в него Vuex.
localVue.use(Vuex);

// Вспомогательный методы, добавляет данные пиццы-билдера
// в тест-хранилище
const createBuilder = (store) => {
  store.commit(SET_ENTITY, {
    path: "Builder.builder",
    value: { ...pizza },
  });
};

describe("BuilderDoughSelector", () => {
  // https://v1.test-utils.vuejs.org/ru/guides/#общие-советы
  // Вы можете переопределить компоненты, зарегистрированные
  // глобально или локально, используя опцию stubs:
  // Компонент SheetCard
  // будет заменяться пустой заглушкой
  // ?????? зачем
  let slots = { default: SelectorItem };
  let stubs = { SheetCard: true };

  // Переменные, которые будут переопределяться заново для каждого теста
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  // Удаляем тест-обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, slots, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders dough", () => {
    createBuilder(store);
    createComponent({ localVue, store, slots, stubs });
    const doughHtml = wrapper.find('[data-test="dough-item"]');
    console.log(doughHtml);
    console.log(wrapper.html());
    expect(Array.from(doughHtml).length).toEqual(pizza.dough.length);
  });

  // it("calls the vuex mutation on selector item click", async () => {
  //   createBuilder(store);
  //   createComponent({ localVue, store, stubs });
  //   const spyOnMutation = jest.spyOn(wrapper.vm, [SET_ENTITY]);
  //   const item = wrapper.find("[data-test='selector-item']");
  //   await item.vm.$emit("onChange", "1");
  //   expect(spyOnMutation).toHaveBeenCalledWith({ doughId: "1" });
  // });
});

/* Список элементов для тестирования:
v-model="pizzaName"
...mapState("Builder", ["construct"]),
...mapMutations([SET_ENTITY]),
*/
