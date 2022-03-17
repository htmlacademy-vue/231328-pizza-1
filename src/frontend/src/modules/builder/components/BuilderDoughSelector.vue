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
          :checked="item.checked"
          class="dough__input"
          :class="`dough__input--${item.value}`"
          @onChange="$emit('onChangeDough', { id: item.id, price: item.price })"
        />
      </template>
    </SheetCard>
  </div>
</template>

<script>
import SelectorItem from "@/common/components/SelectorItem";

export default {
  name: "BuilderDoughSelector",
  components: {
    SelectorItem,
  },
  props: {
    dough: {
      type: Array,
      requred: true,
    },
  },
};
</script>

<style></style>
