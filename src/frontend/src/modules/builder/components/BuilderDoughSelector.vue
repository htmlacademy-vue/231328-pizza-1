<template>
  <div class="content__dough">
    <SheetCard>
      <template #title>Выберите тесто</template>
      <template #content>
        <SelectorItem
          v-for="item of builder.dough"
          :key="item.id"
          :id="item.id"
          :title="item.name"
          :description="item.description"
          name="dough"
          :value="item.value"
          :checked="construct.doughId === item.id"
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
import { SET_ENTITY } from "@/store/mutation-types";

export default {
  name: "BuilderDoughSelector",
  components: {
    SelectorItem,
  },
  computed: {
    ...mapState("Builder", ["builder", "construct"]),
  },
  methods: {
    ...mapMutations([SET_ENTITY]),

    setDough(id) {
      this[SET_ENTITY]({
        path: "Builder.construct.doughId",
        value: id,
      });
    },
  },
};
</script>

<style></style>
