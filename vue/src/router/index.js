import Vue from 'vue';
import Router from 'vue-router';
import Auth from '@/services/Auth';
import Login from '@/pages/Login/Login.vue';
import Registration from '@/pages/Registration/Registration.vue';
import Dashboard from '@/pages/Dashboard/Dashboard.vue';
import NewTransaction from '@/pages/NewTransaction/NewTransaction.vue';
import TransactionOverview from '@/pages/TransactionOverview/TransactionOverview.vue';

Vue.use(Router);

function requireAuth(to, from, next) {
  if (!Auth.isAuthenticated()) {
    next({
      path: '/',
    });
    return;
  }
  next();
}

function redirectHome(to, from, next) {
  next({ path: Auth.isAuthenticated() ? '/dashboard' : '/login' });
}

export default new Router({
  routes: [{
    path: '/',
    beforeEnter: redirectHome,
  }, {
    path: '/login',
    component: Login,
  }, {
    path: '/register',
    component: Registration,
  }, {
    path: '/dashboard',
    redirect: '/dashboard/new-transaction',
    component: Dashboard,
    beforeEnter: requireAuth,
    children: [
      {
        path: 'new-transaction',
        component: NewTransaction,
        beforeEnter: requireAuth,
      },
      {
        path: 'transaction-overview',
        component: TransactionOverview,
        beforeEnter: requireAuth,
      },
    ],
  }],
});
