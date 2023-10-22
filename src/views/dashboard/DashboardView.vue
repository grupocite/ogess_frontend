<script lang="ts">
import {
  ref,
  computed,
  defineComponent,
  onMounted,
  watch,
  reactive,
} from "vue";
import axios from "axios";
import { useAuth } from "../../stores/auth";
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from "element-plus";

declare const bootstrap: any;

export default defineComponent({
  components: {
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
  },
  setup() {
    const activeTab = ref("tabItem1");
    const chartOptions = ref<any>({
      chart: {
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          endingShape: "rounded",
          borderRadius: 3,
        },
      },
      grid: {
        padding: {
          top: -18,
          right: 0,
          bottom: -6,
          left: 0,
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
        tickPlacement: "end",
        categories: [],
        tickAmount: 50,
        axisBorder: {
          show: true,
          height: 0,
          width: "100%",
          offsetX: 0,
          offsetY: 0,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        min: 0,
        max: 50,
        labels: {
          show: true,
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [],
            fontSize: "12px",
            fontFamily: "Segoe UI",
            fontWeight: 400,
            cssClass: "apexcharts-yaxis-label",
          },
        },
      },
      maxHeight: 100,

      colors: ["#F8BC02"],
    });

    const chartSeries = ref<any[]>([
      {
        name: "Cantidad de mensajes",
        data: [],
      },
    ]);
    const numeroDelBackend = ref(null);
    const startDate = ref(null);
    const endDate = ref(null);
    const salesByMonth = reactive([]);
    const selectedFilter = ref("ultimos_7_dias");

    const messageContent = ref("");
    const formattedLastActivity = ref("");

    const tableData = ref([]);


    const headers = useAuth().headers();
    const selectMes = ref(null);
    const selectAnio = ref(null);
    const selectDate = ref(1);


    onMounted(async () => {

  
    });

    return {
      activeTab,
      chartOptions,
      chartSeries,
      numeroDelBackend,
      salesByMonth,
      tableData,
      startDate,
      messageContent,
      selectedFilter,
      endDate,
      selectDate,
      formattedLastActivity,
      selectMes,
      selectAnio,
      headers,
    };
  },
});
</script>

<template>
  <div class="nk-content">
    <div class="container-fluid">
      <div class="nk-content-inner">
        <div class="nk-content-body">
          <div class="nk-block">
            <div class="d-flex justify-content-center flex-responsive-sup">
ROBERTOOOOOOOOOOOOOO


            </div>
      
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>
.color-y {
  color: #f6bb02;
}

.color-f {
  color: #2d383c;
}

.color-w {
  color: #a9a9a9;
}

.color-r {
  color: #d22b2b;
}

.color-arrow {
  color: #fff1c7;
}

.font-family {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.fs-12 {
  font-size: 12px;
}

.fs-14 {
  font-size: 14px;
}

.fs-14-res {
  font-size: 14px;
}

.fs-17 {
  font-size: 18px;
}

.fs-22 {
  font-size: 22px;
}

.border-vg {
  border: 1px solid #d2d2d2;
  border-radius: 15px;
}

.border-vg-resp {
  border: 1px solid #d2d2d2;
  border-radius: 15px;
}

.background-yl {
  background: #fff4d7;
}

.check-green {
  border: 1px solid #16ad09;
  border-radius: 9px;
  background: #ceffb7;
  height: 27px;
  color: #16ad09;
  align-items: center;
}

.check-red {
  border: 1px solid #d22b2b;
  border-radius: 9px;
  background: #ffd4d4;
  height: 27px;
  color: #d22b2b;
  align-items: center;
}

/* cards height y width */
.h-vg {
  height: 353px;
}

.h-vg-2 {
  height: 74px;
}

.h-vg-3 {
  height: 272px;
}

.w-vg-4 {
  width: 484px;
}

.w-per {
  width: 378px;
}

.w-per-2 {
  width: 484px;
}

.w-156 {
  width: 156px;
}

.w-110 {
  width: 110px;
}

.h-graficos {
  height: 194.5px;
}

.wh-ft {
  width: 1270px;
  height: 368px;
}

.w-80-res {
  width: 190px;
}

.w-50-res {
  width: 160px;
}

.border-b {
  border-bottom: 1px solid #d2d2d2;
}

.border-t {
  border-top: 1px solid #d2d2d2;
}

.head-vg {
  height: 48px;
  border-bottom: 1px solid #d2d2d2;
}

.head-vg-nb {
  height: 48px;
}

.head-vg-sh {
  height: 34px;
}

/* margin */
.mt {
  margin-top: 7px;
}

.mr-p {
  margin-right: 14px;
}

.h-42 {
  height: 42px;
}

.ml-p {
  margin-left: 14px;
}

.mb-p {
  margin-bottom: 3px;
}

/* overflow scroll */
.h-scroll-1 {
  height: 212px;
  padding-left: 30px;
}

.h-scroll-2 {
  height: 260px;
  padding-left: 27px;
}

.h-scroll-3 {
  height: 280px;
}

.content-scroll {
  overflow-y: auto;
}

.content-scroll::-webkit-scrollbar {
  width: 13px;
  border: 1px solid #d2d2d2;
  border-radius: 20px;
}

.content-scroll::-webkit-scrollbar-thumb {
  background: #d2d2d2;
  border-radius: 20px;
}

/* chart */
.container {
  width: 500px;
  max-width: 338px;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 0px;
  height: 100%;
}

.container::-webkit-scrollbar {
  width: 13px;
  border: 1px solid #d2d2d2;
  border-radius: 20px;
}

.container::-webkit-scrollbar-thumb {
  background: #d2d2d2;
  border-radius: 20px;
}

.containerBody {
  height: 169px;
  width: 1300px;
}

.chartBox {
  width: 338px;
  padding: 20px;
}

/* Tooltip */
.tooltip-right {
  font-family: "Segoe UI";
  width: 240px;
  font-size: 15px;
  background: white;
  border: 1px solid #d2d2d2;
  border-radius: 10px;
  padding: 12px 13px;
  position: absolute;
  visibility: hidden;
  opacity: 0;
}

.icon-info:hover .tooltip-right {
  visibility: visible;
  opacity: 100%;
  transition: 0.3s;
}

.icon-info:hover .tooltip-right-2 {
  visibility: visible;
  opacity: 100%;
  transition: 0.3s;
}

/* responsive */

@media (max-width: 805px) {
  .flex-responsive-ph {
    flex-direction: column;
  }

  .border-vg-resp {
    border: none;
    display: flex;
    justify-content: center;
  }

  .border-vg-res {
    border: 1px solid #d2d2d2;
    border-radius: 10px;
  }

  .w-per-2-res {
    width: 378px;
    margin-right: 15px;
  }

  .wh-ft-res {
    width: 378px;
  }

  .fs-res {
    font-size: 8px;
    text-align: center;
  }

  .w-156 {
    width: 80px;
  }

  .w-110 {
    width: 50px;
  }

  .fs-rs {
    text-align: center;
  }

  .fs-14 {
    font-size: 13.5px;
  }

  .card-2 {
    margin-top: 9px;
  }
}

@media (max-width: 1380px) {
  .flex-responsive-sup {
    flex-direction: column;
    align-items: center;
  }

  .card-4 {
    margin-top: 12px;
  }

  .w-per-2 {
    width: 770px;
  }

  .wh-ft {
    width: 770px;
  }

  .fs-rs {
    font-size: 8px;
  }

  .w-156 {
    width: 80px;
  }

  .w-110 {
    width: 50px;
  }

  .fs-14-res {
    font-size: 10px;
  }

  .ml-p {
    margin-left: 0px;
  }
}

.modal-dialog {
  width: 262px;
}

.modal-content {
  height: 300px;
}

.modal-b {
  padding-left: 24px;
}
.select-perso {
  width: 199px;
  height: 42px;
  border: 2px solid #d2d2d2;
  background: transparent;
  font-size: 16px;
  color: #545454;
  border-radius: 7px;
  padding: 0px 0px 0px 8px;
  appearance: none;
  outline: none;
}

.b-aceptar {
  width: 130px;
  height: 44px;
  background: #f8bc02;
  border: none;
  font-size: 16px;
  color: #2d383c;
  border-radius: 7px;
  outline: none;
}

.b-aceptar:hover {
  border: 1.7px solid #f8bc02;
  background: transparent;
  color: #f8bc02;
}
</style>
