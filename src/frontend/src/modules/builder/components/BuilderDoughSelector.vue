<template>
  <div class="content__dough">
    <SheetCard>
      <template #title>Выберите тесто</template>
      <template #content>
        <SelectorItem
          v-for="item of dough"
          :key="item.id"
          :id="item.id"
          :title="item.name"
          :description="item.description"
          name="dough"
          :value="item.value"
          :checked="pizzaConstruct.doughId === item.id"
          class="dough__input"
          :class="`dough__input--${item.value}`"
          @onChange="setDough(item.id)"
        />
      </template>
    </SheetCard>
  </div>
</template>

<script>
import SelectorItem from "@/common/components/SelectorItem";
import { mapState, mapMutations } from "vuex";
import { SET_DOUGH } from "@/store/mutation-types";

export default {
  name: "BuilderDoughSelector",
  components: {
    SelectorItem,
  },
  computed: {
    ...mapState("Builder", ["dough"]),
    ...mapState(["pizzaConstruct"]),
  },
  methods: {
    ...mapMutations([SET_DOUGH]),

    setDough(id) {
      this[SET_DOUGH](id);
    },
  },
};
</script>

<style></style>
