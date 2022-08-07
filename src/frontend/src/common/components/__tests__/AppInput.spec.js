/* Инпут — это глупый компонент
– ничего не знает о своём родителе и детях;
– получает данные только через входные параметры;
- не вызывает операций в глобальном хранилище;
- не перенаправляет на другие маршруты;
- не имеет API-вызовов
Монтируем его с помощью shallowMount.
А есть умный тогда юзаем mount
*/
import { shallowMount } from "@vue/test-utils";

// Импортим сам компонент на тест
import AppInput from "@/common/components/AppInput";

// Указываем название блока тестов(AppInput) — соответствует названию компонента.
// Типа можем произвести тест по этому имени (npm run test:util AppInput)
describe("AppInput", () => {
  // Тут мы указываем тестовые входные параметры
  const propsData = {
    // 1️⃣ Тест динамического класса
    //    Надо проверить что, когда мы передаем пропс format класс соответствует ожидаемому
    format: "big",
    // 2️⃣ Тест value
    //    Надо проверить поставилось ли значение в инпут
    title: "testTitle",
    value: "testValue",
    name: "testName",
    type: "text",
    placeholder: "Test",
    required: true,
    disabled: false,
    autofocus: true,
  };
  // wrapper — тест-обёртка над компонентом.
  // Это типа компонет полность
  let wrapper;

  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = shallowMount(AppInput, options);
  };

  // Перед каждым тестом мы будем заменять click-событие свежей jest-функцией.
  // Это нужно для того, чтобы очистить информацию о вызове в предыдущих тестах.
  afterEach(() => {
    wrapper.destroy();
  });

  // 1️⃣ Тест динамического класса
  it("It sets dinamyc class for <label>", () => {
    // Создали компонент передали ему пропсы
    createComponent({ propsData });
    // В компоненте нашли label (Динамический класс присваевается ей)
    // Проверили есть ли класс, который ожидаем (.input--big-label)
    expect(
      wrapper.find("label").element.classList.contains("input--big-label")
    ).toBe(true);
  });

  // 2️⃣ Тест value
  it("It sets the initial model value", () => {
    // Создали компонент передали ему пропсы
    createComponent({ propsData });
    // В компоненте нашли input
    // Проверили соответствует ли значение переаному
    expect(wrapper.find("input").element.value).toBe(propsData.value);
  });

  // 3️⃣ Тест эмита
  it("It emits an input event when typing", async () => {
    // Не передаем ничего, потому что disable: true во входных и trigger не срабатывает
    createComponent({ propsData });
    let input = wrapper.find("input");
    await input.trigger("input");
    // Правдали что испут эмитит при наборе
    expect(wrapper.emitted().input).toBeTruthy();
  });

  // 4️⃣ Чекаем правильное значение передается при этиме
  it("emits the current input value when typing", async () => {
    // Не передаем ничего, потому что disable: true во входных и trigger не срабатывает
    createComponent({ propsData });
    let input = wrapper.find("input");
    // Значение поставили test
    input.element.value = "test";
    // Тригернули input
    await input.trigger("input");
    // Чекнули заэмитился ли test
    expect(wrapper.emitted().input[0][0]).toEqual("test");
  });

  // Чекаем заголовок в span'e
  it("title is prop title", () => {
    createComponent({ propsData });
    let span = wrapper.find("span").element;
    expect(span.textContent).toBe(propsData.title);
  });

  // Чекаем что пропс name тот что передали
  it("input name is prop name", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("name")).toBe(propsData.name);
  });

  // --//--
  it("input type is prop type", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("type")).toBe(propsData.type);
  });

  it("input placeholder is prop placeholder", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("placeholder")).toBe(propsData.placeholder);
  });

  it("input required is prop required", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("required")).toBeTruthy();
  });

  it("input disabled is prop disabled", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("disabled")).not.toBeTruthy();
  });

  it("input autofocus attribute is prop autofocus", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("autofocus")).toBeTruthy();
  });
});
