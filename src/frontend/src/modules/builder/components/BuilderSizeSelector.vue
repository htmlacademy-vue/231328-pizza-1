<template>
  <div class="content__diameter">
    <SheetCard>
      <template #title>Выберите размер</template>
      <template #content>
        <SelectorItem
          v-for="item of builder.sizes"
          :key="item.id"
          :title="item.name"
          name="diameter"
          :value="item.value"
          :checked="construct.sizeId === item.id"
          class="diameter__input"
          :class="`diameter__input--${item.value}`"
          data-test="size-item"
          @onChange="setSize(item.id)"
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
  name: "BuilderSizeSelector",
  components: {
    SelectorItem,
  },
  computed: {
    ...mapState("Builder", ["builder", "construct"]),
  },
  methods: {
    ...mapMutations([SET_ENTITY]),

    setSize(id) {
      console.log();
      this[SET_ENTITY]({
        path: "Builder.construct.sizeId",
        value: id,
      });
    },
  },
};
</script>

<style></style>
