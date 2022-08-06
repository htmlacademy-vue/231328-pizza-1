import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, createBuilder } from "@/store/mocks";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderPizzaView", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    createComponent({ localVue, store });
    createBuilder(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("is ingredients rendered", () => {
    let ingredients = wrapper.findAll("[data-test='ingredient']");
    expect(Array.from(ingredients).length).toEqual(
      store.state.Builder.construct.ingredients.length
    );
  });

  it("pizza class exists", () => {
    let pizza = wrapper.find("[data-test='pizza']");
    expect(pizza.attributes("class")).toContain("pizza--foundation--");
  });

  it("ingredient dynamic class exists", () => {
    let ingredient = wrapper.find("[data-test='ingredient']");
    expect(ingredient.attributes("class")).toContain("pizza__filling--cheddar");
    expect(ingredient.attributes("class")).toContain("pizza__filling--third");
  });

  it("call vuex mutation on user drop ingredient", () => {
    let spyOnMutation = jest.spyOn(wrapper.vm, "setDroppedIngredient");
    let dropWrapper = wrapper.find('[data-test="drop"]');
    dropWrapper.vm.$emit("drop", { id: 1, quantity: 1 });
    expect(spyOnMutation).toHaveBeenCalledWith({
      id: 1,
      quantity: 1,
    });
  });
});

/*
<div class="pizza" :class="BuilderIsReady && pizzaFoundationClass">
v-for="item in construct.ingredients
getClassByIngredient(item.id)
getClassByCount(item.quantity)
<AppDrop @drop="setDroppedIngredient($event)">
*/
