import { shallowMount } from "@vue/test-utils";

import AppItemCounter from "@/common/components/AppItemCounter";

describe("AppItemCounter", () => {
  const propsData = {};

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppItemCounter, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("It sets dinamyc class for <label>", () => {
    createComponent({ propsData });
    expect(
      wrapper.find("label").element.classList.contains("input--big-label")
    ).toBe(true);
  });
});

/* Список элементов для тестирования:
 */
