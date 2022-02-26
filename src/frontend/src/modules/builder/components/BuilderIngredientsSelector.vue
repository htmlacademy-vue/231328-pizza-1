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
            :title="item.name"
            name="sauce"
            :value="item.price"
            :checked="item.checked"
            class="ingredients__input"
            @onChange="
              $emit('onChangeSauce', { id: item.id, price: item.price })
            "
          />
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="item of ingredients"
              :key="item.id"
              class="ingredients__item"
            >
              <AppDrag :transfer-data="item" :draggable="item.count < 3">
                <span class="filling" :class="`filling--${item.value}`">
                  {{ item.name }}
                </span>
              </AppDrag>
              <ItemCounter
                :name="item.value"
                :count="item.count"
                class="ingredients__counter"
                @update:count="
                  $emit('onChangeIngredient', { ...item, count: $event })
                "
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
};
</script>

<style></style>
