<template>
  <div class="page page--index">
    <header class="header">
      <div class="header__logo">
        <a href="" class="logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <a href="">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <div class="content__dough">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>
              <div class="sheet__content dough">
                <label
                  v-for="item of pizzaData.dough"
                  :key="item.id"
                  :class="['dough__input', getDoughClassByName(item.name)]"
                >
                  <input
                    type="radio"
                    name="dought"
                    :value="item.price"
                    class="visually-hidden"
                  />
                  <b :style="`background: ${item.image}`">{{ item.name }}</b>
                  <span>{{ item.description }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <label
                  v-for="item of pizzaData.sizes"
                  :key="item.id"
                  :class="[
                    'diameter__input',
                    'diameter__input--' +
                      getSizeValueByMultiplier(item.multiplier),
                  ]"
                >
                  <input
                    type="radio"
                    name="diameter"
                    :value="getSizeValueByMultiplier(item.multiplier)"
                    class="visually-hidden"
                  />
                  <span>{{ item.name }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите ингредиенты
              </h2>

              <div class="sheet__content ingredients">
                <div class="ingredients__sauce">
                  <p>Основной соус:</p>

                  <label
                    class="radio ingredients__input"
                    v-for="item of pizzaData.sauces"
                    :key="item.id"
                  >
                    <input
                      type="radio"
                      name="sauce"
                      :value="getSauceValueByName(item.name)"
                    />
                    <span>{{ item.name }}</span>
                  </label>
                </div>

                <div class="ingredients__filling">
                  <p>Начинка:</p>

                  <ul class="ingredients__list">
                    <li
                      class="ingredients__item"
                      v-for="item of pizzaData.ingredients"
                      :key="item.id"
                    >
                      <span
                        :class="[
                          'filling',
                          'filling--' +
                            getIngredientValueByImageLink(item.image),
                        ]"
                      >
                        {{ item.name }}
                      </span>

                      <div class="counter counter--orange ingredients__counter">
                        <button
                          type="button"
                          class="counter__button counter__button--minus"
                          disabled
                        >
                          <span class="visually-hidden">Меньше</span>
                        </button>
                        <input
                          type="text"
                          name="counter"
                          class="counter__input"
                          value="0"
                        />
                        <button
                          type="button"
                          class="counter__button counter__button--plus"
                        >
                          <span class="visually-hidden">Больше</span>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
              />
            </label>

            <div class="content__constructor">
              <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                  <div class="pizza__filling pizza__filling--ananas"></div>
                  <div class="pizza__filling pizza__filling--bacon"></div>
                  <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
              </div>
            </div>

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button" disabled>Готовьте!</button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import miscData from "@/static/misc.json";
import pizzaData from "@/static/pizza.json";
import userData from "@/static/user.json";

export default {
  name: "Index",
  data: () => ({
    miscData,
    pizzaData,
    userData,
  }),
  methods: {
    getDoughClassByName(name) {
      return name == "Тонкое" ? "dough__input--light" : "dough__input--large";
    },

    getSizeValueByMultiplier(multiplier) {
      let value;

      if (multiplier == 1) {
        value = "small";
      } else if (multiplier == 2) {
        value = "normal";
      } else {
        value = "large";
      }

      return value;
    },

    getSauceValueByName(name) {
      return name == "Томатный" ? "tomato" : "creamy";
    },

    getIngredientValueByImageLink(link) {
      // На маcсив по слешу -> взяли последний -> убрались все после точки(.svg) -> выбрали
      let value = link.split("/").pop().split(".", "1")[0];

      return value;
    },
  },
};
</script>

<style></style>
