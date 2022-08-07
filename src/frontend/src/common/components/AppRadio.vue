<template>
  <label class="radio">
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="checked"
      @change="$emit('onChange')"
    />
    <span>{{ title }}</span>
  </label>
</template>

<script>
export default {
  name: "AppRadio",
  props: {
    title: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    value: {
      type: [String, Number],
      required: true,
    },

    checked: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style></style>
