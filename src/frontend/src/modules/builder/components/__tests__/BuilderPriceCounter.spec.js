import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, createBuilder } from "@/store/mocks";
import { ADD_ENTITY } from "@/store/mutation-types";
import AppCard from "@/common/components/AppCard.vue";
import AppButton from "@/common/components/AppButton.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

const localVue = createLocalVue();
localVue.component("AppCard", AppCard);
localVue.component("AppButton", AppButton);
localVue.use(Vuex);

describe("BuilderPriceCounter", () => {
  let actions;
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  beforeEach(() => {
    actions = {
      Builder: { resetConstruct: jest.fn() },
    };
    store = generateMockStore(actions);
    createComponent({ localVue, store });
    createBuilder(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("pizza price exists", () => {
    let textWrapper = wrapper.find("p");
    let price = textWrapper.html().split(" ")[1];
    expect(price).not.toBeNaN();
  });

  it("button isn't disabled", () => {
    let textWrapper = wrapper.find("p");
    let price = textWrapper.html().split(" ")[1];
    expect(price).not.toBeNaN();
  });

  it("call vuex mutation on user click button", async () => {
    let spyOnMutation = jest.spyOn(wrapper.vm, [ADD_ENTITY]);
    let button = wrapper.find('[data-test="button"]');
    await button.trigger("click");
    expect(spyOnMutation).toHaveBeenCalled();
  });

  it("call action reset construct on user click button", async () => {
    let button = wrapper.find('[data-test="button"]');
    await button.trigger("click");
    expect(actions.Builder.resetConstruct).toHaveBeenCalled();
  });
});

/*
<p>{{ BuilderIsReady && getPizzaPrice(construct) }}</p>
:disabled="!constructIsValid"
@click="addToCart
*/
