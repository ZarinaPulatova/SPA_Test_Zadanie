import { createRouter, createWebHistory } from 'vue-router';
import Sales from '../components/Sales.vue';

const routes = [
  {
    path: '/sales',
    name: 'Sales',
    component: Sales,
  },
  // Другие маршруты...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
