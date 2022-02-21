<template>
  <div class="content__result">
    <p>Итого: {{ total }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="!isValid"
      @click="$emit('addToCart', total)"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
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
};
</script>

<style></style>
