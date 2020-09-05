import Vue from 'vue';
import VueRouter from 'vue-router';
import homePage from '@/pages/homePage';
import loginPage from '@/pages/loginPage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: homePage,
  },
  {
    path: '/login',
    name: 'loginPage',
    component: loginPage,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
