<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big" @click="tlt()">Конструктор пиццы</h1>

        <BuilderDoughSelector />

        <BuilderSizeSelector />

        <BuilderIngredientsSelector />
        <div class="content__pizza">
          <AppInput
            name="pizza_name"
            placeholder="Введите название пиццы"
            v-model="pizzaName"
          />

          <BuilderPizzaView />

          <BuilderPriceCounter />
        </div>
      </div>
    </form>
    <router-view />
  </main>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { mapGetters, mapMutations, mapState } from "vuex";
import { SET_ENTITY } from "@/store/mutation-types";

export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  data: () => ({}),
  computed: {
    ...mapState("Builder", ["construct"]),
    ...mapGetters(["getEntity", "getEntityById"]),

    // Вызов мутации с v-model
    // TODO: Чекнуть на решение получше, разобрать логику работы
    getName() {
      return this.$store.state.Builder.construct.name;
    },
    pizzaName: {
      get() {
        return this.construct.name;
      },
      set(name) {
        this[SET_ENTITY]({
          path: "Builder.construct.name",
          value: name,
        });
      },
    },
  },
  methods: {
    ...mapMutations([SET_ENTITY]),
  },
};
</script>

<style></style>
