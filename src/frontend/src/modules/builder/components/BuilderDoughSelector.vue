<template>
  <div class="content__dough">
    <SheetCard>
      <template #title>Выберите тесто</template>
      <template #content>
        <SelectorItem
          v-for="item of doughs"
          :key="item.id"
          :id="item.id"
          :title="item.name"
          :description="item.description"
          :name="'dough'"
          :value="item.price"
          class="dough__input"
          :class="`dough__input--${item.value}`"
          @getParams="getDoughParams"
        />
      </template>
    </SheetCard>
  </div>
</template>

<script>
import SelectorItem from "@/common/components/SelectorItem";
import SheetCard from "@/common/components/SheetCard";

export default {
  name: "BuilderDoughSelector",
  components: {
    SheetCard,
    SelectorItem,
  },
  props: {
    doughs: {
      type: Array,
      requred: true,
    },
  },
  methods: {
    getDoughParams(params) {
      this.$emit("getDoughParams", params);
    },
  },
};
</script>

<style></style>
