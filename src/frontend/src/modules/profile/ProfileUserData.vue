<template>
  <div class="user">
    <picture>
      <source
        type="image/webp"
        :srcset="
          require(`@/assets/img/users/user5.webp`) +
          ' 1x, ' +
          require(`@/assets/img/users/user5@2x.webp`) +
          ' 2x'
        "
      />
      <img
        :src="user.avatar"
        :srcset="require(`@/assets/img/users/user5@2x.jpg`)"
        :alt="user.name"
        width="72"
        height="72"
      />
    </picture>
    <div class="user__name">
      <span>{{ user.name }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ user.phone }}</span>
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ProfileUserData",
  computed: {
    ...mapState("Auth", ["isAuthenticated", "user"]),
  },
};
</script>

<style></style>
