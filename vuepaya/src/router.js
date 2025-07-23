import { createRouter, createWebHistory } from 'vue-router';
import NFTList from './pages/nft/NFTList.vue';
import store from './store/store.js';

const NotFound = () =>
  import('./pages/NotFound.vue');
const NFTDetail = () =>
  import('./pages/nft/NFTDetail.vue');
const NFTRegistration = () =>
  import('./pages/nft/NFTRegistration.vue');
const UserAuth = () =>
  import('./pages/auth/UserAuth.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/nft-list' },
    { path: '/nft-list', component: NFTList},
    {
      path: '/nft-list/:id',
      component: NFTDetail,
      props: true,
    },
    { path: '/register', component: NFTRegistration , meta: { requiresAuth: true }},
    { path: '/auth' , component:UserAuth, meta: { requiresUnauth: true }},
    { path: '/:catchAll(.*)', component: NotFound },
    { path:'/not-found' , component:NotFound}
  ],
});
router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters['auth/isAuthenticated']) {
    next('/nft-list');
  } else {
    next();
  }
});
export default router;
