import { shallowMount } from "@vue/test-utils";

import AppCounter from "@/common/components/AppCounter";

describe("AppCounter", () => {
  const propsData = {
    name: "testName",
    count: 3,
    min: 0,
    max: 3,
  };
  const listeners = { click: null };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppCounter, options);
  };

  beforeEach(() => {
    listeners.click = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("input name is prop name", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("name")).toBe(`counter_${propsData.name}`);
  });

  it("minus btm is not disabled", () => {
    createComponent({ propsData });
    let button = wrapper.find(".counter__button--minus");
    expect(button.attributes("disabled")).not.toBeTruthy();
  });

  it("plus btm is disabled", () => {
    createComponent({ propsData });
    let button = wrapper.find(".counter__button--plus");
    expect(button.attributes("disabled")).toBeTruthy();
  });

  it("input value is prop count", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.element.value).toBe(String(propsData.count));
  });

  it("it emits an minus button click", async () => {
    createComponent();
    let button = wrapper.find(".counter__button--minus");
    await button.trigger("click");
    expect(wrapper.emitted().button).not.toBeTruthy();
  });

  it("it emits did not an plus button click", async () => {
    createComponent();
    let button = wrapper.find(".counter__button--plus");
    await button.trigger("click");
    expect(wrapper.emitted().button).not.toBeTruthy();
  });
});

/* Список элементов для тестированиz
:name="['counter_' + name]"
:disabled="count <= min"
:disabled="count >= max"
:value="count"
@click="$emit('update:count', count - 1)"
*/
