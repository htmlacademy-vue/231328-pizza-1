<template>
  <div class="content__dough">
    <AppCard>
      <template #title>Выберите тесто</template>
      <template #content>
        <AppSelector
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
          data-test="dough-item"
          @onChange="setDough(item.id)"
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
  name: "BuilderDoughSelector",
  components: {
    AppSelector,
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
