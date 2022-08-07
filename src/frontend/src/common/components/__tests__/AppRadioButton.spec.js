import { shallowMount } from "@vue/test-utils";

import AppRadioButton from "@/common/components/RadioButton";

describe("AppRadioButton", () => {
  const propsData = {
    title: "textTitle",
    name: "testName",
    value: "testValue",
    checked: false,
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppRadioButton, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("input name is prop name", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("name")).toBe(`${propsData.name}`);
  });

  it("input value is prop value", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.element.value).toBe(`${propsData.value}`);
  });

  it("input checked is prop checked", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.element.checked).toBeFalsy();
  });

  it("it emits an input was changes", async () => {
    createComponent({ propsData });
    await wrapper.trigger("click");
    expect(wrapper.emitted().onChange).toBeTruthy();
  });

  it("title is prop title", () => {
    createComponent({ propsData });
    let span = wrapper.find("span").element;
    expect(span.textContent).toBe(propsData.title);
  });
});

/* Список элементов для тестирования
:name="name"
:value="value"
:checked="checked"
@change="$emit('onChange')"
<span>{{ title }}</span>
*/
