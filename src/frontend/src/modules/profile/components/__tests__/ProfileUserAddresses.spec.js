import { shallowMount } from "@vue/test-utils";
import { address } from "@/store/mocks";
import ProfileUserAddresses from "@/modules/Profile/components/ProfileUserAddresses";

describe("ProfileUserAddresses", () => {
  const propsData = { address: address };
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(ProfileUserAddresses, options);
  };

  beforeEach(() => {
    createComponent({ propsData });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("is name rendered", () => {
    let item = wrapper.find('[data-test="addres-name"]');
    expect(item.text()).toBe(address.name);
  });

  it("call emit on edit btn click", async () => {
    let item = wrapper.find('[data-test="address-edit"]');
    await item.trigger("click");
    expect(wrapper.emitted().onEdit).toBeTruthy();
  });

  it("is address location rendered", () => {
    let item = wrapper.find('[data-test="address-location"]').text();
    item = item.replace(" д. ", "");
    item = item.replace(" кв. ", "");
    item = item.split(",");
    expect(item[0]).toBe(address.street);
    expect(item[1]).toBe(address.building);
    expect(item[2]).toBe(address.flat);
  });

  it("is comment rendered", () => {
    let item = wrapper.find('[data-test="address-comment"]');
    expect(item.text()).toBe(address.comment);
  });
});

/*
data-test="addres-name"
data-test="address-edit" @click="$emit('onEdit', address)
{{ address.street }}, д. {{ address.building }}, кв. {{ address.flat }}
<small data-test="address-comment">{{ address.comment }}</small>
*/
