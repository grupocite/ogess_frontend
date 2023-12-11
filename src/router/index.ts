import { createRouter, createWebHistory } from "vue-router";
import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import AboutView from '../views/AboutView.vue';
import LoginView from '../views/auth/LoginView.vue';
import RoleView from "../views/role/RoleView.vue";
import EditRoleView2 from "../views/role/EditRoleView2.vue"
import ErrorPage from "@/views/error/Error.vue";
import DesktopView from "@/views/init/InitView.vue";
import DashBoardView from "@/views/dashboard/DashboardView.vue";
import EditFichaTecnica from "@/views/dashboard/EditFichaTecnica.vue";
import DesktopView2 from '@/views/desktop/DesktopView2.vue';
import ManteninientoView from '@/views/maintenance/ManteninientoView.vue';

import { useAuth } from '@/stores/auth';
import EquipoView from '@/views/equipo/EquipoView.vue';

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
    {
      path: '/ficha/:uuid', // Define el parámetro dinámico ':uuid'
      name: 'ficha',
      component: DashBoardView,
      meta: { requireAuth: true },
      beforeEnter: requireAuth
    },
    {
      path: '/editar-censo/:id', 
      component: EditFichaTecnica,
      meta: { requireAuth: true },
      beforeEnter: requireAuth
    },
    {
      path: '/desktop',
      name: 'desktop',
      component: DesktopView,
      meta: { requireAuth: true },
      beforeEnter: requireAuth
    },
    {
      path: '/mantenimiento',
      name: 'mantenimiento',
      component: ManteninientoView,
      meta: { requireAuth: true },
      beforeEnter: requireAuth
    },
    {
      path: '/desktop2',
      name: 'desktop2',
      component: DesktopView2,
      meta: { requireAuth: true },
      beforeEnter: requireAuth
    },

    {
      path: '/equipo',
      name: 'equipo',
      component: EquipoView,
      meta: { requireAuth: true },
      beforeEnter: requireAuth
    },

    {
      path: '/role',
      name: 'role',
      component: RoleView,
      meta: { requireAuth: true },
      beforeEnter: requireAuth
    },
    {
      path: '/edit-role/:id', 
      component: EditRoleView2,
      meta: { requireAuth: true },
      beforeEnter: requireAuth
    },
    {
      path: '/error/', 
      component: ErrorPage,
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

        // Equipo
        if (to.path === "/" && hasPermissionTo(['dashboard']) == false) {
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
