<template>
  <div class="user">
    <picture>
      <source type="image/webp" />
      <img
        :src="user.avatar"
        :srcset="require(`@/assets/img/users/user5@2x.jpg`)"
        :alt="user.name"
        width="72"
        height="72"
        data-test="user-img"
      />
    </picture>
    <div class="user__name">
      <span data-test="user-name">{{ user.name }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span data-test="user-phone">{{ user.phone }}</span>
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ProfileUserData",
  computed: {
    ...mapState("Auth", ["user"]),
  },
};
</script>

<style></style>
