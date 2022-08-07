import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, address, createAuth } from "@/store/mocks";
import ProfileUserFormAddress from "@/modules/profile/components/ProfileUserFormAddress";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ProfileUserFormAddress", () => {
  let store;
  let wrapper;
  let stubs = ["AppInput"];
  let action = {
    Builder: {
      query: jest.fn(),
    },
  };

  let propsData = {
    addressToEdit: address,
    formType: "edit",
  };

  const createComponent = (options) => {
    wrapper = mount(ProfileUserFormAddress, options);
  };

  beforeEach(() => {
    store = generateMockStore(store);
    createAuth(store);
    createComponent({ localVue, store, action, stubs, propsData });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});

/*
@submit.prevent="$emit('onSave', address)"
<b data-test="address-name">{{ address.name || "Новый адрес" }}</b>
data-test="address-delete" @click="$emit('onDelete', address.id)"
*/
