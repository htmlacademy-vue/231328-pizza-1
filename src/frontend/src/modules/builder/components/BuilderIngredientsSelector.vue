<template>
  <div class="content__ingredients">
    <SheetCard>
      <template #title>Выберите ингредиенты</template>
      <template #content>
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            v-for="item of builder.sauces"
            :key="item.id"
            :title="item.name"
            name="sauce"
            :value="item.price"
            :checked="construct.sauceId === item.id"
            class="ingredients__input"
            @onChange="setSauce(item.id)"
            data-test="sauce-item"
          />
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="item of builder.ingredients"
              :key="item.id"
              class="ingredients__item"
              data-test="ingredient-item"
            >
              <AppDrag
                :transfer-data="item"
                :draggable="(getCount(item.id) || 0) < MAX_INGREDIENT_QUANTITY"
              >
                <span class="filling" :class="`filling--${item.value}`">
                  {{ item.name }}
                </span>
              </AppDrag>
              <ItemCounter
                :name="item.value"
                :count="getCount(item.id) || 0"
                :min="MIN_INGREDIENT_QUANTITY"
                :max="MAX_INGREDIENT_QUANTITY"
                class="ingredients__counter"
                @update:count="updateIngredients(item.id, $event)"
                data-test="ingredient-item-counter"
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
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
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
    ...mapState("Builder", ["builder", "construct"]),
    ...mapGetters(["getEntityById", "getAttrById"]),
  },
  methods: {
    ...mapMutations([SET_ENTITY, ADD_ENTITY, UPDATE_ENTITY, DELETE_ENTITY]),

    getCount(id) {
      return this.getEntityById("Builder.construct.ingredients#quantity", id);
    },

    setSauce(id) {
      this[SET_ENTITY]({
        path: "Builder.construct.sauceId",
        value: id,
      });
    },

    updateIngredients(id, quantity) {
      console.log("ak.emfzljseybfbou");
      if (quantity > 0) {
        if (this.getCount(id)) {
          this[UPDATE_ENTITY]({
            path: "Builder.construct.ingredients",
            value: { id, quantity },
          });
        } else {
          this[ADD_ENTITY]({
            path: "Builder.construct.ingredients",
            value: { id, quantity },
          });
        }
        return;
      }
      this[DELETE_ENTITY]({
        path: "Builder.construct.ingredients",
        id,
      });
    },
  },
};
</script>

<style></style>
