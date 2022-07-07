<template>
  <div class="layout__address">
    <div class="sheet address-form">
      <div class="address-form__header">
        <b>{{ content.name }}</b>
        <div class="address-form__edit">
          <button
            type="button"
            class="icon"
            @click="$emit('onEdit', content)"
            :disabled="formShape"
          >
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>
        {{ content.street }}, д. {{ content.building }}, кв. {{ content.flat }}
      </p>
      <small>{{ content.comment }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileUserAddresses",
  props: {
    content: {
      type: Object,
      required: true,
    },
    // Если форма уже открыта, отрубвем кнопку редактирования
    formShape: {
      type: [String, Boolean],
      required: true,
    },
  },
};
</script>

<style></style>
