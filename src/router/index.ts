import { createRouter, createWebHistory } from "vue-router";
import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/auth/LoginView.vue'
import { useAuth } from '@/stores/auth';

import { usePermissionsStore } from '@/stores/permissions'

const requireAuth = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const { token, user } = useAuth();
  if (token && user) {
    next();
  } else {
    next("/login");
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/",
      name: "home",
      component: AboutView,
      meta: { requireAuth: true },
      beforeEnter: requireAuth
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { token, user } = useAuth();

  try {
    const hasPermissionTo = usePermissionsStore().hasPermissionTo;

    // Equipo
    if (to.path === "/equipo" && hasPermissionTo(['users']) == false) {
      next('/error');
      return;
    }

    // Roles
    if (to.path === "/role" && hasPermissionTo(['roles']) == false) {
      next('/error');
      return;
    }

  }
  catch (err) {
    // console.log(err);
  }

  if (to.path === "/login") {
    next();
  } else if (to.meta.requireAuth && (!token || !user)) {
    next("/login");
  } else {
    next();
  }

});
export default router
