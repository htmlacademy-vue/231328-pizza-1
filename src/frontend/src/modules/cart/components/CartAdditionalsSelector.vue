<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        class="additional-list__item sheet"
        v-for="(item, index) of misc"
        :key="index"
      >
        <p class="additional-list__description">
          <img :src="item.image" width="39" height="60" :alt="item.name" />
          <span>{{ item.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <ItemCounter
            :name="item.value"
            :count="item.quantity || 0"
            :min="0"
            :max="99"
            class="cart-list__counter"
            @update:count="updateMisc(item.miscId, $event)"
          />

          <div class="additional-list__price">
            <b>× {{ item.price }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import { mapState, mapMutations } from "vuex";
import { UPDATE_MISC } from "@/store/mutation-types";

export default {
  name: "CartAdditionalsSelector",
  components: {
    ItemCounter,
  },
  computed: {
    ...mapState("Cart", ["misc"]),
  },
  methods: {
    ...mapMutations("Cart", [UPDATE_MISC]),
    updateMisc(id, count) {
      this[UPDATE_MISC]({ id: id, count: count });
    },
  },
};
</script>

<style></style>
