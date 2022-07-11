<template>
  <main class="layout">
    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">Мои данные</h1>
      </div>

      <ProfileUserData />

      <ProfileUserAddresses
        v-for="address of addresses"
        :key="address.id"
        :address="address"
        :formShape="formShape"
        @onEdit="editAddress($event)"
      />

      <ProfileUserFormAddress
        ref="ProfileUserFormAddress"
        v-if="formShape"
        @onSave="choicerAddressMethod($event)"
        @onDelete="deleteAddress($event)"
        :formShape="formShape"
        :addressToEdit="addressToEdit"
      />

      <div class="layout__button">
        <button
          v-if="!formShape"
          type="button"
          class="button button--border"
          @click="formShape = 'create'"
        >
          Добавить новый адрес
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import ProfileUserData from "@/modules/profile/ProfileUserData";
import ProfileUserAddresses from "@/modules/profile/ProfileUserAddresses";
import ProfileUserFormAddress from "@/modules/profile/ProfileUserFormAddress";

export default {
  name: "Profile",
  components: {
    ProfileUserData,
    ProfileUserAddresses,
    ProfileUserFormAddress,
  },
  data: () => ({
    formShape: false,
    addresses: null,
    addressToEdit: null,
  }),
  created() {
    this.queryAddresses();
  },
  methods: {
    choicerAddressMethod(address) {
      // Если форма в состоянии создания адреса – post-api, иначе – put-api
      // сreate когда жмем по кнопке создания, edit емитим из компоненты
      // ProfileUserFormAddress в метод editAddress()
      this.formShape === "create"
        ? this.postAddress(address)
        : this.putAddress(address);
    },

    editAddress(address) {
      // 1. Привели форму в состояние редактирования адреса
      this.formShape = "edit";
      // 2. Передали компоненте формы адрес и отобразили в инпутах
      this.addressToEdit = address;
      // 3. Плавно проскроллили к компоненте формы
      setTimeout(() => {
        this.$refs.ProfileUserFormAddress.$el.scrollIntoView({
          behavior: "smooth",
        });
      }, 0);
      // 4. Отфильтррвали редактируемый адрес из списка адресов
      this.addresses = this.addresses.filter((item) => item.id !== address.id);
    },

    async queryAddresses() {
      try {
        this.addresses = await this.$api.addresses.query();
      } catch (error) {
        console.log(error);
      }
    },

    async postAddress(address) {
      try {
        // 1. Сделали post-запрос к API
        this.$api.addresses.post(address);
        // 2. Скрыли форму
        this.formShape = false;
        // 3. Делаем get запрос к API, а не просто push(address) в хранилище компононеты,
        //    потому что новосозданный адрес при редактировании и сохранение(PUT) даст ошибку, тк
        //    id его не будет известен
        await this.queryAddresses(); // QESTION: Нежно ли здесь ждать?
      } catch (error) {
        console.log(error);
      }
    },

    async putAddress(address) {
      try {
        // 1. Сделали put-запрос к API
        this.$api.addresses.put(address);
        // 2. Скрыли форму
        this.formShape = false;
        // 3. Добавили адрес в хранилище компоненты
        this.addresses.push(address);
        // 4. Очистили в текущей компоненте редактируемый адрес передаваемый в форму
        //    Так как если после сохранения редактируемого адреса попробовать
        //    создать новый, отобразяться данные редактируемого до этого
        this.addressToEdit = null;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteAddress(id) {
      try {
        // 1. Сделали delete-запрос к API
        this.$api.addresses.delete(id);
        // 2. Скрыли форму
        this.formShape = false;
        // 2.1 Удаляемый адрес уже убран из списка адресов компоненты в editAddress()
        // 3. Очищаем редактируемый адрес,
        //    иначе при попытке создать следом новый в нем будут данные удаленного
        this.addressToEdit = null;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
