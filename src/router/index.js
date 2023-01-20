import { createRouter, createWebHistory } from "vue-router";
import Game3x3 from "../components/Game3x3.vue";
import Game4x4 from "../components/Game4x4.vue";

const router = createRouter({
 history: createWebHistory(import.meta.env.BASE_URL),
 routes: [
  {
   path: "/",
   name: "Game3x3",
   component: Game3x3,
  },
  {
   path: "/game4x4",
   name: "Game4x4",
   component: Game4x4,
  },
 ],
});

export default router;
