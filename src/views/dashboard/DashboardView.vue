<script lang="ts">
import { ref, computed, defineComponent, onMounted, watch, reactive } from 'vue'
import axios from 'axios'
import type { EstadoCivil } from '@/model/Type'
import type { GradoInstruccion } from '@/model/Type'
import type { Religion } from '@/model/Type'
import type { SeguroSalud } from '@/model/Type'
import type { Ocupacion } from '@/model/Type'
import { useAuth } from '../../stores/auth'
import { Modal } from 'bootstrap'

declare const bootstrap: any

export default defineComponent({
  setup() {
    const estadoCivil = ref<Array<EstadoCivil>>([])
    const gradoInstruccion = ref<Array<GradoInstruccion>>([])
    const religion = ref<Array<Religion>>([])
    const seguroSalud = ref<Array<SeguroSalud>>([])
    const ocupaciones = ref<Array<Ocupacion>>([])
    const searchTerm = ref('')
    const searchDNI = ref('')

    const formData = ref({
      fechaNacimiento: '',
      edad: '',
      pers_nombres: '',
      apellidos: '',
      ocupacion: '',
      estadoCivil: '',
      religion: '',
      seguroSalud: ''
    })

    // Define la lógica para ocultar el campo DNI aquí
    const opcion = ref('si') // Valor por defecto "Si"

    const toggleDniField = (value: string) => {
      if (value === 'no') {
        // Ocultar el campo DNI
        // Puedes hacerlo manipulando la variable chartOptions u otras referencias necesarias
      } else {
        // Mostrar el campo DNI
        // Puedes hacerlo manipulando la variable chartOptions u otras referencias necesarias
      }
    }

    const nombres = ref('')
    const apellidos = ref('')
    const fechaNacimiento = ref('')
    const edad = ref<number | null>(null)
    const tableData = ref([])

    const headers = useAuth().headers()

    const fetchEstadoCivil = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/estado-civil/list`,
          headers
        )
        estadoCivil.value = response.data

        console.log(estadoCivil.value)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    const fetchGradoInstruccion = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/grado-instruccion/list`,
          headers
        )
        gradoInstruccion.value = response.data

        console.log(gradoInstruccion.value)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    const fetchReligion = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/religion/list`, headers)
        religion.value = response.data

        console.log(religion.value)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }


    const calcularEdad = () => {
      if (fechaNacimiento.value) {
        const fechaNacimientoDate = new Date(fechaNacimiento.value)
        const fechaActual = new Date()
        const edadCalculada = fechaActual.getFullYear() - fechaNacimientoDate.getFullYear()
        edad.value = edadCalculada
        console.log(edad.value)
      } else {
        edad.value = null
      }
    }

    const fetchSeguroSalud = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/seguro-salud/list`,
          headers
        )
        seguroSalud.value = response.data

        console.log(seguroSalud.value)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/ocupacion/list`, {
          params: { search: searchTerm.value },
          ...headers
        })

        ocupaciones.value = response.data.data
      } catch (error) {
        console.error('Error al obtener datos:', error)
      }
    }

    const openAddOccupationModal = () => {
      const myModalElement = document.getElementById('personalizado')
      if (myModalElement) {
        const myModal = new Modal(myModalElement, { backdrop: false })
        myModal.show()
      }
    }

    const filteredOccupations = computed(() => {
      return ocupaciones.value.filter((occupation) => {
        return occupation.ocup_nombre.toLowerCase().includes(searchTerm.value.toLowerCase())
      })
    })

    const searchByDNI = () => {
      const dni = searchDNI.value
      axios
        .get(`${import.meta.env.VITE_API_URL}/apidni/${dni}`)
        .then((response) => {
          console.log(response)
          nombres.value = response.data.nombres
          apellidos.value = `${response.data.apellidoPaterno} ${response.data.apellidoMaterno}`
        })
        .catch((error) => {
          console.error(error)
        })
    }

    watch(searchTerm, () => {
      fetchData()
    })

    onMounted(async () => {
      fetchEstadoCivil()
      fetchGradoInstruccion()
      fetchReligion()
      fetchSeguroSalud()
      fetchData()
    })

    return {
      tableData,
      gradoInstruccion,
      estadoCivil,
      religion,
      searchTerm,
      formData,
      toggleDniField, // La función para cambiar la visibilidad del campo DNI
      opcion, // La referencia para el radio button

      filteredOccupations,
      seguroSalud,
      searchDNI,
      searchByDNI,
      fechaNacimiento,
      edad,
      calcularEdad,
      ocupaciones,
      nombres,
      openAddOccupationModal,
      apellidos,
      headers
    }
  }
})
</script>

<template>
  <div class="container-fluid mt-5">
    <div class="card mt-5">
      <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <input type="text" class="form-control" placeholder="Encuestador" />
            </div>
            <div class="col-md-2">
              <input type="text" class="form-control" placeholder="Fecha" />
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-md-3">
              <input type="text" class="form-control" placeholder="Unidad Ejecutora" />
            </div>
            <div class="col-md-3">
              <input type="text" class="form-control" placeholder="Red Salud" />
            </div>
            <div class="col-md-3">
              <input type="text" class="form-control" placeholder="Micro redes" />
            </div>
            <div class="col-md-3">
              <input type="text" class="form-control" placeholder="Establecimiento de Salud" />
            </div>
          </div>
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
                <div class="row">
                  <div class="col-md-2">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="DNI"
                        v-model="searchDNI"
                      />
                      <div class="input-group-append">
                        <button class="btn btn-primary" @click.prevent="searchByDNI">
                          <i class="fas fa-search"></i>
                          <!-- Usando FontAwesome como ejemplo -->
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <input
                      type="date"
                      class="form-control"
                      placeholder="Fecha de nacimiento"
                      v-model="fechaNacimiento"
                      @input="calcularEdad"
                    />
                  </div>
                  <div class="col-md-2">
                    <input type="number" class="form-control" placeholder="Edad" v-model="edad" />
                  </div>
                  <div class="col-md-2">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="gridCheck" />
                      <label class="form-check-label" for="gridCheck"> Jefe de familia </label>
                    </div>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-md-6">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Nombres"
                      v-model="nombres"
                    />
                  </div>
                  <div class="col-md-6">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Apellidos"
                      v-model="apellidos"
                    />
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="row">
                    <div class="form-group col-md-6 mt-3">
                      <label for="exampleFormControlSelect1">Ocupación</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="fa fa-search"></i>
                          </span>
                        </div>
                        <input
                          v-model="searchTerm"
                          class="form-control"
                          placeholder="Buscar ocupación"
                        />
                      </div>
                      <select class="form-control mt-3">
                        <option value="">Selecciona una ocupación</option>
                        <option
                          v-for="occupation in filteredOccupations"
                          :key="occupation.id"
                          :value="occupation.id"
                        >
                          {{ occupation.ocup_nombre }}
                        </option>
                      </select>
                    </div>

                    <div class="form-group col-md-4 mt-3">
                      <div class="d-flex align-items-center mt-3">
                        <span class="mr-2 ml-3">Crear nuevo</span>
                        <!-- Agregamos ml-3 para margen izquierdo -->
                        <button class="btn btn-primary" @click.prevent="openAddOccupationModal">
                          <i class="fa fa-plus"></i>
                          <!-- Puedes cambiar el icono si lo deseas -->
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="mt-3 col-md-4">
                    <label for="exampleFormControlSelect1">Estado</label>
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option v-for="estado in estadoCivil.data" :key="estado.id">
                        {{ estado.esci_nombre }}
                      </option>
                    </select>
                  </div>

                  <div class="mt-3 col-md-4">
                    <label for="exampleFormControlSelect1">Grado de instrucción</label>
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option v-for="grado in gradoInstruccion.data" :key="grado.id">
                        {{ grado.grain_nombre }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group"></div>
                <div class="row mt-3">
                  <div class="mt-3 col-md-4">
                    <label for="exampleFormControlSelect1">Religion</label>
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option v-for="religion2 in religion.data" :key="religion.id">
                        {{ religion2.reli_nombre }}
                      </option>
                    </select>
                  </div>
                  <div class="mt-3 col-md-4">
                    <label for="exampleFormControlSelect1">Seguro</label>
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option v-for="estado in seguroSalud.data" :key="estado.id">
                        {{ estado.sesa_nombre }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="mt-3 col-md-4"></div>

                <button class="btn btn-primary mt-5">
                  <i class="fa fa-plus"></i> Nuevo registro
                </button>
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
                    <input
                      type="text"
                      class="form-control"
                      id="nombreFamilia"
                      placeholder="Ejemplo Mori"
                    />
                  </div>
                </div>
              </div>

                <div class="row mt-4">
                  <div class="col-md-2">
                    <label for="exampleFormControlSelect1">Niños(as) O a 11 años</label>
                    <input type="int" class="form-control" placeholder="Número" />
                  </div>
                  <div class="col-md-2">
                    <label for="exampleFormControlSelect1">Adolecentes 12 a 17 años</label>
                    <input type="text" class="form-control" placeholder="Número" />
                  </div>
                  <div class="col-md-2">
                    <label for="exampleFormControlSelect1">Jóvenes 18 a 29 años</label>
                    <input type="text" class="form-control" placeholder="Número" />
                  </div>
                  <div class="col-md-2">
                    <label for="exampleFormControlSelect1">Adulto 30 a 59 años</label>
                    <input type="text" class="form-control" placeholder="Número" />
                  </div>
                  <div class="col-md-2">
                    <label for="exampleFormControlSelect1">Adulto mayor a 60 años</label>
                    <input type="text" class="form-control" placeholder="Número" />
                  </div>
                </div>
                <div class="form-group mt-3"></div>

              <div class="alert alert-success mt-5" role="alert">
                <h4 class="alert-heading">CARACTERÍSTICAS</h4>
              </div>

              <div class="mt-4 col-md-12">
                <label>El tipo de vivienda está construida con:</label>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="form-checky">
                    <input
                      type="radio"
                      name="tipoVivienda"
                      id="radioMaterialRustico"
                      value="Material Rústico"
                    />
                    Material Rústico (Pared de madera, Piso tierra, techo calamina)
                  </label>
                  <label class="form-check">
                    <input
                      type="radio"
                      name="tipoVivienda"
                      id="radioMaterialNoble"
                      value="Material Noble"
                    />
                    Material Noble (Ladrillo y Cemento, cerámica)
                  </label>
                  <label class="form-check">
                    <input
                      type="radio"
                      name="tipoVivienda"
                      id="radioMaterialChosa"
                      value="Material Chosa"
                    />
                    Material Chosa (paredes cañabrava, etc)
                  </label>
                </div>
              </div>

              <div class="row mt-4">
                <div class="col-md-4">
                  <label for="exampleFormControlSelect1"
                    >Cuantas Habitaciones tiene en su vivienda</label
                  >
                  <input type="text" class="form-control" placeholder="Número" />
                </div>

                <div class="col-md-6">
                  <label>Las habitaciones son compartidas, es decir duermen más de 1 persona</label>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="form-check">
                      <input type="radio" name="compartidas" value="Si" /> Si
                    </label>
                    <label class="form-check">
                      <input type="radio" name="compartidas" value="No" /> No
                    </label>
                  </div>
                </div>
              </div>

              <div class="form-group mt-3">
                <label for="exampleFormControlTextarea1">Describe como son compartidas</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>

              <div class="mt-3 col-md-5">
                <label
                  >Tiene destinado alguna habitación para almacenamiento, conservación, manipulación
                  y consumo de alimentos</label
                >
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="form-check">
                    <input type="radio" name="tieneHabitacionAlmacenamiento" value="Si" /> Si
                  </label>
                  <label class="form-check">
                    <input type="radio" name="tieneHabitacionAlmacenamiento" value="No" /> No
                  </label>
                </div>
              </div>

              <div class="form-group mt-3">
                <label for="exampleFormControlTextarea1">Detalle</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>

              <div class="row mt-4">
                <div class="col-md-4">
                  <label
                    >Usted visualiza algún daño en su vivienda que tiene algún riesgo que podría
                    afectar a su familia</label
                  >
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn form-check">
                      <input type="radio" name="visualizaDanio" value="Si" /> Si
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="visualizaDanio" value="No" /> No
                    </label>
                  </div>
                </div>

                <div class="col-md-8">
                  <label>La eliminación de Excrementos o deposiciones se hace en:</label>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn form-check">
                      <input type="radio" name="eliminacionExcrementos" value="Aire libre" /> Aire
                      libre
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="eliminacionExcrementos" value="Letrina" /> Letrina
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="eliminacionExcrementos" value="Acequia y/o Canal" />
                      Acequia y/o Canal
                    </label>
                    <label class="btn form-check">
                      <input
                        type="radio"
                        name="eliminacionExcrementos"
                        value="Red pública (desagüe)"
                      />
                      Red pública (desagüe)
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="eliminacionExcrementos" value="Pozo Séptico" /> Pozo
                      Séptico
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="eliminacionExcrementos" value="Otros" /> Otros
                    </label>
                  </div>
                </div>
              </div>

              <div class="mt-3 col-md-10">
                <label>La eliminación de los desechos y/o basura se hace en:</label>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="btn form-check">
                    <input type="radio" name="eliminacionDesechos" value="Carro recolector" /> Carro
                    recolector
                  </label>
                  <label class="btn form-check">
                    <input type="radio" name="eliminacionDesechos" value="Campo Abierto" /> Campo
                    Abierto
                  </label>
                  <label class="btn form-check">
                    <input type="radio" name="eliminacionDesechos" value="Al río y/o canal" /> Al
                    río y/o canal
                  </label>
                  <label class="btn form-checky">
                    <input type="radio" name="eliminacionDesechos" value="Se entierra y quema" /> Se
                    entierra y quema
                  </label>
                  <label class="btn form-check">
                    <input type="radio" name="eliminacionDesechos" value="Pozo" /> Pozo
                  </label>
                  <label class="btn form-check">
                    <input type="radio" name="eliminacionDesechos" value="Otros" /> Otros
                  </label>
                </div>
              </div>

              <div class="mt-3 col-md-10"></div>

              <div class="mt-3 col-md-13">
                <label>¿Qué servicios básicos tiene instalados en su vivienda?</label>
                <p></p>
                <div class="form-check form-check-inline">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="telefonoCheckbox"
                    value="Teléfono"
                    name="serviciosBasicos"
                  />
                  <label class="form-check-label" for="telefonoCheckbox">Teléfono</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="internetCheckbox"
                    value="Internet"
                    name="serviciosBasicos"
                  />
                  <label class="form-check-label" for="internetCheckbox">Internet</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="cableCheckbox"
                    value="Cable"
                    name="serviciosBasicos"
                  />
                  <label class="form-check-label" for="cableCheckbox">Cable</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="electricidadCheckbox"
                    value="Electricidad"
                    name="serviciosBasicos"
                  />
                  <label class="form-check-label" for="electricidadCheckbox">Electricidad</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="aguaDesagueCheckbox"
                    value="Agua y Desagüe"
                    name="serviciosBasicos"
                  />
                  <label class="form-check-label" for="aguaDesagueCheckbox">Agua y Desagüe</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="otrosCheckbox"
                    value="Otros"
                    name="serviciosBasicos"
                  />
                  <label class="form-check-label" for="otrosCheckbox">Otros</label>
                </div>
              </div>

              <div class="mt-3 col-md-10">
                <label>La eliminación de los desechos y/o basura se hace en:</label>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="btn form-check">
                    <input type="radio" name="cocinaGas" value="cocina" /> Cocina a gas
                  </label>
                  <label class="btn form-check">
                    <input type="radio" name="cocinaGas" value="cocinam" /> Cocina mejorada
                  </label>
                  <label class="btn form-check">
                    <input type="radio" name="cocinaGas" value="cocinaC" /> Cocina a Corriente
                  </label>
                  <label class="btn form-checky">
                    <input type="radio" name="cocinaGas" value="ushpa" /> Tushpa, leña
                  </label>
                  <label class="btn form-check">
                    <input type="radio" name="cocinaGas" value="otros" /> Otros
                  </label>
                </div>

                <div class="mt-3 col-md-10">
                  <label>Estado</label>
                  <p></p>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn form-check">
                      <input type="radio" name="estadoCivil" value="soltero" /> Soltero
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="estadoCivil" value="casado" /> Casado
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="estadoCivil" value="conviviente" /> Conviviente
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="estadoCivil" value="divorciado" /> Divorciado
                    </label>
                  </div>
                </div>
              </div>

              <div class="mt-3 col-md-10">
                <label for="exampleFormControlSelect1"
                  >Para preparar sus alimentos usted usa :</label
                >
                <p></p>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="btn form-check">
                    <input type="radio" name="cocinaGas" value="cocina" /> Cocina a gas
                  </label>
                  <label class="btn form-check">
                    <input type="radio" name="cocinaGas" value="cocinam" /> Cocina mejorada
                  </label>
                  <label class="btn form-check">
                    <input type="radio" name="cocinaGas" value="cocinaC" /> Cocina a Corriente
                  </label>
                  <label class="btn form-checky">
                    <input type="radio" name="cocinaGas" value="ushpa" /> Tushpa, leña
                  </label>
                  <label class="btn form-check">
                    <input type="radio" name="cocinaGas" value="otros" /> Otros
                  </label>
                </div>
              </div>
              <div class="mt-3 col-md-10">
                <label>Cuál es el medio de conexión del fluido eléctrico</label>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="btn form-check">
                    <input
                      type="radio"
                      name="conexionElectrica"
                      value="instaladoPorElectrooriente"
                    />
                    Instalado por Electrooriente
                  </label>
                  <label class="btn form-check">
                    <input type="radio" name="conexionElectrica" value="bateria" /> Batería
                  </label>
                  <label class="btn form-check">
                    <input type="radio" name="conexionElectrica" value="panelSolar" /> Panel Solar
                  </label>
                  <label class="btn form-check">
                    <input type="radio" name="conexionElectrica" value="conexionClandestina" />
                    Conexión Clandestina
                  </label>
                </div>
              </div>

              <div class="row mt-3">
                <div class="mt-3 col-md-7">
                  <label
                    >Para el traslado interno o fuera de su sector, usted tiene una movilidad
                    motorizada</label
                  >
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn form-check">
                      <input type="radio" name="movilidadMotorizada" value="motocicleta" />
                      Motocicleta
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="movilidadMotorizada" value="mototaxi" /> Mototaxi
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="movilidadMotorizada" value="carro" /> Carro
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="movilidadMotorizada" value="otro" /> Otro
                    </label>
                  </div>
                </div>
                <div class="mt-3 col-md-4">
                  <label>Tienen algún tipo de Animal doméstico en su vivienda</label>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn form-check">
                      <input type="radio" name="animalDomestico" value="perro" /> Perro
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="animalDomestico" value="gato" /> Gato
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="animalDomestico" value="otro" /> Otro
                    </label>
                  </div>
                </div>
              </div>

              <div class="mt-3 col-md-5">
                <label>Cuenta con las vacunas respectivas</label>
                <p></p>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="btn form-check">
                    <input type="radio" name="vacunas" value="si" /> Si
                  </label>
                  <label class="btn form-check">
                    <input type="radio" name="vacunas" value="no" /> No
                  </label>
                </div>
              </div>

              <div class="mt-3 col-md-9">
                <label
                  >Cria algún tipo de animal que contribuya con un ingreso adicional en su
                  familia</label
                >
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="btn form-check">
                    <input type="radio" name="criaAnimal" value="cuyes" /> Cuyes
                  </label>
                  <label class="btn form-check">
                    <input type="radio" name="criaAnimal" value="cerdos" /> Cerdos
                  </label>
                  <label class="btn form-check">
                    <input type="radio" name="criaAnimal" value="avesDeCorral" /> Aves de corral
                  </label>
                  <label class="btn form-check">
                    <input type="radio" name="criaAnimal" value="vacas" /> Vacas
                  </label>
                  <label class="btn form-check">
                    <input type="radio" name="criaAnimal" value="soloConsumo" /> Solo tengo para mi
                    consumo como parte de mis alimentos
                  </label>
                </div>
              </div>

              <div class="row mt-3">
                <div class="mt-3 col-md-4">
                  <label
                    >Cuenta con Botiquín o mochila de emergencia en caso de algún accidente
                    leve</label
                  >
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn form-check">
                      <input type="radio" name="botiquinEmergencia" value="si" /> Si
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="botiquinEmergencia" value="no" /> No
                    </label>
                  </div>
                </div>
                <div class="mt-3 col-md-4">
                  <label>Existen Parques en el sector</label>
                  <p></p>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn form-check">
                      <input type="radio" name="parquesSector" value="si" /> Si
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="parquesSector" value="no" /> No
                    </label>
                  </div>
                </div>
                <div class="mt-3 col-md-4">
                  <label>Existen áreas verdes dentro de su sector</label>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn form-check">
                      <input type="radio" name="areasVerdesSector" value="si" /> Si
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="areasVerdesSector" value="no" /> No
                    </label>
                    <p></p>
                  </div>
                </div>
              </div>

              <div class="row mt-3">
                <div class="mt-3 col-md-5">
                  <label>Cree usted que en su localidad existe contaminación al aire</label>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn form-check">
                      <input type="radio" name="contaminacionAire" value="si" /> Si
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="contaminacionAire" value="no" /> No
                    </label>
                  </div>
                </div>
                <div class="mt-3 col-md-7">
                  <label>En su sector percibe malos olores</label>
                  <p></p>

                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn form-check">
                      <input type="radio" name="malosOlores" value="si" /> Si
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="malosOlores" value="no" /> No
                    </label>
                  </div>
                </div>
              </div>

              <div class="row mt-3">
                <div class="mt-3 col-md-5">
                  <label>Participa usted en faenas comunales de limpieza de su sector</label>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn form-check">
                      <input type="radio" name="faenasComunales" value="si" /> Si
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="faenasComunales" value="no" /> No
                    </label>
                  </div>
                </div>
                <div class="mt-3 col-md-7">
                  <label
                    >Cree usted que en sus actividades rutinarias contribuye a la contaminación y
                    degradación ambiental</label
                  >
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn form-check">
                      <input type="radio" name="contaminacionAmbiental" value="si" /> Si
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="contaminacionAmbiental" value="no" /> No
                    </label>
                  </div>
                </div>
              </div>

              <div class="mt-3 col-md-5">
                <label
                  >Para el traslado interno o fuera de su sector, usted tiene una movilidad
                  motorizada</label
                >
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="btn form-check">
                    <input type="radio" name="movilidadMotorizada" value="deforestacion" />
                    Deforestación
                  </label>
                  <label class="btn form-check">
                    <input type="radio" name="movilidadMotorizada" value="contaminacionRio" />
                    Contaminación del río
                  </label>
                </div>
              </div>

              <div class="form-group mt-">
                <label for="exampleFormControlTextarea1">Describa</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>

              <div class="row mt-3">
                <div class="mt-3 col-md-7">
                  <label
                    >¿Usted estaría dispuesto a pagar una tarifa para ayudar a conservar el medio
                    ambiente?</label
                  >
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn form-check">
                      <input type="radio" name="pagarPorMedioAmbiente" value="si" /> Si
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="pagarPorMedioAmbiente" value="no" /> No
                    </label>
                  </div>
                </div>
                <div class="mt-3 col-md-5">
                  <label>Cree usted que en su sector la población tiene conciencia ambiental</label>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn form-check">
                      <input type="radio" name="concienciaAmbiental" value="si" /> Si
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="concienciaAmbiental" value="no" /> No
                    </label>
                  </div>
                </div>
              </div>

              <div class="mt-3 col-md-5">
                <label
                  >Si en su sector se difundiera sobre actividades de reforestación, ¿Usted
                  participaría activamente?</label
                >
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="btn form-check">
                    <input type="radio" name="participacionReforestacion" value="si" /> Si
                  </label>
                  <label class="btn form-check">
                    <input type="radio" name="participacionReforestacion" value="no" /> No
                  </label>
                </div>
              </div>

              <button class="btn btn-success mt-5"><i class="fa fa-save"></i> Guardar</button>
            </div>
          </div>
        </div>
        <div class="tab-pane" id="riesgo">
          <!-- Contenido de la pestaña Riesgo -->

          <div class="card">
            <div class="card-body">
              <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">
                  IDENTIFICACION DE LOS RIESGOS DE LA FAMILIA SEGÚN ETAPA
                </h4>
                <hr />
                <p class="mb-0">EN LA ETAPA 0-11 AÑOS</p>
              </div>

              <form>
                <p class="mb-0">Tiene su niño/s que nació con bajo peso?</p>
                <div class="row mt-2">
                  <div class="col-md-1">
                    <div class="form-check">
                      <input
                        type="radio"
                        class="form-check-input"
                        id="checkSi"
                        name="opcion"
                        value="si"
                      />
                      <label class="form-check-label" for="checkSi">Si</label>
                    </div>
                  </div>
                  <div class="col-md-1">
                    <div class="form-check">
                      <input
                        type="radio"
                        class="form-check-input"
                        id="checkNo"
                        name="opcion"
                        value="no"
                      />
                      <label class="form-check-label" for="checkNo">No</label>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Nombre completo" />
                  </div>
                  <div class="col-md-3">
                    <input type="number" class="form-control" placeholder="Edad" />
                  </div>
                  <div class="col-md-3">
                    <input type="number" class="form-control" placeholder="DNI" />
                  </div>
                </div>
              </form>

              <form>
                <p class="mb-0">Su Niño/a nació antes de la fecha de Probable Parto</p>
                <div class="row mt-2">
                  <div class="col-md-1">
                    <div class="form-check">
                      <input
                        type="radio"
                        class="form-check-input"
                        id="checkSi"
                        name="opcion"
                        value="si"
                      />
                      <label class="form-check-label" for="checkSi">Si</label>
                    </div>
                  </div>
                  <div class="col-md-1">
                    <div class="form-check">
                      <input
                        type="radio"
                        class="form-check-input"
                        id="checkNo"
                        name="opcion"
                        value="no"
                      />
                      <label class="form-check-label" for="checkNo">No</label>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Nombre completo" />
                  </div>
                  <div class="col-md-3">
                    <input type="number" class="form-control" placeholder="Edad" />
                  </div>
                  <div class="col-md-3">
                    <input type="number" class="form-control" placeholder="DNI" />
                  </div>
                </div>
              </form>

              <form>
                <p class="mb-0">Donde Nacio</p>
                <div class="row mt-4">
                  <div class="col-md-4">
                    <div class="form-check">
                      <input
                        type="radio"
                        class="form-check-input"
                        id="checkSi"
                        name="opcion"
                        value="si"
                      />
                      <label class="form-check-label" for="checkSi">Domicilio del Sector</label>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-check">
                      <input
                        type="radio"
                        class="form-check-input"
                        id="checkNo"
                        name="opcion"
                        value="no"
                      />
                      <label class="form-check-label" for="checkNo">Centro de Salud</label>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-check">
                      <input
                        type="radio"
                        class="form-check-input"
                        id="checkNo"
                        name="opcion"
                        value="no"
                      />
                      <label class="form-check-label" for="checkNo">Hospital</label>
                    </div>
                  </div>
                </div>
              </form>

              <form>
                <p class="mb-0">Su Niño ya Cuenta con DNI</p>
                <div class="row mt-2">
                  <div class="col-md-1">
                    <div class="form-check">
                      <input
                        type="radio"
                        class="form-check-input"
                        id="checkSi"
                        name="opcion"
                        value="si"
                        v-model="opcion"
                      />
                      <label class="form-check-label" for="checkSi">Si</label>
                    </div>
                  </div>
                  <div class="col-md-1">
                    <div class="form-check">
                      <input
                        type="radio"
                        class="form-check-input"
                        id="checkNo"
                        name="opcion"
                        value="no"
                        v-model="opcion"
                      />
                      <label class="form-check-label" for="checkNo">No</label>
                    </div>
                  </div>

                  <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="Nombre completo" />
                  </div>
                  <div class="col-md-3">
                    <input type="number" class="form-control" placeholder="Edad" />
                  </div>
                  <div class="col-md-3">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="DNI"
                      v-if="opcion === 'si'"
                    />
                  </div>
                </div>
              </form>
            </div>
            <form>
              <p class="mb-0">Su Niño ya Cuenta con DNI</p>
              <div class="row mt-2">
                <div class="col-md-1">
                  <div class="form-check">
                    <input
                      type="radio"
                      class="form-check-input"
                      id="checkSi"
                      name="opcion"
                      value="si"
                      v-model="opcion"
                    />
                    <label class="form-check-label" for="checkSi">Si</label>
                  </div>
                </div>
                <div class="col-md-1">
                  <div class="form-check">
                    <input
                      type="radio"
                      class="form-check-input"
                      id="checkNo"
                      name="opcion"
                      value="no"
                      v-model="opcion"
                    />
                    <label class="form-check-label" for="checkNo">No</label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="tab-pane" id="dimension">
          <!-- Contenido de la pestaña Dimensión -->
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Personalizado -->
  <div
    class="modal fade custom-modal custom-backdrop-modal"
    id="personalizado"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" style="margin: 0 auto">
      <div class="modal-content">
        <br />
        <div class="modal-header">
          <h5 class="modal-title custom-title" id="exampleModalLabel">Registrar Ocupación</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" style="padding: 20px">
          <form>
            <div class="mb-3">
              <label for="ocup_nombre" class="col-form-label">Ocupación:</label>
              <input type="text" class="form-control" id="ocup_nombre" />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="button" class="btn btn-primary" @click="addOccupation">Guardar</button>
            </div>
          </form>
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

.custom-backdrop-modal {
  background: rgba(0, 0, 0, 0.6);
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
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
  font-family: 'Segoe UI';
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
