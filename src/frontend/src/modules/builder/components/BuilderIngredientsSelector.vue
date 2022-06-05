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
            :checked="pizzaConstruct.sauceId === item.id"
            class="ingredients__input"
            @onChange="setSauce(item.id)"
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
              <AppDrag
                :transfer-data="item"
                :draggable="
                  getIngredientQuantityById(item.id) < MAX_INGREDIENT_QUANTITY
                "
              >
                <span class="filling" :class="`filling--${item.value}`">
                  {{ item.name }}
                </span>
              </AppDrag>
              <ItemCounter
                :name="item.value"
                :count="getIngredientQuantityById(item.id)"
                :min="MIN_INGREDIENT_QUANTITY"
                :max="MAX_INGREDIENT_QUANTITY"
                class="ingredients__counter"
                @update:count="updateIngredients(item.id, $event)"
              />
            </li>
          </ul>
        </div>
      </template>
    </SheetCard>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import ItemCounter from "@/common/components/ItemCounter";
import AppDrag from "@/common/components/AppDrag";
import {
  MIN_INGREDIENT_QUANTITY,
  MAX_INGREDIENT_QUANTITY,
} from "@/common/constants";
import { mapState, mapMutations, mapGetters } from "vuex";
import {
  SET_SAUCE,
  SET_INGREDIENT,
  UPDATE_INGREDIENT,
  DELETE_INGREDIENT,
} from "@/store/mutation-types";

export default {
  name: "BuilderSizeSelector",
  components: {
    RadioButton,
    ItemCounter,
    AppDrag,
  },
  data: () => ({
    MIN_INGREDIENT_QUANTITY,
    MAX_INGREDIENT_QUANTITY,
  }),
  computed: {
    ...mapState("Builder", ["sauces", "ingredients"]),
    ...mapState(["pizzaConstruct"]),

    ...mapGetters(["getIngredientQuantityById"]),
  },
  methods: {
    ...mapMutations([
      SET_SAUCE,
      SET_INGREDIENT,
      UPDATE_INGREDIENT,
      DELETE_INGREDIENT,
    ]),

    setSauce(id) {
      this[SET_SAUCE](id);
    },

    updateIngredients(id, count) {
      if (count > 0) {
        this.getIngredientQuantityById(id)
          ? this[UPDATE_INGREDIENT]({ id: id, count: count })
          : this[SET_INGREDIENT](id);
        return;
      }
      this[DELETE_INGREDIENT](id);
    },
  },
};
</script>

<style></style>
