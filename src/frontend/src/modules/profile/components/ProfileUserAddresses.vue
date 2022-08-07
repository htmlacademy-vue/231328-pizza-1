<template>
  <div class="layout__address">
    <div class="sheet address-form">
      <div class="address-form__header">
        <b data-test="addres-name">{{ address.name }}</b>
        <div class="address-form__edit">
          <button
            type="button"
            class="icon"
            data-test="address-edit"
            @click="$emit('onEdit', address)"
          >
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p data-test="address-location">
        {{ address.street }}, д. {{ address.building }}, кв. {{ address.flat }}
      </p>
      <small data-test="address-comment">{{ address.comment }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileUserAddresses",
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
