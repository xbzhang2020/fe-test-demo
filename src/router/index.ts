import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../pages/todos/Todos.vue"),
  },
  {
    path: "/404",
    component: () => import("../pages/404/NotFound.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
