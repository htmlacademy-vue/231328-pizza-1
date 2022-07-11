<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>
        <select name="test" class="select" v-model="deleveryValue">
          <option value="1">Заберу сам</option>
          <option value="2">Новый адрес</option>
          <option value="3" v-if="isAuthUser">Дом</option>
        </select>
      </label>
      <AppInput
        title="Контактный телефон:"
        format="big"
        name="tel"
        placeholder="+7 999-999-99-99"
        :value="this.$store.state.Cart.phone"
        @input="setPhone($event)"
      />

      <div class="cart-form__address">
        <span class="cart-form__label" v-show="showAddress">Новый адрес:</span>

        <div class="cart-form__input" v-show="showAddress">
          <AppInput title="Улица*" name="street" v-model="address.street" />
        </div>

        <div
          class="cart-form__input cart-form__input--small"
          v-show="showAddress"
        >
          <AppInput title="Дом*" name="house" v-model="address.building" />
        </div>

        <div
          class="cart-form__input cart-form__input--small"
          v-show="showAddress"
        >
          <AppInput title="Квартира" name="apartment" v-model="address.flat" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { SET_PHONE, SET_ADDRESS } from "@/store/mutation-types";

const setupAddress = {
  building: "",
  comment: null,
  flat: null,
  street: "",
};

export default {
  name: "CartOrderForm",
  data: () => ({
    deleveryValue: "1",
    address: setupAddress,
  }),
  computed: {
    ...mapGetters("Auth", ["isAuthUser"]),

    showAddress() {
      return this.deleveryValue !== "1" ? true : false;
    },

    addressIsValid() {
      return Object.values(this.address).every((item) => item !== "");
    },
  },
  watch: {
    address: {
      deep: true,
      handler() {
        // Мутируем адрес в сторе если локальное состояние валидно(все поля заполнены)
        // Точно не помню, но вроде делал для того, чтобы не вешать на каждый инпут евент
        this.addressIsValid ? this[SET_ADDRESS](this.address) : "";
      },
    },
  },
  methods: {
    ...mapMutations("Cart", [SET_PHONE, SET_ADDRESS]),

    setPhone(str) {
      this[SET_PHONE](str);
    },
  },
};
</script>

<style></style>
