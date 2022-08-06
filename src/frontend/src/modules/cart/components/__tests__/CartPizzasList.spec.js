import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, createBuilder, createCart } from "@/store/mocks";
import { DELETE_ENTITY } from "@/store/mutation-types";
import CartPizzasList from "@/modules/cart/components/CartPizzasList";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartPizzasList", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(CartPizzasList, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    createBuilder(store);
    createCart(store);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("is pizzas rendered", () => {
    let item = wrapper.findAll(".cart-list__item");
    expect(Array.from(item).length).toEqual(store.state.Cart.pizzas.length);
  });

  it("is pizza name rendered", () => {
    let item = wrapper.find('[data-test="pizza-name"]');
    expect(item.text()).toBeTruthy();
  });

  it("is pizza size & dough rendered", () => {
    let item = wrapper.find('[data-test="pizza-size-dough"]');
    expect(item.text()).toContain("тесте");
  });

  it("is pizza ingredients rendered", () => {
    let item = wrapper.find("[data-test='pizza-ingredients']");
    expect(item.text()).toContain("Чеддер");
  });

  it("call vuex mutation on change count", () => {
    let method = jest.spyOn(wrapper.vm, "updateQuantity");
    let mutation = jest.spyOn(wrapper.vm, DELETE_ENTITY);
    let item = wrapper.find(".cart-list__counter");
    item.vm.$emit("update:count");
    expect(method).toHaveBeenCalled();
    expect(mutation).toHaveBeenCalled();
  });

  it("pizza price exists", () => {
    let item = wrapper.find(".cart-list__price");
    expect(Number(item.text().split(" ")[0])).not.toBeNaN();
  });
});

/*
v-for="(pizza, index)
{{ pizza.name }}
data-test="pizza-size-dough"
<li data-test="pizza-sauce">
<li data-test="pizza-ingredients">
@update:count="updateQuantity(pizza, $event)"
{{ getPizzaPrice(pizza) * pizza.quantity }}
*/
