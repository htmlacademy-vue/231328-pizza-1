<template>
  <div class="content__ingredients">
    <SheetCard>
      <template #title>Выберите ингредиенты</template>
      <template #content>
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            v-for="item of sauces"
            :key="item.id"
            :name="'sauce'"
            :title="item.name"
            :value="item.price"
            :id="item.id"
            class="ingredients__input"
            @getParams="getSauceParams"
          />
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="item of ingredients"
              :key="item.id"
              class="ingredients__item"
              :class="item.value"
            >
              <AppDrag
                :transfer-data="{
                  id: item.id,
                  name: item.value,
                  quantity: 1,
                  price: item.price,
                }"
              >
                <span class="filling" :class="`filling--${item.value}`">
                  {{ item.name }}
                </span>
              </AppDrag>
              <ItemCounter
                :id="item.id"
                :name="item.value"
                :price="item.price"
                :value="item.count"
                class="ingredients__counter"
                @getParams="getIngredientParams"
              />
            </li>
          </ul>
        </div>
      </template>
    </SheetCard>
  </div>
</template>

<script>
import SheetCard from "@/common/components/SheetCard";
import RadioButton from "@/common/components/RadioButton";
import ItemCounter from "@/common/components/ItemCounter";
import AppDrag from "@/common/components/AppDrag";

export default {
  name: "BuilderSizeSelector",
  components: {
    SheetCard,
    RadioButton,
    ItemCounter,
    AppDrag,
  },
  props: {
    sauces: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      requred: true,
    },
  },
  methods: {
    getSauceParams(params) {
      this.$emit("getSauceParams", params);
    },

    getIngredientParams(params) {
      this.isDraggable = params.quantity > 2 ? false : true;
      this.$emit("getIngredientParams", params);
    },

    isDraggable(count) {
      return count <= 2;
    },
  },
};
</script>

<style></style>
