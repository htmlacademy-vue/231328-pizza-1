import { shallowMount } from "@vue/test-utils";

import AppCard from "@/common/components/AppCard";

describe("AppCard", () => {
  const propsData = {
    className: "testClassName",
  };
  const slots = {
    title: "title",
    content: "content",
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppCard, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders out the slot title", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.title);
  });

  it("renders out the slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.content);
  });

  it("class is prop className", () => {
    createComponent({ propsData });
    let div = wrapper.find("div.sheet").element;
    expect(div.classList).toContain(propsData.className);
  });
});

/* Список элементов для тестирования:
:class="className"
<slot name="title" />
<slot name="content" />
 */
