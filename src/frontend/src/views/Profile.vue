<template>
  <main class="layout">
    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">Мои данные</h1>
      </div>

      <ProfileUserData />

      <ProfileUserAddresses
        v-show="formType == false"
        v-for="address of addresses"
        :key="address.id"
        :address="address"
        @onEdit="editAddress($event)"
      />

      <ProfileUserFormAddress
        ref="ProfileUserFormAddress"
        v-if="formType"
        @onSave="saveAddress($event)"
        @onDelete="deleteAddress($event)"
        :formType="formType"
        :addressToEdit="addressToEdit"
      />

      <div class="layout__button">
        <button
          v-if="!formType"
          type="button"
          class="button button--border"
          @click="formType = 'post'"
        >
          Добавить новый адрес
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import ProfileUserData from "@/modules/profile/components/ProfileUserData";
import ProfileUserAddresses from "@/modules/profile/components/ProfileUserAddresses";
import ProfileUserFormAddress from "@/modules/profile/components/ProfileUserFormAddress";

import { mapActions, mapState } from "vuex";

export default {
  name: "Profile",
  components: {
    ProfileUserData,
    ProfileUserAddresses,
    ProfileUserFormAddress,
  },
  data: () => ({
    formType: false,
    addressToEdit: null,
  }),
  computed: {
    ...mapState("Profile", ["addresses"]),
  },
  methods: {
    ...mapActions("Profile", {
      addressPost: "post",
      addressPut: "put",
      addressDelete: "delete",
    }),

    editAddress(address) {
      // 1. Привели форму в состояние обновление адреса
      this.formType = "put";
      // 2. Передали компоненте формы адрес и отобразили в инпутах
      this.addressToEdit = address;
      // 3. Плавно проскроллили к компоненте формы
      setTimeout(() => {
        this.$refs.ProfileUserFormAddress.$el.scrollIntoView({
          behavior: "smooth",
        });
      }, 0);
    },

    saveAddress(address) {
      // Если форма в состоянии создания адреса – post-запрос, иначе – put-запрос
      // formType=post когда жмем по кнопке создания, put емитим из компоненты
      this.formType === "post"
        ? this.addressPost(address)
        : this.addressPut(address);
      this.formType = false;
      this.addressToEdit = null;
    },

    deleteAddress(id) {
      this.addressDelete(id);
      this.formType = false;
      this.addressToEdit = null;
    },
  },
};
</script>

<style></style>
