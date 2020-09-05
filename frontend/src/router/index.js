import Vue from 'vue';
import VueRouter from 'vue-router';
import homePage from '@/pages/homePage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: homePage,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
