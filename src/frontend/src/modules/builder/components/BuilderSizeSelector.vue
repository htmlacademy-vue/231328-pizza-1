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
import SelectorItem from "@/common/components/SelectorItem";

export default {
  name: "BuilderSizeSelector",
  components: {
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
