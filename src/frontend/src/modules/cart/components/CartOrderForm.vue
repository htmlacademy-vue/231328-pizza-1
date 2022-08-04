<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>
        <select
          name="test"
          class="select"
          v-model="deliveryType"
          @change="setDelivery($event)"
        >
          <option :value="false">Заберу сам</option>
          <option :value="true">Новый адрес</option>
          <option
            v-for="address of addresses"
            :key="address.id"
            :value="address.id"
          >
            {{ address.name }}
          </option>
        </select>
      </label>
      <AppInput
        title="Контактный телефон:"
        format="big"
        name="tel"
        placeholder="+7 999-999-99-99"
        v-model="phone"
      />
      <div class="cart-form__address" v-show="deliveryType">
        <span class="cart-form__label">{{
          Number.isInteger(deliveryType) ? "Доставим сюда:" : "Новый адрес:"
        }}</span>

        <div class="cart-form__input">
          <AppInput
            title="Улица*"
            name="street"
            :disabled="Number.isInteger(deliveryType)"
            v-model="street"
            @input="validateAddress()"
          />
        </div>

        <div class="cart-form__input cart-form__input--small">
          <AppInput
            title="Дом*"
            name="house"
            :disabled="Number.isInteger(deliveryType)"
            v-model="house"
            @input="validateAddress()"
          />
        </div>

        <div class="cart-form__input cart-form__input--small">
          <AppInput
            title="Квартира"
            name="apartment"
            :disabled="Number.isInteger(deliveryType)"
            v-model="apartment"
            @input="validateAddress()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { SET_ENTITY } from "@/store/mutation-types";
import { validator } from "@/common/mixins";

export default {
  name: "CartOrderForm",
  mixins: [validator],
  data() {
    return {
      deliveryType: true, // Заберу сам / Новый адрес / Доставка
      validations: {
        street: {
          error: "",
          rules: ["required"],
        },
        building: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },
  computed: {
    ...mapState("Profile", ["addresses"]),
    ...mapState("Cart", ["address"]),
    ...mapGetters(["getEntityById"]),
    ...mapGetters("Profile", ["getAddressById"]),

    phone: {
      get() {
        return this.$store.state.Cart.phone;
      },
      set(value) {
        this[SET_ENTITY]({
          path: "Cart.phone",
          value: value,
        });
      },
    },

    street: {
      get() {
        return this?.address?.street;
      },
      set(value) {
        this[SET_ENTITY]({
          path: "Cart.address.street",
          value: value,
        });
      },
    },

    house: {
      get() {
        return this?.address?.building;
      },
      set(value) {
        this[SET_ENTITY]({
          path: "Cart.address.building",
          value: value,
        });
      },
    },

    apartment: {
      get() {
        return this?.address?.flat;
      },
      set(value) {
        this[SET_ENTITY]({
          path: "Cart.address.flat",
          value: value,
        });
      },
    },
  },
  methods: {
    ...mapMutations([SET_ENTITY]),
    ...mapActions("Cart", ["setupAddress"]),

    setDelivery({ target }) {
      if (target.value == "false") {
        this[SET_ENTITY]({
          path: "Cart.isFormValid",
          value: true,
        });
        this[SET_ENTITY]({
          path: "Cart.isPickup",
          value: true,
        });
        return;
      }

      this[SET_ENTITY]({
        path: "Cart.isPickup",
        value: false,
      });

      if (this.getEntityById("Profile.addresses", target.value)) {
        this[SET_ENTITY]({
          path: "Cart.address",
          value: this.getEntityById("Profile.addresses", target.value),
        });
        this[SET_ENTITY]({
          path: "Cart.isFormValid",
          value: true,
        });
        return;
      }

      this[SET_ENTITY]({
        path: "Cart.isFormValid",
        value: false,
      });

      this.setupAddress();
    },

    validateAddress() {
      if (
        !this.$validateFields(
          { street: this.address.street, building: this.address.building },
          this.validations
        ) &&
        this.deliveryType
      ) {
        this[SET_ENTITY]({
          path: "Cart.isFormValid",
          value: false,
        });
        return;
      }

      this[SET_ENTITY]({
        path: "Cart.isFormValid",
        value: true,
      });
    },
  },
};
</script>

<style>
.cart-form {
  padding-bottom: 20px;
}

.cart-form__address {
  margin-bottom: -20px;
}
</style>
