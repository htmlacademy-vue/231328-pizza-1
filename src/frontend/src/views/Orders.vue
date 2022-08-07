<template>
  <main class="layout">
    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>

      <section v-for="order of orders" :key="order.id" class="sheet order">
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ #{{ order.id }}</b>
          </div>

          <div class="order__sum">
            <span
              >Сумма заказа:
              {{ getTotalPrice(order.orderPizzas, order.orderMisc) }}
              ₽</span
            >
          </div>

          <div class="order__button">
            <button
              type="button"
              class="button button--border"
              @click="orderDelete(order.id)"
            >
              Удалить
            </button>
          </div>
          <div class="order__button">
            <button type="button" class="button" @click="orderRepeat(order)">
              Повторить
            </button>
          </div>
        </div>

        <ul class="order__list">
          <li
            class="order__item"
            v-for="pizza of order.orderPizzas"
            :key="pizza.id"
          >
            <div class="product">
              <img
                src="@/assets/img/product.svg"
                class="product__img"
                width="56"
                height="56"
                alt="Капричоза"
              />
              <div class="product__text">
                <h2>{{ pizza.name }}</h2>
                <ul>
                  <li>
                    {{
                      getEntityById("Builder.builder.sizes#name", pizza.sizeId)
                    }},
                    {{
                      getEntityById(
                        "Builder.builder.dough#connotation",
                        pizza.doughId
                      )
                    }}
                  </li>
                  <li>
                    Соус:
                    {{
                      getEntityById(
                        "Builder.builder.sauces#name",
                        pizza.sauceId
                      )
                    }}
                  </li>
                  <li>Начинка: {{ getIngredientsList(pizza.ingredients) }}</li>
                </ul>
              </div>
            </div>

            <p class="order__price">{{ getPizzaPrice(pizza) }} ₽</p>
          </li>
        </ul>

        <ul class="order__additional">
          <li v-for="misc of order.orderMisc" :key="misc.miscId">
            <img
              :src="
                require(`@/assets/img/${getEntityById(
                  'Cart.misc#value',
                  misc.miscId
                )}.svg`)
              "
              width="20"
              height="30"
              :alt="getEntityById('Cart.misc#name', misc.miscId)"
            />
            <p>
              <span>{{ getEntityById("Cart.misc#name", misc.miscId) }}</span>
              <b>
                {{ misc.quantity }} x
                {{ getEntityById("Cart.misc#price", misc.miscId) }} ₽
              </b>
            </p>
          </li>
        </ul>

        <p class="order__address">
          {{ getOrderAddress(order.orderAddress) }}
        </p>
      </section>
    </div>
  </main>
</template>

<script>
import router from "@/router";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { SET_ENTITY } from "@/store/mutation-types";
export default {
  name: "Orders",
  computed: {
    ...mapState("Orders", ["orders"]),
    ...mapGetters(["getEntityById"]),
    ...mapGetters("Builder", ["getPizzaPrice"]),
    ...mapGetters("Cart", ["getPizzasPrice", "getIngredientsList"]),
  },
  methods: {
    ...mapMutations([SET_ENTITY]),
    ...mapActions("Orders", {
      orderDelete: "delete",
    }),

    getTotalPrice(pizzas, misc) {
      let arr = 0;
      if (misc) {
        arr = misc.reduce((acc, curr) => {
          return (
            acc +
            this.getEntityById("Cart.misc#price", curr.miscId) * curr.quantity
          );
        }, 0);
      }
      return this.getPizzasPrice(pizzas) + arr;
    },

    orderRepeat(order) {
      this[SET_ENTITY]({
        path: "Cart.pizzas",
        value: order.orderPizzas,
      });
      this[SET_ENTITY]({
        path: "Cart.address",
        value: order.orderAddress,
      });
      router.push("/cart");
    },

    getOrderAddress(address) {
      if (address) return `Адрес доставки: ${address.name}`;
      return "Забрали сами";
    },
  },
};
</script>

<style></style>
