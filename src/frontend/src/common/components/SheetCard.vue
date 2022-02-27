<template>
  <div class="sheet">
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
  name: "SheetCard",
};
</script>

<style></style>
