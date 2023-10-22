<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/stores/auth";
import { useNavTitle } from "@/stores/navtitle";
import { usePermissionsStore } from "@/stores/permissions";

export default defineComponent({
  setup() {
    const hasPermissionTo = usePermissionsStore().hasPermissionTo;
    const { user } = useAuth();
    const router = useRouter();
    const useTitle = useNavTitle();

    const handleLogout = () => {
      useAuth().logout();
      router.push("/login");
    };

    const handleModuleSelect = (name: string) => {
      useTitle.updateTitle(name);
    };

    onMounted(async () => {
    
    });
    return {
      user,
      handleLogout,
      handleModuleSelect,
      useTitle,

      hasPermissionTo,
    };
  },
});
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
            <li class="dropdown notification-dropdown">
              <a
                href="#"
                class="dropdown-toggle nk-quick-nav-icon"
                data-bs-toggle="dropdown"
              >
                <div
                  class="icon-status"
                
                >
                  <em class="icon ni ni-bell"></em>
                </div>
              </a>
              <div class="dropdown-menu dropdown-menu-xl dropdown-menu-end">
                <div class="dropdown-head" >
                  <span class="sub-title nk-dropdown-title"
                    >Notificaciones</span
                  >
                </div>
                <div class="dropdown-body">
                  <div class="nk-notification">
                    <div
                      class="nk-notification-item dropdown-inner"
                     
                    >
                      <div class="nk-notification-content">
                        <div class="nk-notification-text">
                          No hay notificaciones
                        </div>
                      </div>
                    </div>
                    <div
                      class="nk-notification-item dropdown-inner"
                     
                    >
                      <div class="nk-notification-icon">
                        <em
                          class="icon icon-circle bg-primary-dim ni ni-calender-date-fill"
                        ></em>
                      </div>
                      <div class="nk-notification-content">
                        <div class="nk-notification-text">
                          <span class="recordatorio-text">RECORDATORIO:</span> Cliente 

                        </div>
                        <br>
                        <div class="nk-notification-text dark-text bold-text"> 
                          <span class="agendado-text">AGENDADO:</span> 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li class="dropdown list-apps-dropdown d-lg-none">
              <a
                href="#"
                class="dropdown-toggle nk-quick-nav-icon"
                data-bs-toggle="dropdown"
              >
                <div class="icon-status icon-status-na">
                  <em class="icon ni ni-menu-circled"></em>
                </div>
              </a>
              <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                <div class="dropdown-body">
                  <ul class="list-apps">
                    <li>
                      <RouterLink
                        to="/"
                        @click="handleModuleSelect('Visión general')"
                      >
                        <span class="list-apps-media"
                          ><em class="icon ni ni-home icon-side"></em
                        ></span>
                        <span class="list-apps-title"
                          >Visión general</span
                        ></RouterLink
                      >
                    </li>

      
                    <li>
                      <a href="#" v-show="hasPermissionTo(['users'])">
                        <span class="list-apps-media"
                          ><em
                            class="icon ni ni-user-add-fill bg-purple-dim"
                          ></em
                        ></span>
                        <span class="list-apps-title">Equipo</span></a
                      >
                    </li>

                  </ul>
                </div>
              </div>
            </li>
            <strong>{{ user.email }}</strong>
            <li class="dropdown user-dropdown">
              <a
                href="#"
                class="dropdown-toggle me-n1"
                data-bs-toggle="dropdown"
              >
                <div class="user-toggle">
                  <div class="user-avatar sm icon-general">
                    <em class="icon ni ni-user-alt"></em>
                  </div>
                </div>
              </a>

              <div class="dropdown-menu dropdown-menu-md dropdown-menu-end">
                <div
                  class="dropdown-inner user-card-wrap bg-lighter d-none d-md-block"
                >
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
                      <a href="#"
                        ><em class="icon ni ni-user-alt"></em
                        ><span>Perfil</span></a
                      >
                    </li>
                    <li>
                      <a href="#"
                        ><em class="icon ni ni-setting-alt"></em
                        ><span>Configuracion</span></a
                      >
                    </li>
                  </ul>
                </div>
                <div class="dropdown-inner">
                  <ul class="link-list">
                    <li>
                      <a href="javascript:void(0);" @click="handleLogout"
                        ><em class="icon ni ni-signout"></em
                        ><span>Salir</span></a
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
