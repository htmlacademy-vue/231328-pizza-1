<template>
  <label>
    <input
      type="radio"
      :name="name"
      :value="value"
      class="visually-hidden"
      @change="getParams"
    />
    <b v-if="name === 'dough'">{{ title }}</b>
    <span>
      {{ description }}
      <template v-if="name === 'diameter'">{{ title }}</template>
    </span>
  </label>
</template>

<script>
export default {
  name: "SelectorItem",
  props: {
    id: {
      type: Number,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
  },
  methods: {
    getParams() {
      this.$emit("getParams", {
        id: this.id,
        title: this.title,
        name: this.name,
        value: this.value,
      });
    },
  },
};
</script>

<style></style>
