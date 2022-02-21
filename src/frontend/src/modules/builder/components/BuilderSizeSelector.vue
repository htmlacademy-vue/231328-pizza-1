<template>
  <div class="content__diameter">
    <SheetCard>
      <template #title>Выберите тесто</template>
      <template #content>
        <SelectorItem
          v-for="item of data"
          :key="item.id"
          :title="item.name"
          :name="'diameter'"
          :value="item.multiplier"
          :id="item.id"
          class="diameter__input"
          :class="`diameter__input--${item.value}`"
          @getParams="getSizeParams"
        />
      </template>
    </SheetCard>
  </div>
</template>

<script>
import SelectorItem from "@/common/components/SelectorItem";
import SheetCard from "@/common/components/SheetCard";

export default {
  name: "BuilderSizeSelector",
  components: {
    SheetCard,
    SelectorItem,
  },
  props: {
    data: {
      type: Array,
      requred: true,
    },
  },
  methods: {
    getSizeParams(params) {
      this.$emit("getSizeParams", params);
    },
  },
};
</script>

<style></style>
