import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, createBuilder } from "@/store/mocks";
import SheetCard from "@/common/components/SheetCard";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";

const localVue = createLocalVue();
localVue.component("SheetCard", SheetCard);
localVue.use(Vuex);

describe("BuilderIngredientsSelector", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    createBuilder(store);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("is sauces rendered", () => {
    let sauces = wrapper.findAll("[data-test='sauce-item']");
    expect(Array.from(sauces).length).toEqual(
      store.state.Builder.builder.sauces.length
    );
  });

  it("is ingredients rendered", () => {
    let ingredients = wrapper.findAll("[data-test='ingredient-item']");
    expect(Array.from(ingredients).length).toEqual(
      store.state.Builder.builder.ingredients.length
    );
  });

  it("call vuex mutation on sauce emit", async () => {
    let spyOnMutation = jest.spyOn(wrapper.vm, "setSauce");
    let sauces = wrapper.findAll("[data-test='sauce-item']");
    await sauces.trigger("click");
    expect(spyOnMutation).toHaveBeenCalled();
  });

  it("call vuex mutation on ingredient counter emit", () => {
    let spyOnMutation = jest.spyOn(wrapper.vm, "updateIngredients");
    let ingredientCounter = wrapper.find(
      "[data-test='ingredient-item-counter']"
    );
    ingredientCounter.vm.$emit("update:count", { id: 1, quantity: 1 });
    expect(spyOnMutation).toHaveBeenCalled();
  });
});

/*
v-for="item of builder.sauces"
v-for="item of builder.ingredients"
@onChange="setSauce(item.id)"
@update:count="updateIngredients(item.id, $event)"
*/
