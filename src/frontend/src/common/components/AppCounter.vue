<template>
  <div class="counter counter--orange">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="$emit('update:count', count - 1)"
      :disabled="count <= min"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      :name="['counter_' + name]"
      :value="count"
      class="counter__input"
      disabled
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="$emit('update:count', count + 1)"
      :disabled="count >= max"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "AppCounter",
  props: {
    name: {
      type: String,
      reuired: true,
    },

    count: {
      type: Number,
      reuired: false,
    },

    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: 99,
    },
  },
};
</script>

<style></style>
