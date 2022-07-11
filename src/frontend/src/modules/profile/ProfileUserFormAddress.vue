<template>
  <div class="layout__address">
    <form
      class="address-form address-form--opened sheet"
      @submit.prevent="$emit('onSave', address)"
    >
      <div class="address-form__header">
        <b>{{ address.name || "Новый адрес" }}</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <AppInput
            title="Название адреса*"
            type="text"
            name="addr-name"
            placeholder="Введите название адреса"
            required
            v-model="address.name"
          />
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <AppInput
            title="Улица*"
            type="text"
            name="addr-street"
            placeholder="Введите название улицы"
            required
            v-model="address.street"
          />
        </div>
        <div class="address-form__input address-form__input--size--small">
          <AppInput
            title="Дом*"
            type="text"
            name="addr-house"
            placeholder="Введите номер дома"
            required
            v-model="address.building"
          />
        </div>
        <div class="address-form__input address-form__input--size--small">
          <AppInput
            title="Квартира"
            type="text"
            name="addr-apartment"
            placeholder="Введите № квартиры"
            v-model="address.flat"
          />
        </div>
        <div class="address-form__input">
          <AppInput
            title="Комментарий"
            type="text"
            name="addr-comment"
            placeholder="Введите комментарий"
            v-model="address.comment"
          />
        </div>
      </div>

      <div class="address-form__buttons">
        <button
          v-if="formShape !== 'create'"
          type="button"
          class="button button--transparent"
          @click="$emit('onDelete', address.id)"
        >
          Удалить
        </button>
        <button type="submit" class="button">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ProfileuserFormAddress",
  // Здесь не используем стрелочную функцию потому что
  // присваивая userId, и обращаясь к this теряется контекст –
  // мы обращаемся уже к компоненту а не к хранилищу
  data() {
    return {
      address: {
        id: null,
        name: null,
        userId: this.$store.state.Auth.user.id,
        street: null,
        building: null,
        flat: null,
        comment: null,
      },
    };
  },
  created() {
    if (this.addressToEdit) {
      this.address = Object.assign({}, this.addressToEdit);
    }
  },
  props: {
    formShape: {
      type: [String, Boolean],
      required: true,
    },
    addressToEdit: {
      type: Object,
      required: false,
    },
  },
};
</script>

<style></style>
