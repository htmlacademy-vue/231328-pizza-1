<template>
  <div class="content__diameter">
    <SheetCard>
      <template #title>Выберите тесто</template>
      <template #content>
        <SelectorItem
          v-for="item of sizes"
          :key="item.id"
          :title="item.name"
          name="diameter"
          :value="item.value"
          :checked="item.checked"
          class="diameter__input"
          :class="`diameter__input--${item.value}`"
          @onChange="
            $emit('onChangeSizes', { id: item.id, multiplier: item.multiplier })
          "
        />
      </template>
    </SheetCard>
  </div>
</template>

<script>
import SheetCard from "@/common/components/SheetCard";
import SelectorItem from "@/common/components/SelectorItem";

export default {
  name: "BuilderSizeSelector",
  components: {
    SheetCard,
    SelectorItem,
  },
  props: {
    sizes: {
      type: Array,
      requred: true,
    },
  },
};
</script>

<style></style>
