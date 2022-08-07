<template>
  <div class="sheet" :class="className">
    <h2 class="title title--small sheet__title">
      <slot name="title" />
    </h2>
    <div class="sheet__content dough">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AppCard",
  props: {
    className: {
      type: String,
      required: false,
    },
  },
};
</script>

<style></style>
