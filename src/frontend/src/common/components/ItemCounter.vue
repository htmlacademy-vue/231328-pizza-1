<template>
  <div class="counter counter--orange">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="clickCounterHandler('-')"
      :disabled="count < 1"
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
      @click="clickCounterHandler('+')"
      :disabled="count >= 3"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    name: {
      type: String,
      reuired: true,
    },
    count: {
      type: Number,
      reuired: false,
    },
  },
  methods: {
    clickCounterHandler(symbol) {
      symbol === "+" ? (this.count += 1) : (this.count -= 1);
      this.$emit("onChange", this.count);
    },
  },
};
</script>

<style></style>
