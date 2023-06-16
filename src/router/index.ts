import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "ViewHome",
    component: Home,
  },
  {
    path: "/about",
    name: "ViewAbout",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/user",
    component: () => import(/* webpackChunkName: "user" */ "@/views/User.vue"),
  },
  {
    path: "/docx",
    component: () => import("@/views/Docx.vue"),
  },
];

if (process.env.NODE_ENV === "development") {
  routes.push({
    path: "/icons",
    name: "ViewIcon",
    component: () => import("@/views/Icon.vue"),
  });
}

const router = new VueRouter({
  routes,
});

export default router;
