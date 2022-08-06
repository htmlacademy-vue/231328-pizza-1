import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import Success from "@/views/Success";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Success", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(Success, options);
  };

  beforeEach(() => {
    store = generateMockStore(store);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
