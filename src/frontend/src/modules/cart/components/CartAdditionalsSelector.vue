<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        class="additional-list__item sheet"
        v-for="(item, index) of misc"
        :key="index"
        data-test="misc-item"
      >
        <p class="additional-list__description">
          <img :src="item.image" width="39" height="60" :alt="item.name" />
          <span data-test="misc-item-name">{{ item.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <AppCounter
            :name="item.value"
            :count="item.quantity || 0"
            :min="0"
            :max="99"
            class="cart-list__counter"
            data-test="misc-item-counter"
            @update:count="updateMisc(item, $event)"
          />

          <div class="additional-list__price">
            <b data-test="misc-item-price">× {{ item.price }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import AppCounter from "@/common/components/AppCounter";
import { mapState, mapMutations } from "vuex";
import { UPDATE_ENTITY } from "@/store/mutation-types";

export default {
  name: "CartAdditionalsSelector",
  components: {
    AppCounter,
  },
  computed: {
    ...mapState("Cart", ["misc"]),
  },
  methods: {
    ...mapMutations([UPDATE_ENTITY]),

    updateMisc(item, quantity) {
      this[UPDATE_ENTITY]({
        path: "Cart.misc",
        value: {
          ...item,
          quantity,
        },
      });
    },
  },
};
</script>

<style></style>
