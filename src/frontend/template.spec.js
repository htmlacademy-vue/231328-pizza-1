import { shallowMount } from "@vue/test-utils";

import AppCounter from "@/common/components/AppCounter";

describe("AppCounter", () => {
  const propsData = {};

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppCounter, options);
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
