<template>
  <div class="content__diameter">
    <SheetCard>
      <template #title>Выберите размер</template>
      <template #content>
        <SelectorItem
          v-for="item of sizes"
          :key="item.id"
          :title="item.name"
          name="diameter"
          :value="item.value"
          :checked="pizzaConstruct.sizeId === item.id"
          class="diameter__input"
          :class="`diameter__input--${item.value}`"
          @onChange="setSize(item.id)"
        />
      </template>
    </SheetCard>
  </div>
</template>

<script>
import SelectorItem from "@/common/components/SelectorItem";
import { mapState, mapMutations } from "vuex";
import { SET_SIZE } from "@/store/mutation-types";

export default {
  name: "BuilderSizeSelector",
  components: {
    SelectorItem,
  },
  computed: {
    ...mapState("Builder", ["sizes"]),
    ...mapState(["pizzaConstruct"]),
  },
  methods: {
    ...mapMutations([SET_SIZE]),

    setSize(id) {
      this[SET_SIZE](id);
    },
  },
};
</script>

<style></style>
