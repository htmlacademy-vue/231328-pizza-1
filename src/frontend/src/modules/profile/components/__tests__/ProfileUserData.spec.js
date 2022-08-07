import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, createAuth } from "@/store/mocks";
import ProfileUserData from "@/modules/profile/components/ProfileUserData";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ProfileUserData", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(ProfileUserData, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    createAuth(store);
    createComponent({ localVue, store });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("is phone rendered", () => {
    let item = wrapper.find('[data-test="user-phone"]');
    expect(item.text()).toBe(store.state.Auth.user.phone);
  });

  it("is avatar rendered", () => {
    let item = wrapper.find('[data-test="user-img"]');
    expect(item.attributes("src")).toBe(store.state.Auth.user.avatar);
  });

  it("is name rendered", () => {
    let item = wrapper.find('[data-test="user-name"]');
    expect(item.text()).toBe(store.state.Auth.user.name);
  });
});

/*
<span>{{ user.name }}</span>data-test="user-name"
Контактный телефон: <span>{{ user.phone }}</span>
:src="user.avatar"
*/
