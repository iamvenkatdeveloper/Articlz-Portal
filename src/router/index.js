import Vue from "vue";
import VueRouter from "vue-router";

import MainLandingPage from "../views/MainHomePages/MainLandingPage.vue";
import UserLandingPage from "../views/MainHomePages/UserLandingPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "MainLandingPage",
    component: MainLandingPage,
  },
  {
    path: "/LandingPage",
    name: "LandingPage",
    component: UserLandingPage,
    children: [
      {
        path: "/Articles",
        name: "Articles",
        component: () => import("@/views/ChildHomePages/Articles.vue"),
      },
      {
        path: "/Favorites",
        name: "Favorites",
        component: () => import("@/views/ChildHomePages/Favorites.vue"),
      },
      {
        path: "/Publish",
        name: "Publish",
        component: () => import("@/views/ChildHomePages/Publish.vue"),
      },
    ],
  },
  {
    path: "/View",
    name: "View",
    component: () => import("@/views/ChildHomePages/ViewArticles.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
