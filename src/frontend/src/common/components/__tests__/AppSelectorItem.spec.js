import { shallowMount } from "@vue/test-utils";

import AppSelectorItem from "@/common/components/SelectorItem";

describe("AppSelectorItem", () => {
  const propsData = {
    title: "textTitle",
    description: "TestDesc",
    name: "testName",
    value: "testValue",
    checked: false,
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppSelectorItem, options);
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
    let input = wrapper.find("input").element;
    expect(input.value).toBe(`${propsData.value}`);
  });

  it("input checked is prop checked", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("checked")).toBeFalsy();
  });

  it("it emits an input was changes", async () => {
    createComponent({ propsData });
    await wrapper.trigger("click");
    expect(wrapper.emitted().onChange).toBeTruthy();
  });

  it("description is prop description", () => {
    createComponent({ propsData });
    let span = wrapper.find("span").element;
    expect(span.textContent).toMatch(propsData.description);
  });

  it("title is prop title", () => {
    createComponent({ propsData });
    let span = wrapper.find("span").element;
    expect(span.textContent).not.toContainEqual(propsData.title);
  });
});

/* Список элементов для тестирования:
:name="name"
:value="value"
:checked="checked"
@change="$emit('onChange')"
<b v-if="name === 'dough'">{{ title }}</b>
{{ description }}
<template v-if="name === 'diameter'">{{ title }}</template>
*/
