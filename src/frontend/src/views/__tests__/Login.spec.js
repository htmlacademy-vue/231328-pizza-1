import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import Login from "@/modules/profile/components/Login";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Login", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(Login, options);
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
