<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>
        <template v-if="isEmpty">
          <CartPizzasList />
          <CartAdditionalsSelector />
          <CartOrderForm />
        </template>
        <div v-else class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>
      </div>
    </main>
    <section v-if="isEmpty" class="footer">
      <div class="footer__more">
        <router-link class="button button--border button--arrow" to="/">
          Хочу еще одну
        </router-link>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ totalPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="button" class="button" @click="submitOrder()">
          Оформить заказ
        </button>
      </div>
    </section>
  </form>
</template>

<script>
import CartAdditionalsSelector from "@/modules/cart/components/CartAdditionalsSelector";
import CartOrderForm from "@/modules/cart/components/CartOrderForm";
import CartPizzasList from "@/modules/cart/components/CartPizzasList";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Cart",
  components: {
    CartAdditionalsSelector,
    CartOrderForm,
    CartPizzasList,
  },
  computed: {
    ...mapGetters("Cart", ["isEmpty", "totalPrice"]),
  },
  methods: {
    ...mapActions("Cart", {
      submitOrder: "submitOrder",
    }),
  },
};
</script>

<style></style>
