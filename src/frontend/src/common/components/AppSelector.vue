<template>
  <label>
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="checked"
      class="visually-hidden"
      @change="$emit('onChange')"
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
  name: "AppSelector",
  props: {
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

    checked: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style></style>
