import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "Vuex";
import { generateMockStore, createBuilder } from "@/store/mocks";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import SheetCard from "@/common/components/SheetCard";

const localVue = createLocalVue();
localVue.component("SheetCard", SheetCard);
localVue.use(Vuex);

describe("BuilderSizeSelector", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderSizeSelector, options);
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

  it("is size rendered", () => {
    let sizeItem = wrapper.findAll('[data-test="size-item"]');
    expect(Array.from(sizeItem).length).toEqual(
      store.state.Builder.builder.sizes.length
    );
  });

  it("call vuex mutation on size item emit", () => {
    const spyOnMutation = jest.spyOn(wrapper.vm, "setSize");
    let sizeItem = wrapper.find('[data-test="size-item"]');
    sizeItem.vm.$emit("onChange");
    expect(spyOnMutation).toHaveBeenCalled();
  });
});

/*
v-for="item of builder.dough"
@onChange="setDough(item.id)"
*/
