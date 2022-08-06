import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, createCart, createProfile } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import CartOrderForm from "@/modules/cart/components/CartOrderForm";
import AppInput from "@/common/components/AppInput";

const localVue = createLocalVue();
localVue.component("AppInput", AppInput);
localVue.use(Vuex);

describe("CartOrderForm", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(CartOrderForm, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    createCart(store);
    createProfile(store);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    console.log(wrapper.html());
    expect(wrapper.exists()).toBeTruthy();
  });

  it("is option name rendered", () => {
    console.log(store.state.Profile.addresses);
    console.log(wrapper.find('[data-test="delivery-option"]').text());
    expect(wrapper.find('[data-test="delivery-option"]').text()).toBe("Работа");
  });

  it("call vuex mutation on select change", async () => {
    let spyOnMethod = jest.spyOn(wrapper.vm, "setDelivery");
    let spyOnMutation = jest.spyOn(wrapper.vm, SET_ENTITY);
    let select = wrapper.find('[data-test="delivery-select"]');
    await select.trigger("change");
    expect(spyOnMethod).toHaveBeenCalled();
    expect(spyOnMutation).toHaveBeenNthCalledWith(1, {
      path: "Cart.isPickup",
      value: false,
    });
    expect(spyOnMutation).toHaveBeenNthCalledWith(2, {
      path: "Cart.isFormValid",
      value: false,
    });
  });

  it("label address name is correct", () => {
    wrapper.find('[data-test="address-label"]');
    expect(wrapper.find('[data-test="address-label"]').text()).toBe(
      "Новый адрес:"
    );
  });

  it("call vuex mutation on input address", async () => {
    let spyOnMethod = jest.spyOn(wrapper.vm, "validateAddress");
    let spyOnMutation = jest.spyOn(wrapper.vm, SET_ENTITY);
    let option = wrapper.find('[data-test="address-input"] input');
    await option.trigger("input");
    expect(spyOnMethod).toHaveBeenCalled();
    expect(spyOnMutation).toHaveBeenCalled();
  });

  it("input disabled from deliveryType", () => {
    let input = wrapper.find('[data-test="address-input"] input');
    expect(input.attributes("disabled")).toBe();
  });
});

/*
@change="setDelivery($event)"
v-for="address of addresses"
{{ address.name }}
Number.isInteger(deliveryType) ? "Доставим сюда:" : "Новый адрес:"
@input="validateAddress()"
:disabled="Number.isInteger(deliveryType)"
*/
