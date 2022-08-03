<template>
  <div class="layout__address">
    <div class="sheet address-form">
      <div class="address-form__header">
        <b>{{ address.name }}</b>
        <div class="address-form__edit">
          <button type="button" class="icon" @click="$emit('onEdit', address)">
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>
        {{ address.street }}, д. {{ address.building }}, кв. {{ address.flat }}
      </p>
      <small>{{ address.comment }}</small>
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
