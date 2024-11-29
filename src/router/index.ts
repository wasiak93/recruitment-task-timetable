import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import BusLinesView from "../views/BusLinesView.vue";
import StopsView from "../views/StopsView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: BusLinesView,
  },
  {
    path: "/stops",
    name: "Stops",
    component: StopsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
