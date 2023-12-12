<script lang="ts">
import {
  ref,
  defineComponent,
  onMounted,
  watch,
  reactive,
} from "vue";
import axios from "axios";
import ApexCharts from 'apexcharts';
import VueApexCharts from 'vue3-apexcharts';
import { useAuth } from "../../stores/auth";

declare const bootstrap: any;

export default defineComponent({
  components: {
    apexchart: VueApexCharts,
  },
  setup() {


    const headers = useAuth().headers();
    const chartData = ref([]);

    const labels = ref([]);
    const labels2 = ref([]);


    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/report-one`, headers);


        const response3 = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/report-tree`, headers);

        const response4 = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/report-four`, headers);

        const response5 = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/report-five`, headers);

        const response7 = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/report-quince`, headers);


        const dataFromBackend = response3.data;
        const dataFromBackend2 = response4.data;
        const dataFromBackend3 = response5.data;

        const dataFromBackend4 = response7.data;

        const categoriesX = ['Cantidad']; // Categoría única para el eje X

        const dataMasculinos = dataFromBackend4.cantidad_miembros_por_sexo.cantidad_masculinos;
        const dataFemeninos = dataFromBackend4.cantidad_miembros_por_sexo.cantidad_femeninos;

        const seriesMasculino = [{
          x: categoriesX[0],
          y: dataMasculinos,
        }];

        const seriesFemenino = [{
          x: categoriesX[0],
          y: dataFemeninos,
        }];

        chartSeries3.value = [
          { name: 'Masculino', data: seriesMasculino },
          { name: 'Femenino', data: seriesFemenino },
        ];


        const categories = dataFromBackend.map((item: any) => item.grain_nombre); // Convertir explícitamente a cadenas
        const totalPersonas = dataFromBackend.map((item) => Math.floor(item.total_personas)); // Redondea a números enteros
        // Crear el formato de datos para el gráfico con ejes X e Y definidos explícitamente
        const chartData2 = categories.map((category: any, index: any) => ({

          x: category,
          y: totalPersonas[index],
        }));


        const categorie2s = dataFromBackend2.map((item: any) => item.ocup_nombre); // Convertir explícitamente a cadenas
        const totalPersonas2 = dataFromBackend2.map((item: any) => Math.floor(item.total_personas)); // Redondea a números enteros
        // Crear el formato de datos para el gráfico con ejes X e Y definidos explícitamente
        const chartData3 = categorie2s.map((category: any, index: any) => ({

          x: category,
          y: totalPersonas2[index],
        }));


        // Extraer las categorías y los datos de cantidad de familias por rango de habitaciones
        const categories3 = dataFromBackend3.map((item) => item.rango_habitaciones);
        const cantidadFamilias = dataFromBackend3.map((item) => item.cantidad_familias);

        // Formatear los datos para el gráfico
        const chartData4 = categories3.map((category, index) => ({
          x: category,
          y: cantidadFamilias[index],
        }));


        // Actualizar las referencias con los datos recibidos
        series.value = [{ data: chartData2 }];

        customSeries.value = [{ data: chartData3 }];

        series6.value = [{ data: chartData4 }];

        chartData.value = await response.json();


        renderChart(chartData.value);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };


    const fetchData2 = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/report-six`, headers);
        const dataFromBackend = response.data;

        // Asignar los datos obtenidos a las referencias
        labels.value = dataFromBackend.labels || [];
        series2.value = dataFromBackend.data || [];

        // Configurar el gráfico
        var options = {
          series: series2.value,
          chart: {
            type: 'pie',
            height: 450,
          },
          labels: labels.value,
          title: {
            text: 'Familias con riesgos en Gestantes',
            align: 'center',
            style: {
              fontSize: '20px',
            },
          },

          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          }],
        };

        // Renderizar el gráfico
        const chartElement = document.querySelector("#chart10");
        const chart = new ApexCharts(chartElement, options);
        chart.render();
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    const fetchData3 = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/report-seven`, headers);
    const dataFromBackend = response.data;

    // Asignar los datos obtenidos a las referencias
    labels2.value = dataFromBackend.labels || [];
    series7.value = dataFromBackend.data || [];

    // Configurar el gráfico
    var options = {
      series: series7.value,
      chart: {
        type: 'donut',
        height: 450,
      },
      labels: labels2.value,
      title: {
        text: 'Familias con riesgos en Puerperas',
        align: 'center',
        style: {
          fontSize: '20px',
        },
      },

      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      }],
    };

    // Renderizar el gráfico
    const chartElement = document.querySelector("#chart11");
    const chart = new ApexCharts(chartElement, options);
    chart.render();
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
};


    const renderMyChart = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/report-eight`, headers);
        const data = response.data;

        // Obtener los nombres de los riesgos y la cantidad de familias por riesgo
        const riesgos = Object.keys(data.cantidad_familias_por_riesgo);
        const cantidadFamiliasPorRiesgo = Object.values(data.cantidad_familias_por_riesgo);
        const totalRiesgosFamilia = data.total_riesgos_familia;

        // Crear un array de colores aleatorios basados en la cantidad de riesgos
        const randomColors = Array.from(
          { length: riesgos.length },
          () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
        );

        // Crear el array de datos para el gráfico de Treemap
        const series = [
          {
            data: riesgos.map((riesgo, index) => ({
              x: riesgo,
              y: cantidadFamiliasPorRiesgo[index],
              color: randomColors[index], // Asignar un color aleatorio a cada riesgo
            })),
          },
        ];

        // Configuración del gráfico con ApexCharts
        const options = {
          legend: { show: false },
          chart: { height: 550, type: 'treemap' },
          title: {
            text: 'Cantidad familias por tipo de Riesgo',
            align: 'center',
            style: {
              fontSize: '20px',
            },
          },
          plotOptions: {
            treemap: {
              distributed: true,
              enableShades: false,
            },
          },
          series: series,
          tooltip: {
            shared: false,
            y: {
              formatter: function (val) {
                return "Total Familias: " + val;
              },
            },
          },
        };

        // Renderizar el gráfico con ApexCharts
        const chart = new ApexCharts(document.querySelector('#chartContainerGa'), options);
        chart.render();

      } catch (error) {
        console.error('Hubo un error al obtener los datos:', error);
      }
    };


    // Llamar a la función para obtener datos y renderizar el gráfico


    let chart = null;
    let chart2 = null;

    const renderChart = () => {
      const options = {
        series: [{
          name: 'Familias Encuestadas',
          data: chartData.value.map(item => item.familias_count)
        }],
        chart: {
          height: 350,
          type: 'bar',
          events: {
            click: function (chart, w, e) {
              // Manejar evento de clic en el gráfico
            }
          }
        },
        xaxis: {
          categories: chartData.value.map(item => item.cens_nombre_encuestador),
          labels: {
            style: {
              colors: '#000',
              fontSize: '12px'
            }
          }
        },
        title: {
          text: 'Cantidad de familias encuestadas por responsable ', // Aquí defines el título que deseas mostrar
          align: 'center',
          style: {
            fontSize: '20px',
          },
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return parseInt(value);
            }
          }
        },
        // Resto de opciones del gráfico...
      };

      const chartContainer: any = document.querySelector("#chart");

      // Limpiar contenedores de gráficos
      chartContainer.innerHTML = '';

      // Renderizar los nuevos gráficos
      chart = new ApexCharts(chartContainer, options);
      chart.render();
    };

    const renderChartXd = async () => {
      const response2 = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/report-two`, headers);
      const dataFromBackend = response2.data;

      const etapasVidaTotal = dataFromBackend.etapas_vida_total;

      const etapas = Object.keys(etapasVidaTotal);
      const series = etapas.map((etapa) => ({
        name: etapa, // Nombre dinámico de la serie según la etapa de vida
        data: [etapasVidaTotal[etapa]], // Datos de la cantidad por etapa
      }));

      const options2 = {
        series: series,
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: ['Cantidad'], // Nombre de la categoría en el eje X
        },
        title: {
          text: 'Cantidad de miembros por etapa de vida',
          align: 'center',
          style: {
            fontSize: '20px',
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          show: true,
        },
      };

      const chartContainer2 = document.querySelector("#chart1");
      const chart2 = new ApexCharts(chartContainer2, options2);
      chart2.render();
    };


    const series = ref([
      { name: 'Total de personas', data: [] },
    ]); // Inicializa series como una referencia vacía

    const customSeries = ref([
      { name: 'Total de personas', data: [] },
    ]); // Inicializa series como una referencia vacía


    const chartOptions = ref({
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
      },

      xaxis: {
        categories: [],
      },
      yaxis: {
        min: 0, // Establecer el valor mínimo del eje Y
        max: 30, // Establecer el valor máximo del eje Y (ajústalo según tus datos)
      },
      title: {
        text: 'Cantidad de personas por grado de instrucción', // Aquí defines el título que deseas mostrar
        align: 'center',
        style: {
          fontSize: '20px',
        },
      },
    });

    const customChartOptions = ref({
      chart: {
        type: 'bar',
        height: 350,
      },
      annotations: {
        // ... tus opciones de anotación aquí ...
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: [],
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      yaxis: {
        reversed: true,
        axisTicks: {
          show: true,
        },
        min: 0, // Establecer el valor mínimo del eje Y
        max: 20, // Establecer el valor máximo del eje Y (ajústalo según tus datos)
      },
      title: {
        text: 'Cantidad de personas por grado de Ocupación', // Aquí defines el título que deseas mostrar
        align: 'center',
        style: {
          fontSize: '20px',
        },
      },
    });

    // Acceso al chart para métodos/manejo de eventos, etc.
    const chartRef = ref(null);

    const series2 = ref([]);

    const chartOptions2 = ref({
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: [],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      }],

    });


    const seriesMega = ref([
      {
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      },
      {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
      },
      {
        name: 'Free Cash Flow',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
      }
    ]);

    const chartOptionsMega = ref({
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      },
      yaxis: {
        title: {
          text: '$ (thousands)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands"
          }
        }
      }
    });


    const chartOptions3 = ref({
      chart: {
        type: 'bar',
        height: 430,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff'],
      },
      tooltip: {
        enabled: true,
      },
      yaxis: {
        min: 0, // Establecer el valor mínimo del eje Y
        max: 10, // Establecer el valor máximo del eje Y (ajústalo según tus datos)
      },
      xaxis: {
        categories: [], // Inicialmente vacío, se llenará con los nombres de las familias
        labels: {
          formatter: function (value) {
            return value; // Devolver el valor sin realizar cambios (usar como texto)
          }
        }
      },
      title: {
        text: 'Cantidad de miembros de la familia por sexo', // Aquí defines el título que deseas mostrar
        align: 'center',
        style: {
          fontSize: '20px',
        },
      },
    });


    async function renderGraficX2() {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/report-nine`, headers);
      const dataFromBackend = response.data;

      const seriesData = Object.entries(dataFromBackend).map(([key, value]) => ({
        name: key,
        data: [value.cantidad],
      }));

      const categories = ['Características']; // Definir una sola categoría "Características"

      const options = {
        series: seriesData,
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          dropShadow: {
            enabled: true,
            blur: 1,
            opacity: 0.25
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '60%',
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 2,
        },
        title: {
          text: 'Familias con características específicas en el hogar',
          align: 'center',
          style: {
            fontSize: '20px',
          },
        },
        xaxis: {
          categories: categories,
        },
        yaxis: {
          title: {
            text: undefined
          },
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return `Cantidad: ${val}`; // Modificar el texto del tooltip
            }
          }
        },
        fill: {
          type: 'pattern',
          opacity: 1,
          pattern: {
            style: ['circles', 'slantedLines', 'verticalLines', 'horizontalLines'],
          }
        },
        states: {
          hover: {
            filter: 'none'
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40
        },
      };

      const chartContainer = document.querySelector("#RenderizaElGrafico");
      const chart = new ApexCharts(chartContainer, options);
      chart.render();
    }




    const chartSeries3 = ref([]);

    const series4 = ref([
      {
        data: [
          { x: 'New Delhi', y: 218 },
          { x: 'Kolkata', y: 149 },
          { x: 'Mumbai', y: 184 },
          { x: 'Ahmedabad', y: 55 },
          { x: 'Bangaluru', y: 84 },
          { x: 'Pune', y: 31 },
          { x: 'Chennai', y: 70 },
          { x: 'Jaipur', y: 30 },
          { x: 'Surat', y: 44 },
          { x: 'Hyderabad', y: 68 },
          { x: 'Lucknow', y: 28 },
          { x: 'Indore', y: 19 },
          { x: 'Kanpur', y: 29 },
        ],
      },
    ]);

    const chartOptions4 = ref({
      legend: { show: false },
      chart: { height: 350, type: 'treemap' },
      title: { text: 'Distibuted Treemap (different color for each cell)', align: 'center' },
      colors: [
        '#3B93A5', '#F7B844', '#ADD8C7', '#EC3C65', '#CDD7B6',
        '#C1F666', '#D43F97', '#1E5D8C', '#421243', '#7F94B0',
        '#EF6537', '#C0ADDB',
      ],
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: false,
        },
      },
    });


    const series5 = ref([
      {
        name: 'Marine Sprite',
        data: [44, 55, 41, 37, 22, 43, 21],
      },
      {
        name: 'Striking Calf',
        data: [53, 32, 33, 52, 13, 43, 32],
      },
      {
        name: 'Tank Picture',
        data: [12, 17, 11, 9, 15, 11, 20],
      },
      {
        name: 'Bucket Slope',
        data: [9, 7, 5, 8, 6, 9, 4],
      },
    ]);

    const chartOptions5 = ref({
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        dropShadow: {
          enabled: true,
          blur: 1,
          opacity: 0.25
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '60%',
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2,
      },
      title: {
        text: 'Compare Sales Strategy'
      },
      xaxis: {
        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return val + "K"
          }
        }
      },
      fill: {
        type: 'pattern',
        opacity: 1,
        pattern: {
          style: ['circles', 'slantedLines', 'verticalLines', 'horizontalLines'], // string or array of strings

        }
      },
      states: {
        hover: {
          filter: 'none'
        }
      },
      legend: {
        position: 'right',
        offsetY: 40
      },

      // Resto de tus opciones...
    });

    const series6 = ref([
      {
        name: 'Cantidad de Familias',
        data: [],
      },
    ]);

    const chartOptions6 = ref({
      chart: {
        height: 350,
        type: 'bar',
      },

      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,

        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: [],
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,

        },
        min: 0, // Establecer el valor mínimo del eje Y
        max: 10,

      },
      title: {
        text: 'Cantidad de familias según número de habitación', // Aquí defines el título que deseas mostrar
        align: 'center',
        style: {
          fontSize: '20px',
        },
      }
      // Resto de opciones del gráfico...
    });


    const series7 = ref([]);

    const chartOptions7 = {
      chart: {
        type: 'donut',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      }],
    };


    const renderMyChart2 = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/report-riesgos-ninos`, headers);
    const data = response.data;

    const riesgos = Object.keys(data.respuestas_por_riesgo_nino);

    // Modificar la estructura de los datos para el gráfico de barras
    const series = riesgos.map((riesgo) => ({
      x: riesgo, // Definir el eje Y con el nombre del riesgo
      y: data.respuestas_por_riesgo_nino[riesgo] // Definir el eje X con la cantidad de riesgos
    }));

    const options = {
      series: [{
        name: "Total de familias",
        data: series // Establecer la serie de datos
      }],
      chart: {
        type: 'bar', // Mantener el tipo de gráfico como 'bar' para el gráfico de barras
        height: 600,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true, // Cambiar a horizontal para invertir los ejes
          columnWidth: '50%', // Ancho de las columnas de la barra
          borderRadius: 10,
          dataLabels: {
            position: 'right' // Mostrar etiquetas de datos a la derecha de las barras
          }
        }
      },
      yaxis: {
        type: 'category', // Tipo de eje Y como 'category' para mostrar nombres de riesgos
        categories: riesgos, // Categorías en el eje Y como nombres de riesgos
        labels: {
          style: {
            fontSize: '18px',
          },
          maxWidth: 400, // Ajustar el ancho máximo del contenedor de las categorías (ajústalo según tu diseño)

        },
        title: {
          text: 'Riesgos', // Título del eje Y
          style: {
            fontSize: '14px',
          },

        },
      },
      xaxis: {
        title: {
          text: 'Cantidad de Familias', // Título del eje X
          style: {
            fontSize: '14px',
          },
        },
        min: 0, // Valor mínimo en el eje X
        max: 15, // Valor máximo en el eje X
      },
      legend: {
        show: false, // No mostrar la leyenda en este caso (opcional)
      },
      title: {
        text: 'Cantidad de Familias por Riesgos en la Etapa Niño',
        align: 'center',
        style: {
          fontSize: '20px',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        enabled: true,
        x: {
          formatter: function (val) {
            return val;
          },
        },
      },
    };

    const chart = new ApexCharts(document.querySelector('#chartSuperGa'), options);
    chart.render();
  } catch (error) {
    console.error('Hubo un error al obtener los datos:', error);
  }
};



const renderMyChart3 = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/report-riesgos-adolescentes`, headers);
    const data = response.data;

    const riesgos = Object.keys(data.respuestas_por_riesgo_adolescente);

    // Modificar la estructura de los datos para el gráfico de barras de adolescentes
    const series = riesgos.map((riesgo) => ({
      x: riesgo, // Definir el eje Y con el nombre del riesgo
      y: data.respuestas_por_riesgo_adolescente[riesgo] // Definir el eje X con la cantidad de riesgos
    }));

    const options = {
      series: [{
        name: "Total de Familias",
        data: series // Establecer la serie de datos
      }],
      chart: {
        type: 'bar',
        height: 600,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true, // Cambiar a horizontal para invertir los ejes
          columnWidth: '50%', // Ancho de las columnas de la barra
          borderRadius: 10,
          dataLabels: {
            position: 'right' // Mostrar etiquetas de datos a la derecha de las barras
          }
        }
      },
      yaxis: {
        type: 'category', // Tipo de eje Y como 'category' para mostrar nombres de riesgos
        categories: riesgos, // Categorías en el eje Y como nombres de riesgos
        labels: {
          style: {
            fontSize: '16px',
          },
          maxWidth: 200, // Ajustar el ancho máximo del contenedor de las categorías (ajústalo según tu diseño)
        },
        title: {
          text: 'Riesgos', // Título del eje Y
          style: {
            fontSize: '14px',
          },
        },
      },
      xaxis: {
        title: {
          text: 'Cantidad de Riesgos', // Título del eje X
          style: {
            fontSize: '14px',
          },
        },
        min: 0, // Valor mínimo en el eje X
        max: 15, // Valor máximo en el eje X
      },
      legend: {
        show: false, // No mostrar la leyenda en este caso (opcional)
      },
      title: {
        text: 'Cantidad de Familias por Riesgos en la Etapa Adolescente',
        align: 'center',
        style: {
          fontSize: '20px',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        enabled: true,
        x: {
          formatter: function (val) {
            return val;
          },
        },
      },
    };

    const chart = new ApexCharts(document.querySelector('#chartSuperGa22'), options);
    chart.render();
  } catch (error) {
    console.error('Hubo un error al obtener los datos:', error);
  }
};

const renderMyChart4 = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/report-riesgos-jovenes`, headers);
    const data = response.data;

    const riesgos = Object.keys(data.respuestas_por_riesgo_joven);

    // Modificar la estructura de los datos para el gráfico de barras de jóvenes
    const series = riesgos.map((riesgo) => ({
      x: riesgo, // Definir el eje Y con el nombre del riesgo
      y: data.respuestas_por_riesgo_joven[riesgo] // Definir el eje X con la cantidad de riesgos
    }));

    const options = {
      series: [{
        name: "Total de Familias",
        data: series // Establecer la serie de datos
      }],
      chart: {
        type: 'bar',
        height: 600,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true, // Cambiar a horizontal para invertir los ejes
          columnWidth: '50%', // Ancho de las columnas de la barra
          borderRadius: 10,
          dataLabels: {
            position: 'right' // Mostrar etiquetas de datos a la derecha de las barras
          }
        }
      },
      yaxis: {
        type: 'category', // Tipo de eje Y como 'category' para mostrar nombres de riesgos
        categories: riesgos, // Categorías en el eje Y como nombres de riesgos
        labels: {
          style: {
            fontSize: '16px',
          },
          maxWidth: 200, // Ajustar el ancho máximo del contenedor de las categorías (ajústalo según tu diseño)
        },
        title: {
          text: 'Riesgos', // Título del eje Y
          style: {
            fontSize: '14px',
          },
        },
      },
      xaxis: {
        title: {
          text: 'Cantidad de Riesgos', // Título del eje X
          style: {
            fontSize: '14px',
          },
        },
        min: 0, // Valor mínimo en el eje X
        max: 15, // Valor máximo en el eje X
      },
      legend: {
        show: false, // No mostrar la leyenda en este caso (opcional)
      },
      title: {
        text: 'Cantidad de Familias por Riesgos en la Etapa Joven',
        align: 'center',
        style: {
          fontSize: '20px',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        enabled: true,
        x: {
          formatter: function (val) {
            return val;
          },
        },
      },
    };

    const chart = new ApexCharts(document.querySelector('#chartSuperGa222'), options);
    chart.render();
  } catch (error) {
    console.error('Hubo un error al obtener los datos:', error);
  }
};

const renderMyChart5 = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/report-riesgos-adultos`, headers);
    const data = response.data;

    const riesgos = Object.keys(data.respuestas_por_riesgo_adulto);

    // Modificar la estructura de los datos para el gráfico de barras de adultos
    const series = riesgos.map((riesgo) => ({
      x: riesgo, // Definir el eje Y con el nombre del riesgo
      y: data.respuestas_por_riesgo_adulto[riesgo] // Definir el eje X con la cantidad de riesgos
    }));

    const options = {
      series: [{
        name: "Total de Familias",
        data: series // Establecer la serie de datos
      }],
      chart: {
        type: 'bar',
        height: 600,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true, // Cambiar a horizontal para invertir los ejes
          columnWidth: '50%', // Ancho de las columnas de la barra
          borderRadius: 10,
          dataLabels: {
            position: 'right' // Mostrar etiquetas de datos a la derecha de las barras
          }
        }
      },
      yaxis: {
        type: 'category', // Tipo de eje Y como 'category' para mostrar nombres de riesgos
        categories: riesgos, // Categorías en el eje Y como nombres de riesgos
        labels: {
          style: {
            fontSize: '16px',
          },
          maxWidth: 200, // Ajustar el ancho máximo del contenedor de las categorías (ajústalo según tu diseño)
        },
        title: {
          text: 'Riesgos', // Título del eje Y
          style: {
            fontSize: '14px',
          },
        },
      },
      xaxis: {
        title: {
          text: 'Cantidad de Riesgos', // Título del eje X
          style: {
            fontSize: '14px',
          },
        },
        min: 0, // Valor mínimo en el eje X
        max: 15, // Valor máximo en el eje X
      },
      legend: {
        show: false, // No mostrar la leyenda en este caso (opcional)
      },
      title: {
        text: 'Cantidad de Familias por Riesgos en la Etapa Adulto',
        align: 'center',
        style: {
          fontSize: '20px',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        enabled: true,
        x: {
          formatter: function (val) {
            return val;
          },
        },
      },
    };

    const chart = new ApexCharts(document.querySelector('#chartSuperGa2222'), options);
    chart.render();
  } catch (error) {
    console.error('Hubo un error al obtener los datos:', error);
  }
};


const renderMyChart6 = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/report-riesgos-adultos-mayores`, headers);
    const data = response.data;

    const riesgos = Object.keys(data.respuestas_por_riesgo_adulto_mayor);

    // Modificar la estructura de los datos para el gráfico de barras de adultos mayores
    const series = riesgos.map((riesgo) => ({
      x: riesgo, // Definir el eje Y con el nombre del riesgo
      y: data.respuestas_por_riesgo_adulto_mayor[riesgo] // Definir el eje X con la cantidad de riesgos
    }));

    const options = {
      series: [{
        name: "Total de Familias",
        data: series // Establecer la serie de datos
      }],
      chart: {
        type: 'bar',
        height: 600,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true, // Cambiar a horizontal para invertir los ejes
          columnWidth: '50%', // Ancho de las columnas de la barra
          borderRadius: 10,
          dataLabels: {
            position: 'right' // Mostrar etiquetas de datos a la derecha de las barras
          }
        }
      },
      yaxis: {
        type: 'category', // Tipo de eje Y como 'category' para mostrar nombres de riesgos
        categories: riesgos, // Categorías en el eje Y como nombres de riesgos
        labels: {
          style: {
            fontSize: '16px',
          },
          maxWidth: 200, // Ajustar el ancho máximo del contenedor de las categorías (ajústalo según tu diseño)
        },
        title: {
          text: 'Riesgos', // Título del eje Y
          style: {
            fontSize: '14px',
          },
        },
      },
      xaxis: {
        title: {
          text: 'Cantidad de Riesgos', // Título del eje X
          style: {
            fontSize: '14px',
          },
        },
        min: 0, // Valor mínimo en el eje X
        max: 20, // Valor máximo en el eje X
      },
      legend: {
        show: false, // No mostrar la leyenda en este caso (opcional)
      },
      title: {
        text: 'Cantidad de Familias por Riesgos en la Etapa Adulto Mayor',
        align: 'center',
        style: {
          fontSize: '20px',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        enabled: true,
        x: {
          formatter: function (val) {
            return val;
          },
        },
      },
    };

    const chart = new ApexCharts(document.querySelector('#chartSuperGa22222'), options);
    chart.render();
  } catch (error) {
    console.error('Hubo un error al obtener los datos:', error);
  }
};






    const renderChartCutr = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/report-trece`, headers);
        const dataFromBackend = response.data;

        const seriesMega = [];
        const categories = ["Tipos de violencia"]; // Establecer una sola categoría "Tipos de violencia"

        for (const tipoViolencia in dataFromBackend.familias_por_tipos_de_violencia) {
          const tipoData = dataFromBackend.familias_por_tipos_de_violencia[tipoViolencia];
          seriesMega.push({
            name: tipoViolencia,
            data: [tipoData.total]
          });
        }

        const options = {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: categories,
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return Math.round(val);
              }
            },
            title: {
              text: 'Total'
            }
          },
          title: {
            text: 'Cantidad de familias por tipos de violencia',
            align: 'center',
            style: {
              fontSize: '20px',
            },
          },
          series: seriesMega,
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return `Total: ${val}`;
              }
            }
          }
        };

        const chart = new ApexCharts(document.querySelector('#chartSuperGa333'), options);
        chart.render();

      } catch (error) {
        console.error('Error al obtener los datos del backend:', error);
        // Manejar errores
      }
    };




    const renderChartCutr2 = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/report-then`, headers);
        const dataFromBackend = response.data;

        const seriesMega = [];
        const categories = ['Rango de ingresos']; // Definir una sola categoría "Total"

        for (const rangosIngreso in dataFromBackend.familias_por_rango_ingreso) {
          const tipoData = dataFromBackend.familias_por_rango_ingreso[rangosIngreso];
          seriesMega.push({
            name: rangosIngreso,
            data: [tipoData.total]
          });
        }

        const options = {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: categories,
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return Math.round(val);
              }
            },
            title: {
              text: 'Total'
            }
          },
          title: {
            text: 'Cantidad de familias por rango de ingreso mensual',
            align: 'center',
            style: {
              fontSize: '20px',
            },
          },
          series: seriesMega,
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return `Total: ${val}`;
              }
            }
          }
        };

        const chart = new ApexCharts(document.querySelector('#chartSuperGa1313'), options);
        chart.render();

      } catch (error) {
        console.error('Error al obtener los datos del backend:', error);
        // Manejar errores
      }
    };






    onMounted(async () => {
      renderChartCutr2();
      renderChartCutr();
      renderMyChart2();
      renderMyChart3();
      renderMyChart4();
      renderMyChart5();
      renderMyChart6();
      renderMyChart();
      renderGraficX2();
      renderChartXd()
      fetchData3();
      fetchData();
      fetchData2();
      if (chartRef.value) {
        chartRef.value.toggleSeries('nombre_de_la_serie');
      }


    });

    return {
      chartData,
      customSeries,
      customChartOptions,
      chartRef,
      headers,
      series,
      series2,
      series4,
      series5,
      series6,
      series7,
      seriesMega,
      labels,
      labels2,
      chartOptions,
      chartOptions2,
      chartOptions3,
      chartOptions4,
      chartOptions5,
      chartOptions6,
      chartOptions7,
      chartOptionsMega,
      chartSeries3
    };
  },
});
</script>

<template>
  <div class="nk-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <div id="chart"></div>
        </div>
        <div class="col-md-6">
          <div id="chart1"></div>
        </div>
        <div class="col-md-6"> <!-- Nueva columna -->
          <div id="chart2">
            <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
          </div> <!-- Nuevo div dentro de la columna -->
        </div>
        <div class="col-md-6"> <!-- Otra nueva columna -->
          <div id="chart3">
            <apexchart ref="chart" type="bar" height="350" :options="customChartOptions" :series="customSeries" />
          </div> <!-- Nuevo div dentro de la columna -->
        </div>


        <div class="col-md-6"> <!-- Otra nueva columna -->
          <div id="chart3">
            <apexchart type="bar" height="350" :options="chartOptions6" :series="series6"></apexchart>
          </div> <!-- Nuevo div dentro de la columna -->
        </div>


        <div class="col-md-6"> <!-- Otra nueva columna -->
          <div id="chart3">
            <apexchart ref="chart" type="bar" :options="chartOptions3" :series="chartSeries3" />
          </div> <!-- Nuevo div dentro de la columna -->
        </div>



        <div class="col-md-6"> <!-- Otra nueva columna -->
          <div id="RenderizaElGrafico">
          </div> <!-- Nuevo div dentro de la columna -->
        </div>

        <div class="col-md-6"> <!-- Otra nueva columna -->
          <div id="chart10">
          </div> <!-- Nuevo div dentro de la columna -->
        </div>

        <div class="col-md-6"> <!-- Otra nueva columna -->
          <div id="chart11">
          </div> <!-- Nuevo div dentro de la columna -->
        </div>



        <div class="col-md-6"> <!-- Otra nueva columna -->
          <div id="chartSuperGa333">
          </div>
        </div>

        <div class="col-md-6"> <!-- Otra nueva columna -->
          <div id="chartSuperGa1313">
          </div>
        </div>


        <div class="col-md-12"> <!-- Otra nueva columna -->
          <div id="chartContainerGa">
          </div> <!-- Nuevo div dentro de la columna -->
        </div>

        <div class="col-md-12"> <!-- Otra nueva columna -->
          <div id="chartSuperGa">
          </div> <!-- Nuevo div dentro de la columna -->
        </div>

        
        <div class="col-md-12"> <!-- Otra nueva columna -->
          <div id="chartSuperGa22">
          </div> <!-- Nuevo div dentro de la columna -->
        </div>


        
        <div class="col-md-12"> <!-- Otra nueva columna -->
          <div id="chartSuperGa222">
          </div> <!-- Nuevo div dentro de la columna -->
        </div>


        
        <div class="col-md-12"> <!-- Otra nueva columna -->
          <div id="chartSuperGa2222">
          </div> <!-- Nuevo div dentro de la columna -->
        </div>

        
        <div class="col-md-12"> <!-- Otra nueva columna -->
          <div id="chartSuperGa22222">
          </div> <!-- Nuevo div dentro de la columna -->
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



.fs-14 {
  font-size: 14px;
}



.border-vg {
  border: 1px solid #d2d2d2;
  border-radius: 15px;
}


/* cards height y width */
.h-vg {
  height: 150px;
  /* O cualquier valor que desees */
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
