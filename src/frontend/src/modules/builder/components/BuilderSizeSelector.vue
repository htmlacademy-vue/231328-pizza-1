<template>
  <div class="content__diameter">
    <AppCard>
      <template #title>Выберите размер</template>
      <template #content>
        <AppSelector
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
    </AppCard>
  </div>
</template>

<script>
import AppSelector from "@/common/components/AppSelector";
import { mapState, mapMutations } from "vuex";
import { SET_ENTITY } from "@/store/mutation-types";

export default {
  name: "BuilderSizeSelector",
  components: {
    AppSelector,
  },
  computed: {
    ...mapState("Builder", ["builder", "construct"]),
  },
  methods: {
    ...mapMutations([SET_ENTITY]),

    setSize(id) {
      this[SET_ENTITY]({
        path: "Builder.construct.sizeId",
        value: id,
      });
    },
  },
};
</script>

<style></style>
