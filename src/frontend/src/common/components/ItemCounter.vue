<template>
  <div class="counter counter--orange">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="value -= 1"
      :disabled="value < 1"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      :name="['counter_' + name]"
      :value="value"
      class="counter__input"
      disabled
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="value += 1"
      :disabled="value >= 3"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      reuired: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    value: 0,
  }),
  watch: {
    value: function () {
      this.$emit("getParams", {
        id: this.id,
        name: this.name,
        quantity: this.value,
        price: this.price,
      });
    },
  },
};
</script>

<style></style>
