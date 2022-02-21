<template>
  <label class="radio">
    <input type="radio" :name="name" :value="value" @change="getParams" />
    <span>{{ title }}</span>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    id: {
      type: Number,
      required: false,
    },
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
