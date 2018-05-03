import Vue from 'vue';
import Router from 'vue-router';
import Auth from '@/services/Auth';
import Login from '@/pages/Login';
import Registration from '@/pages/Registration';
import Dashboard from '@/pages/Dashboard';

Vue.use(Router);

const auth = new Auth();

function requireAuth(to, from, next) {
  if (!auth.isAuthenticated()) {
    next({
      path: '/',
    });
    return;
  }
  next();
}

function redirectHome(to, from, next) {
  next({ path: auth.isAuthenticated() ? '/dashboard' : 'login' });
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
    component: Dashboard,
    beforeEnter: requireAuth,
  }],
});

// https://github.com/vuejs/vue-router/tree/dev/examples
