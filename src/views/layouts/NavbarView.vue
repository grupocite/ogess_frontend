<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth'
import { useNavTitle } from '@/stores/navtitle'
import { usePermissionsStore } from '@/stores/permissions'

export default defineComponent({
  setup() {
    const hasPermissionTo = usePermissionsStore().hasPermissionTo
    const { user } = useAuth()
    const router = useRouter()
    const useTitle = useNavTitle()

    const handleLogout = () => {
      useAuth().logout()
      router.push('/login')
    }

    const handleModuleSelect = (name: string) => {
      useTitle.updateTitle(name)
    }

    onMounted(async () => {})
    return {
      user,
      handleLogout,
      handleModuleSelect,
      useTitle,

      hasPermissionTo
    }
  }
})
</script>

<template>
  <div class="nk-header nk-header-fixed is-light">
    <div class="container-fluid">
      <div class="nk-header-wrap">
        <div class="nk-header-app-name">
          <div class="nk-header-app-info">
            <a href="javascript:void(0)" class="nk-menu-link p-0">
              <span class="nk-menu-text">{{ useTitle.title }}</span>
            </a>
          </div>
        </div>
        <div class="nk-header-tools">
          <ul class="nk-quick-nav">
            <li class="dropdown d-lg-none">
              <a href="#" class="dropdown-toggle nk-quick-nav-icon" data-bs-toggle="dropdown">
                <div class="icon-status icon-status-na">
                  <em class="icon ni ni-menu-circled"></em>
                </div>
              </a>

              <div class="dropdown-menu dropdown-menu-lg">
                <RouterLink
                  v-if="hasPermissionTo(['dashboard'])"
                  to="/"
                  class="dropdown-item d-flex align-items-center justify-content-between"
                  :class="{ active: $route.path === '/' }"
                  @click="handleModuleSelect('Visión general')"
                >
                  <div class="col-4">
                    <span class="list-apps-media">
                      <i class="icon ni ni-home icon-side" />
                    </span>
                  </div>
                  <div class="col-8">
                    <span class="list-apps-title">Inicio</span>
                  </div>
                </RouterLink>
                <RouterLink
                  to="/desktop"
                  class="dropdown-item d-flex align-items-center justify-content-between"
                  :class="{ active: $route.path === '/desktop' }"
                  @click="handleModuleSelect('Informes')"
                  title="Informes"
                >
                  <div class="col-4">
                    <span class="list-apps-media">
                      <i class="icon ni ni-file-text icon-side" />
                    </span>
                  </div>
                  <div class="col-8 text-left">
                    <span class="list-apps-title">Informes</span>
                  </div>
                </RouterLink>
                <RouterLink
                  v-if="hasPermissionTo(['reports'])"
                  to="/mantenimiento"
                  class="dropdown-item d-flex align-items-center justify-content-between"
                  :class="{ active: $route.path === '/mantenimiento' }"
                  @click="handleModuleSelect('Mantenimiento')"
                  title="Mantenimiento"
                >
                  <div class="col-4">
                    <span class="list-apps-media">
                      <i class="icon ni ni-brick-fill" />
                    </span>
                  </div>
                  <div class="col-8 text-le ft">
                    <span class="list-apps-title">Mantenimiento</span>
                  </div>
                </RouterLink>
                <RouterLink
                  v-if="hasPermissionTo(['permissions'])"
                  to="/role"
                  class="dropdown-item d-flex align-items-center justify-content-between"
                  :class="{ active: $route.path === '/role' }"
                  @click="handleModuleSelect('Roles y permisos')"
                  title="Roles y Permisos"
                >
                  <div class="col-4">
                    <span class="list-apps-media">
                      <i class="icon ni ni-security" />
                    </span>
                  </div>
                  <div class="col-8 text-le ft">
                    <span class="list-apps-title">Roles y Permisos </span>
                  </div>
                </RouterLink>
                <RouterLink
                  v-if="hasPermissionTo(['users'])"
                  to="/equipo"
                  class="dropdown-item d-flex align-items-center justify-content-between"
                  :class="{ active: $route.path === '/equipo' }"
                  @click="handleModuleSelect('Equipo')"
                  title="Equipo"
                >
                  <div class="col-4">
                    <span class="list-apps-media">
                      <i class="icon ni ni-users" />
                    </span>
                  </div>
                  <div class="col-8 text-le ft">
                    <span class="list-apps-title">Equipo</span>
                  </div>
                </RouterLink>
              </div>
            </li>
            <strong>{{ user.email }}</strong>
            <li class="dropdown user-dropdown">
              <a href="#" class="dropdown-toggle me-n1" data-bs-toggle="dropdown">
                <div class="user-toggle">
                  <div class="user-avatar sm icon-general">
                    <em class="icon ni ni-user-alt"></em>
                  </div>
                </div>
              </a>

              <div class="dropdown-menu dropdown-menu-md dropdown-menu-end">
                <div class="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                  <div class="user-card">
                    <div class="user-avatar icon-general"><span>JC</span></div>
                    <div class="user-info">
                      <span class="lead-text">{{ user.name }}</span
                      ><span class="sub-text">{{ user.email }}</span>
                    </div>
                  </div>
                </div>

                <div class="dropdown-inner">
                  <ul class="link-list">
                    <li>
                      <a href="javascript:void(0);" @click="handleLogout"
                        ><em class="icon ni ni-signout"></em><span>Salir</span></a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 992px) {
  .nk-apps-sidebar + .nk-main > .nk-wrap > .nk-header-fixed {
    left: 60px;
  }
}

.recordatorio-text {
  font-weight: bold;
}

.agendado-text {
  font-weight: bold;
}
</style>