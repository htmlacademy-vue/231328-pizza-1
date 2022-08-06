import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, createCart } from "@/store/mocks";
import CartAdditionalsSelector from "@/modules/cart/components/CartAdditionalsSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartAdditionalsSelector", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(CartAdditionalsSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    createCart(store);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("is misc rendered", () => {
    let miscItem = wrapper.findAll('[data-test="misc-item"]');
    expect(Array.from(miscItem).length).toEqual(store.state.Cart.misc.length);
  });

  it("is name rendered", () => {
    expect(
      wrapper.find('[data-test="misc-item-name"]').text().length
    ).toBeGreaterThan(1);
  });

  it("is price rendered", () => {
    expect(
      wrapper.find('[data-test="misc-item-price"]').text().length
    ).toBeGreaterThan(4);
  });

  it("call vuex mutation on misc counter emit", () => {
    let spyOnMutation = jest.spyOn(wrapper.vm, "updateMisc");
    let doughItem = wrapper.find('[data-test="misc-item-counter"]');
    doughItem.vm.$emit("update:count");
    expect(spyOnMutation).toHaveBeenCalled();
  });
});

/*
v-for="(item, index) of misc"
{{ item.name }}
@update:count="updateMisc(item, $event)"
<b>× {{ item.price }} ₽</b>
*/
