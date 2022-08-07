import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import Profile from "@/views/Profile";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Profile", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(Profile, options);
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
