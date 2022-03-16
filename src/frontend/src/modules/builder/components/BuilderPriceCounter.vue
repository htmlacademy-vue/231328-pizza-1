<template>
  <div class="content__result">
    <p>Итого: {{ total }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="!isValid"
      @click="emitMethod"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import EventBus from "@/common/eventBus";

export default {
  name: "BuilderPriceCounter",
  props: {
    total: {
      type: Number,
      required: true,
    },
    isValid: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    emitMethod() {
      EventBus.$emit("emitFromChild", this.total);
    },
  },
};
</script>

<style></style>
