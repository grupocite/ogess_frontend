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
  <div class="container-fluid mt-5">

    
    <div class="card mt-5">
        <div class="card-body">
          
            <form>
                <div class="row">
                    <div class="col-md-6">
                        <input type="text" class="form-control" placeholder="Encuestador">
                    </div>
                    <div class="col-md-2">
                        <input type="text" class="form-control" placeholder="Fecha">
                    </div>
                </div>
            </form>

            <form>
                <div class="row mt-4">
                    <div class="col-md-3">
                        <input type="text" class="form-control" placeholder="Unidad Ejecutora">
                    </div>
                    <div class="col-md-3">
                        <input type="text" class="form-control" placeholder="Red Salud">
                    </div>
                    <div class="col-md-3">
                        <input type="text" class="form-control" placeholder="Micro redes">
                    </div>
                    <div class="col-md-3">
                        <input type="text" class="form-control" placeholder="Establecimiento de Salud">
                    </div>
                </div>
            </form>
             
             
        </div>
    </div>
  </div>

    <div class="card mt-5">
        <div class="card-body"> 
          <ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link active" data-bs-toggle="tab" data-bs-target="#persona">Persona</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" data-bs-toggle="tab" data-bs-target="#familia">Familia</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" data-bs-toggle="tab" data-bs-target="#riesgo">Riesgo</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" data-bs-toggle="tab" data-bs-target="#dimension">Dimensión</a>
  </li>
</ul>

<div class="tab-content">
  <div class="tab-pane active" id="persona">
    <!-- Contenido de la pestaña Persona -->

    <div class="card mt-5">
        <div class="card-body">
          
            <form>
                <div class="row">
                    <div class="col-md-2">
                        <input type="text" class="form-control" placeholder="DNI">
                    </div>
                    <div class="col-md-2">
                        <input type="text" class="form-control" placeholder="Fecha de nacimiento">
                    </div>
                    <div class="col-md-2">
                        <input type="text" class="form-control" placeholder="Edad">
                    </div>
                    <div class="col-md-2">
                      <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck">
      <label class="form-check-label" for="gridCheck">
        Jefe de familia
      </label>
    </div>
                    </div>
                </div>
            </form>

            <form>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <input type="text" class="form-control" placeholder="Nombres">
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control" placeholder="Apellidos">
                    </div>
                </div>
            </form>


            <form>
              <div class="form-group col-md-2 mt-3">
    <label for="exampleFormControlSelect1">Grado de instrucción</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Primaria</option>
      <option>Segundaria</option>
      <option>Universidad</option>
    </select>
  </div>

  <div class="form-group">
    
    <div class="mt-3 col-md-4">
    <label for="exampleFormControlSelect1">Ocupación</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>add</option>
    </select>
  </div>

  </div>

  <div class="mt-3 col-md-4">
    <label for="exampleFormControlSelect1">Estado</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Soltero</option>
      <option>Casado</option>
      <option>Conviviente</option>
      <option>Divorciado</option>
    </select>
  </div>
  <div class="mt-3 col-md-4">
    <label for="exampleFormControlSelect1">Religión</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Católico</option>
      <option>Evangelio</option>
      <option>Adventista</option>
      <option>Otro</option>
    </select>
  </div>
  <div class="mt-3 col-md-4">
    <label for="exampleFormControlSelect1">Seguro</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Essalud</option>
      <option>SIS</option>
      <option>Sin seguro</option>
      <option>Otro</option>
    </select>
  </div>

  <button class="btn btn-primary mt-5">
  <i class="fa fa-plus"></i> Nuevo registro
</button>

            </form>
            
        </div>
    </div>

    <table class="table mt-5">
  <thead>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">DNI</th>
      <th scope="col">Acción</th>
    </tr>
  </thead>
  <tbody>
    <!-- Aquí puedes agregar las filas con los datos que quieras -->
    <tr>
      <td>Juan</td>
      <td>Pérez</td>
      <td>12345678</td>
      <td>EDITAR ELIMINAR</td>
    </tr>
  </tbody>
</table>


  </div>



  <div class="tab-pane" id="familia">
     <!-- Contenido de la pestaña Familia -->
     <div class="card mt-5">
        <div class="card-body">
          <div class="alert alert-success" role="alert">
  <h4 class="alert-heading">Datos de la Familia</h4>
</div>

<div class="row">
  <div class="col-md-6">
    <div class="form-group mt-3">
      <label for="nombreFamilia">Nombre de familia</label>
      <input type="text" class="form-control" id="nombreFamilia" placeholder="Ejemplo Mori">
    </div>
  </div>
</div>


            <form>
                <div class="row mt-4">
                    <div class="col-md-2">
                      <label for="exampleFormControlSelect1">Niños(as) O a 11 años</label>
                        <input type="int" class="form-control" placeholder="Número">
                    </div>
                    <div class="col-md-2">
                      <label for="exampleFormControlSelect1">Adolecentes 12 a 17 años</label>
                        <input type="text" class="form-control" placeholder="Número">
                    </div>
                    <div class="col-md-2">
                      <label for="exampleFormControlSelect1">Jóvenes 18 a 29 años</label>
                        <input type="text" class="form-control" placeholder="Número">
                    </div>
                    <div class="col-md-2">
                      <label for="exampleFormControlSelect1">Adulto 30 a 59 años</label>
                        <input type="text" class="form-control" placeholder="Número">
                    </div>
                    <div class="col-md-2">
                      <label for="exampleFormControlSelect1">Adulto mayor a 60 años</label>
                        <input type="text" class="form-control" placeholder="Número">
                    </div>
                </div>
                <div class="form-group mt-3">
    <label for="exampleFormControlTextarea1">Nombres, Apellidos de las Personas que viven en casa y sexo, que parentesco tiene con el jefe del hogar?</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
            </form>
             

            <div class="alert alert-success mt-5" role="alert">
  <h4 class="alert-heading">CARACTERÍSTICAS</h4>
</div>
          
<div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">EI tipo de vivienda esta construida con:</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Material Rústico (Pared de madera, Piso tierra, techo calamina)</option>
      <option>Material Noble (Ladrillo y Cemento, ceramica)</option>
      <option>Material Chosa (paredes cañabra, etc)</option>    
    </select>
  </div>


  <form>
    <div class="row mt-4">
      <div class="col-md-3">
                      <label for="exampleFormControlSelect1">Cuantas Habitaciones tiene en su vivienda</label>
                        <input type="text" class="form-control" placeholder="Número">
                    </div>
    </div>
  </form>

  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">Las habitaciones son compartidas, es decir duermen mas de 1 persona</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Si</option>
      <option>No</option> 
    </select>
  </div>


  <div class="form-group mt-3">
    <label for="exampleFormControlTextarea1">Describe</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>


  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">Tiene destinado alguna habitacion para alamacenamiento,
conservación, manipulación y consumo de alimentos</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Si</option>
      <option>No</option> 
    </select>
  </div>

  <div class="form-group mt-3">
    <label for="exampleFormControlTextarea1">Detalle</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>


  
  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">Usted visualiza algun daño en su vivienda que tiene algun riesgo que podria afectar a su familia</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Si</option>
      <option>No</option> 
    </select>
  </div>


  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">La eliminacion de Excrementos o deposiciones 10 hace en :</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Aire libre</option>
      <option>Letrina</option>
      <option>Acequia y/o Canal</option> 
      <option>Red publica(desague)</option> 
      <option>Pozo Septico</option> 
      <option>Otros</option>   
    </select>
  </div>

  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">La eliminacion de los desechos y/o basura 10 hace en :</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Carro recolectos</option>
      <option>Campo Abierto</option>
      <option>AI rio y/o canal</option> 
      <option>Se entirra y quema</option> 
      <option>Pozo</option> 
      <option>Otros</option>   
    </select>
  </div>
      
  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">Que servicios basicos, tiene instalado en su vivienda :</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Teléfono</option>
      <option>Internet</option>
      <option>Cable</option> 
      <option>Electricidad</option> 
      <option>Agua y Desague</option> 
      <option>Otros</option>   
    </select>
  </div>
  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">Cómo se abastece de agua para su consumo</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>1.-Agua con Tratamiento(Potable, reservorio, etc), dentro de la vivienda</option>
      <option>2.-Agua con Tratamiento(Potable, reservorio, etc), fuera de la vivienda</option>
      <option>3.-Agua sin tramiento(Tanque, canal, Cisterna, rio, etc)</option> 
    </select>
  </div>


  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">Para preparar sus alimentos usted usa :</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Cocina a gas</option>
      <option>Cocina mejorada</option>
      <option>Cocina a Corriente</option> 
      <option>Tushpa, leña</option> 
      <option>Otros</option>   
    </select>
  </div>

  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">Cuál es el medio de conexión del fluido eléctrico</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Instalado por electrooriente</option>
      <option>Bateria</option>
      <option>panel solar</option> 
      <option>conexión clandestina</option> 
    </select>
  </div>

  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">Para el traslado interno o fuera de su sector, usted tiene una movilidad motorizada</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Motocicleta</option>
      <option>Mototaxi</option>
      <option>Carro</option> 
      <option>Otro</option> 
    </select>
  </div>

  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">Tienen algún tipo de Animal domestico en su vivienda</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Perro</option>
      <option>Gato</option>
      <option>Otro</option> 
    </select>
  </div>


  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">Cuenta con las vacunas respectivas</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Si</option>
      <option>No</option>
    </select>
  </div>


  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">Cria algun tipo de animal que contribuya con un ingreso adicional en su familia</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Cuyes</option>
      <option>Cerdos</option>
      <option>Aves de corral</option>
      <option>Vacas</option>
      <option>Solo tengo para mi consumo como parte de mis alimentos</option>
    </select>
  </div>


  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">Cuenta con Botiquin o mochila de emergencia en caso de algun accidente leve</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Si</option>
      <option>No</option>
    </select>
  </div>


  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">Existen Parques de sector</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Si</option>
      <option>No</option>
    </select>
  </div>

  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">Existen areas verdes dentro de su sector</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Si</option>
      <option>No</option>
    </select>
  </div>
  
  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">Cree usted que en su localidad existe contaminación al aire</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Si</option>
      <option>No</option>
    </select>
  </div>

  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">En su sector percibe malos olores</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Si</option>
      <option>No</option>
    </select>
  </div>


  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">Participa usted en faenas comunales de limpieza de su sector</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Si</option>
      <option>No</option>
    </select>
  </div>


  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">Cree usted que en sus actividades rutinaria contribuye a la contaminación y degradación ambiental</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Si</option>
      <option>No</option>
    </select>
  </div>


  
  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">Para el traslado interno o fuera de su sector, usted tiene una movilidad motorizada</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Deforestación</option>
      <option>Contaminación del rio</option>
    </select>
  </div>

  <div class="form-group mt-3">
    <label for="exampleFormControlTextarea1">Describa</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>


  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">usted estaría dispuesto a pagar una tarifa para ayudar a conservar el medio ambiente</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Si</option>
      <option>No</option>
    </select>
  </div>


  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">Cree usted que en su sector la población tiene conciencia ambiental</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Si</option>
      <option>No</option>
    </select>
  </div>
  <div class="mt-3 col-md-5">
    <label for="exampleFormControlSelect1">Si en su sector se difundiera sobre actividades de reforestacion, Usted participaría activamente</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Si</option>
      <option>No</option>
    </select>
  </div>


  <button class="btn btn-success mt-5">
  <i class="fa fa-save"></i> Guardar
</button>
        </div>
    </div>

  </div>
  <div class="tab-pane" id="riesgo">
    <!-- Contenido de la pestaña Riesgo -->

    <div class="card">
  <div class="card-body">


    <div class="alert alert-success" role="alert">
  <h4 class="alert-heading">IDENTIFICACION DE LOS RIESGOS DE LA FAMILIA SEGÚN ETAPA</h4>
  <hr>
  <p class="mb-0">EN LA ETAPA 0-11 AÑOS</p>
</div>

    
<form>
  <p class="mb-0">Tiene su niño/s que nació con bajo peso?</p>
  <div class="row mt-2">
    <div class="col-md-1">
      <div class="form-check">
        <input type="radio" class="form-check-input" id="checkSi" name="opcion" value="si">
        <label class="form-check-label" for="checkSi">Si</label> 
      </div>
    </div>
    <div class="col-md-1">
      <div class="form-check">
        <input type="radio" class="form-check-input" id="checkNo" name="opcion" value="no">
        <label class="form-check-label" for="checkNo">No</label>
      </div>
    </div>
    <div class="col-md-3">
      <input type="text" class="form-control" placeholder="Nombre completo">
    </div>
    <div class="col-md-3">
      <input type="number" class="form-control" placeholder="Edad">
    </div>
    <div class="col-md-3">
      <input type="number" class="form-control" placeholder="DNI">
    </div>
  </div>
</form>




<form>
  <p class="mb-0">Su Niño/a nació antes de la fecha de Probable Parto</p>
  <div class="row mt-2">
    <div class="col-md-1">
      <div class="form-check">
        <input type="radio" class="form-check-input" id="checkSi" name="opcion" value="si">
        <label class="form-check-label" for="checkSi">Si</label> 
      </div>
    </div>
    <div class="col-md-1">
      <div class="form-check">
        <input type="radio" class="form-check-input" id="checkNo" name="opcion" value="no">
        <label class="form-check-label" for="checkNo">No</label>
      </div>
    </div>
    <div class="col-md-3">
      <input type="text" class="form-control" placeholder="Nombre completo">
    </div>
    <div class="col-md-3">
      <input type="number" class="form-control" placeholder="Edad">
    </div>
    <div class="col-md-3">
      <input type="number" class="form-control" placeholder="DNI">
    </div>
  </div>
</form>


<form>
  <p class="mb-0">Donde Nacio</p>
  <div class="row mt-4">
    <div class="col-md-4">
      <div class="form-check">
        <input type="radio" class="form-check-input" id="checkSi" name="opcion" value="si">
        <label class="form-check-label" for="checkSi">Domicilio del Sector</label> 
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-check">
        <input type="radio" class="form-check-input" id="checkNo" name="opcion" value="no">
        <label class="form-check-label" for="checkNo">Centro de Salud</label>
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-check">
        <input type="radio" class="form-check-input" id="checkNo" name="opcion" value="no">
        <label class="form-check-label" for="checkNo">Hospital</label>
      </div>
    </div>

  </div>
</form>




    
  </div>
</div>


  </div>
  <div class="tab-pane" id="dimension">
    <!-- Contenido de la pestaña Dimensión -->
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
