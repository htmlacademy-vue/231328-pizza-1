<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector />

        <BuilderSizeSelector />

        <BuilderIngredientsSelector />
        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
              :value="pizzaConstruct.name"
              @input="setName($event.target.value)"
            />

            <BuilderPizzaView />

            <BuilderPriceCounter />
          </label>
        </div>
      </div>
    </form>
    <router-view />
  </main>
</template>

<script>
import miscData from "@/static/misc.json";
import userData from "@/static/user.json";

import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

import { mapMutations, mapState } from "vuex";

import { SET_NAME } from "@/store/mutation-types";

export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  data: () => ({
    miscData,
    userData,
  }),
  computed: {
    ...mapState(["pizzaConstruct"]),
  },
  methods: {
    ...mapMutations([SET_NAME]),

    setName(name) {
      this[SET_NAME](name);
    },
  },
};
</script>

<style></style>
