import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, createBuilder } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import SheetCard from "@/common/components/SheetCard";

const localVue = createLocalVue();
localVue.component("SheetCard", SheetCard);
localVue.use(Vuex);

describe("BuilderDoughSelector", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    createBuilder(store);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("is dough rendered", () => {
    let doughItem = wrapper.findAll('[data-test="dough-item"]');
    expect(Array.from(doughItem).length).toEqual(
      store.state.Builder.builder.dough.length
    );
  });

  it("call vuex mutation on user click at dough", async () => {
    let spyOnMutation = jest.spyOn(wrapper.vm, [SET_ENTITY]);
    let doughItem = wrapper.findAll('[data-test="dough-item"]');
    await doughItem.trigger("click");
    expect(spyOnMutation).toHaveBeenCalled();
  });
});

/* Список элементов для тестирования:
v-for="item of builder.dough"
...mapMutations([SET_ENTITY]),
*/
