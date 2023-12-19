<template>
  <div class="nk-content mt-1">
    <div class="container-fluid">
      <div class="nk-content-inner">
        <div class="nk-content-body">
            <div class="table-responsive">
            <div class="row mb-3">
              <div class="col-12 col-md-4 mb-2 mb-md-0">
                <!-- Primera columna con el campo de búsqueda -->
                <div class="form-group has-search">
                  <span class="fa fa-search form-control-feedback"></span>
                  <input type="text" class="form-control" placeholder="Buscar datos" v-model="searchText" />
                </div>
              </div>

              <div class="col-12 col-md-2 mb-2 mb-md-0"></div>

                  <div class="col-12 col-md-6">
                <div style="text-align: end" id="custom-button-group">

                     <button type="button" class="btn btn-outline-yellow mr-1 mb-1 mb-md-0" @click="agregarCenso">
                    <i class="fas fa-plus mr-1"></i> Agregar Censo
                  </button>


                   </div>
                  </div>
                </div>

              

              <InitModalView v-if="showModal" :show-modal="showModal" :form-data="formData" @close-modal="closeModal">
            </InitModalView>
            </div>

            <div class="container-table">
              <DataTable :data="filteredData" :columns="columns" :options="dataTableOptions"
                class="table table-striped table-bordered display dsn-table" />
              </div>

        </div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useAuth } from "../../stores/auth";
import DataTable from "datatables.net-vue3";
import DataTablesCore, { type ConfigColumns } from "datatables.net-bs5";
import axios from "axios";
import InitModalView from "./InitModalView.vue";
import 'datatables.net-responsive-bs4';
import { useRouter } from 'vue-router';

import { ElMessage } from "element-plus";

DataTable.use(DataTablesCore);

export default defineComponent({
  components: {
    DataTable,
    InitModalView
  },

  setup() {

    const showModal = ref(false);
    const users = ref<Array<Advisor>>([]);

    const router = useRouter();

    const formData = ref({});

    const headers = useAuth().headers();


    const { user } = useAuth();




    const columns: ConfigColumns[] = [
      {
        data: "correlativo",
        title: "#"

  
      },
      { data: "familia", title: "Familia" },

      {
        data: "numero_integrantes",
        title: "N° Total de integrantes",

        width: "150px" // Puedes ajustar el ancho aquí, por ejemplo, "150px" o "10%".
      },


      {
        data: "cens_fecha_inicio",
        title: "Fecha Inicio",

        width: "150px" // Puedes ajustar el ancho aquí, por ejemplo, "150px" o "10%".
      },


      {
        data: "cens_fecha_fin",
        title: "Fecha Fin",
        render: function (data, type, full, meta) {
          if (data === null) {
            return '<div class="censo-no-terminado">Censo no terminado</div>';
          } else {
            // Aquí puedes aplicar el formato que desees a la fecha
            return data;
          }
        }
      },

      {
        data: "cens_nombre_encuestador",
        title: "Encuestador",

        width: "150px" // Puedes ajustar el ancho aquí, por ejemplo, "150px" o "10%".
      },
      {
        data: "porcentaje_avance",
        title: "% de avance",
        render: (data: string, type: string, row: any) => {
          const porcentaje = parseFloat(data || '0');
          let barraPorcentaje = '';

          if (porcentaje === 100) {
            barraPorcentaje = `
          <div class="progress">
            <div class="progress-bar bg-success" role="progressbar" style="width: ${porcentaje}%" aria-valuenow="${porcentaje}" aria-valuemin="0" aria-valuemax="100">${porcentaje}%</div>
          </div>
          <div class="terminado-texto">Terminado</div>
        `;
          } else {
            barraPorcentaje = `
          <div class="progress">
            <div class="progress-bar bg-warning" role="progressbar" style="width: ${porcentaje}%" aria-valuenow="${porcentaje}" aria-valuemin="0" aria-valuemax="100">${porcentaje}%</div>
          </div>
          <div class="en-proceso-texto">En proceso</div>
        `;
          }

          return barraPorcentaje;
        },
      },
      {
        title: "Acciones",
        orderable: false,
        render: (data: string, type: string, row: any) => {
          const disableButton = parseFloat(row.porcentaje_avance) === 100;

          return `
      <router-link :to="'/home' + row.id">
        <button class="btn btn-warning" data-action="editar" data-id="${row.censo_id}" ${disableButton ? 'disabled' : ''}>
          <i class="fas fa-pencil-alt"></i>
        </button>
      </router-link>
    `;
        },
      },

    ];

    const dataTableOptions = {
      responsive: true,
      autoWidth: false,
      pagingType: 'full_numbers',
      lengthMenu: [5, 10, 25, 50],

      bLengthChange: false,
      pageLength: 5,
      dom: "rtip",
      columns: columns,
      columnDefs: [
        { targets: '_all', defaultContent: '-' } // Define un valor predeterminado para todas las columnas
      ],
      language: {
        search: "Buscar",
        zeroRecords: "No hay registros en su búsqueda",
        info: "Mostrando del _START_ a _END_ de _TOTAL_ registros",
        infoFiltered: "(Filtrados de _MAX_ registros)",
        
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último",
        },
      },
      order: [[3, 'desc']], // Aquí ordenas por la columna 3 (índice 3), que corresponde a cens_fecha_inicio, de manera descendente
    };

    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/censo/users/${user.id}`,
          headers
        );
        users.value = response.data.censos;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    document.addEventListener("click", async function (event) {
      const target = event.target as HTMLElement;

      if (target instanceof HTMLElement) {
        const editButton = target.closest(".btn-warning[data-id]");

        if (editButton) {
          const userId = editButton.getAttribute("data-id");

          router.push({ path: `/editar-censo/${userId}` });

        }
      }
    });






    document.addEventListener("keyup", async function (event) {
      const target = event.target as HTMLElement;
      if (
        event.key === "Enter" &&
        target.classList.contains("password-input")
      ) {
        const inputValue = (target as HTMLInputElement).value;
        const userIdAttr = target.getAttribute("data-user-id");

        if (userIdAttr !== null) {
          const userId = parseInt(userIdAttr);
          try {
            const response = await axios.put(
              `${import.meta.env.VITE_API_URL}/users/update-password/${userId}`,
              { password: inputValue },
              headers
            );

            if (response.status === 200) {
              ElMessage.success("Contraseña actualizada exitosamente");
            } else {
              console.error("Error al actualizar la contraseña");
            }
          } catch (error) {
            console.error("Error al actualizar la contraseña:", error);
          }
        }
      }
    });

    const handleConfirm = () => { };

    const searchText = ref("");


    const agregarCenso = async () => {
      try {
        const datosCenso = {
          cens_fecha_inicio: new Date().toISOString(),
          cens_nombre_encuestador: user.name
        };

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/censo/create-cust`, datosCenso,
          headers
        );

        console.log(response);


        const nuevoCensoUuid = response.data.new_censo_uuid; // Datos del nuevo censo, incluido el UUID generado
        console.log('Censo creado:', nuevoCensoUuid);

        // Redirigir a la página de detalle del censo recién creado
        router.push(`/ficha/${nuevoCensoUuid}`); // Suponiendo que 'uuid' es el nombre del campo en el objeto del censo
      } catch (error) {
        console.error('Error al crear el censo:', error);
        // Manejo de errores
      }
    };



    const filteredData = computed(() => {
      if (!searchText.value) {
        return users.value;
      }
      const search = searchText.value.toLowerCase();
      return users.value.filter(
        (user) =>
          user.familia.toLowerCase().includes(search)

      );
    });

    const openModal = (data: {}) => {
      formData.value = data ? { ...data } : {};
      showModal.value = true;
    };

    const closeModal = () => {
      fetchContacts();
      showModal.value = false;
    };

    onMounted(() => {
      console.log(user.id)
      fetchContacts();
    });

    return {
      handleConfirm,
      users,
      columns,
      agregarCenso,
      searchText,
      dataTableOptions,
      filteredData,
      openModal,
      showModal,
      formData,
      user,
      closeModal,
    };
  },
});
</script>
  
<style scoped>
/* cambios */
.color-y {
  color: #f8bc02;
}

.input-AB {
  height: 42px;
  border: 1px solid #d2d2d2;
  border-radius: 10px;
  outline: none;
  padding-left: 12px;
  margin-top: 10px;
}

/* fin cambios */
.has-search .form-control {
  padding-left: 2.375rem;
}

.has-search .form-control-feedback {
  position: absolute;
  z-index: 2;
  display: block;
  width: 2.375rem;
  height: 2.375rem;
  line-height: 2.375rem;
  text-align: center;
  pointer-events: none;
  color: #f8bc02;
  right: 0;
}

@media (max-width: 576px) {
  #custom-button-group button {
    display: block;
    width: 100%;
  }

  #custom-dropdown {
    display: flex;
    justify-content: center;
  }
}

.ml-5 {
  margin-left: 5rem;
}

.ml-3 {
  margin-left: 2rem;
}

.ml-1 {
  margin-left: 1rem;
}

.mr-3 {
  margin-right: 3rem;
}

.mr-1 {
  margin-right: 1rem;
}

.btn-icon-text {
  margin-right: 5rem !important;
}

.align-start {
  display: flex;
  flex-direction: column;
}

.mt-2 {
  margin-top: 2rem;
}

.center-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-outline-warning {
  border-radius: 20px;
}

.data-button {
  margin-left: 4rem !important;
}

.table.dataTable thead th {
  background-color: #fff4d7;
  border-color: #fff4d7;
  color: #2d383c;
}

.btn-outline-yellow {
  color: #f8bc02;
  border-color: #f8bc02;
  border-radius: 20px;
}

.btn-outline-yellow:hover {
  color: #fff;
  background-color: #eec250;
  border-color: #eec250;
  border-radius: 20px;
}

.font-base {
  font-size: 1.3rem;
}

.font-base:hover {
  color: #eec250;
}

.btn-yellow {
  color: #eec250;
  border-color: #eec250;
}

.btn-yellow:hover {
  color: #eec250;
  border-color: #eec250;
}

.table-responsive {
  overflow-x: hidden;
}

.modal.left .modal-dialog,
.modal.right .modal-dialog {
  position: fixed;
  margin: auto;
  width: 920px;
  height: 100%;
  -webkit-transform: translate3d(0%, 0, 0);
  -ms-transform: translate3d(0%, 0, 0);
  -o-transform: translate3d(0%, 0, 0);
  transform: translate3d(0%, 0, 0);
}

.modal.left .modal-content,
.modal.right .modal-content {
  height: 100%;
  overflow-y: auto;
}

.modal.left .modal-body,
.modal.right .modal-body {
  padding: 15px 15px 80px;
}

.modal.right.fade .modal-dialog {
  right: 0;
  -webkit-transition: opacity 0.3s linear, right 0.3s ease-out;
  -moz-transition: opacity 0.3s linear, right 0.3s ease-out;
  -o-transition: opacity 0.3s linear, right 0.3s ease-out;
  transition: opacity 0.3s linear, right 0.3s ease-out;
}

.modal.right.fade.in .modal-dialog {
  left: 0;
}

.modal-content {
  border-radius: 0;
  border: none;
}

.modal-header {
  border-bottom-color: #eeeeee;
  background-color: #fafafa;
}

.btn-yellow-color {
  background: #f8bc02;
  border-radius: 20px;
  color: #2d383c;
}

.btn-yellow-color:hover {
  background: #f8bc02;
  border-color: #000000;
  color: #2d383c;
  border-radius: 20px;
  font-weight: 700;
}

.btn-green {
  color: #16ad09;
  border-color: #16ad09;
}

.btn-green:hover {
  color: #fff;
  background: #16ad09;
}

.nav {
  display: flex;
}

.nav-item {
  flex: 1;
  text-align: center;
  background-color: #f8bc02;
  color: #2d383c;
}

.nav-link {
  display: block;
  padding: 10px;
  color: black;
  text-decoration: none;
}

.nav-tabs .nav-link.active {
  color: #2d383c;
  border: none;
  background-color: rgba(0, 0, 0, 0);
}

.nav-tabs .nav-link:after {
  left: 0;
  right: 0;
  bottom: 0;
  height: 0;
  opacity: 0;
}

.modal-body {
  padding: 0;
}

@media (min-width: 576px) {
  .modal-body {
    padding: 0;
  }
}

.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 0 3px;
}
</style>
  