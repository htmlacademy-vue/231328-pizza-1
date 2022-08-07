import { auth, isLoggedIn } from "@/middlewares";

export default [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/Index.vue"),
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
        meta: {
          middlewares: [isLoggedIn],
        },
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart.vue"),
    children: [
      {
        path: "/success",
        name: "Success",
        component: () => import("@/views/Success.vue"),
      },
    ],
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/views/Orders.vue"),
    meta: {
      layout: "AppLayoutProfile",
      middlewares: [auth],
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
    meta: {
      layout: "AppLayoutProfile",
      middlewares: [auth],
    },
  },
];
