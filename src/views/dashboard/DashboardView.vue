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
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    const estadoCivil = ref<Array<EstadoCivil>>([])
    const gradoInstruccion = ref<Array<GradoInstruccion>>([])
    const religion = ref<Array<Religion>>([])
    const seguroSalud = ref<Array<SeguroSalud>>([])
    const ocupaciones = ref<Array<Ocupacion>>([])

    const personas = ref([])
    const familias = ref([])

    const searchTerm = ref('')
    const searchTerm2 = ref('')
    const searchTerm3 = ref('')

    const searchDNI = ref('')

    const preguntaTexto = ref('')
    const preguntaTexto2 = ref('')
    const preguntaTexto3 = ref('')
    const preguntaTexto4 = ref('')
    const preguntaTexto5 = ref('')
    const preguntaTexto6 = ref('')
    const preguntaTexto7 = ref('')
    const preguntaTexto8 = ref('')
    const preguntaTexto9 = ref('')
    const preguntaTexto10 = ref('')
    const preguntaTexto11 = ref('')
    const preguntaTexto12 = ref('')
    const preguntaTexto13 = ref('')
    const preguntaTexto14 = ref('')
    const preguntaTexto15 = ref('')
    const preguntaTexto16 = ref('')
    const preguntaTexto17 = ref('')
    const preguntaTexto18 = ref('')
    const preguntaTexto19 = ref('')
    const preguntaTexto20 = ref('')
    const preguntaTexto21 = ref('')
    const preguntaTexto22 = ref('')
    const preguntaTexto23 = ref('')
    const preguntaTexto24 = ref('')
    const preguntaTexto25 = ref('')
    const preguntaTexto26 = ref('')
    const preguntaTexto27 = ref('')
    const preguntaTexto28 = ref('')

    const respuestas = ref([])
    const respuestas2 = ref([])
    const respuestas3 = ref([])
    const respuestas4 = ref([])
    const respuestas5 = ref([])
    const respuestas6 = ref([])
    const respuestas7 = ref([])
    const respuestas8 = ref([])
    const respuestas9 = ref([])
    const respuestas15 = ref([])
    const respuestas23 = ref([])

    const radioGroupName = `tipoVivienda`

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
    const ocupacion = ref('')
    const familia = ref('')
    const idFamilia = ref(null) // Variable para almacenar el ID de la familia

    const nombreFamilia = ref('')
    const niños_0_11 = ref(0)
    const adolescentes_12_17 = ref(0)
    const jovenes_18_29 = ref(0)
    const adultos_30_59 = ref(0)
    const adultos_mayores_60 = ref(0)

    const showBlock = ref(1)

    const mostrarSiguienteBloque = () => {
      if (showBlock.value < 5) {
        showBlock.value += 1
      }
    }

    const mostrarCampoEntrada = ref(false)
    const nuevoNombreFamilia = ref('')

    const headers = useAuth().headers()

    const showInputField = () => {
      mostrarCampoEntrada.value = true
    }

    const assignPersonToFamily = async () => {
      try {
        const personSelectElement = document.querySelector(
          'select.person-select'
        ) as HTMLSelectElement
        const familySelectElement = document.querySelector(
          'select.family-select'
        ) as HTMLSelectElement

        if (personSelectElement && familySelectElement) {
          const selectedPersonId = personSelectElement.value
          const selectedFamilyId = familySelectElement.value

          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/familia/asignar-persona-a-familia`,
            {
              persona_id: selectedPersonId,
              familia_id: selectedFamilyId
            },
            {
              ...headers
            }
          )

          if (response.status === 200) {
            ElMessage.success(response.data.message)
            fetchFamilies()
            familia.value = ''
          }

          // Ahora puedes usar 'selectedPersonId' y 'selectedFamilyId' sin errores
        } else {
          // Handle the case where one or both of the elements were not found
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 422) {
            if (error.response.data && error.response.data.errors) {
              for (const fieldName in error.response.data.errors) {
                if (
                  error.response.data.errors[fieldName] &&
                  error.response.data.errors[fieldName].length > 0
                ) {
                  ElMessage.error(error.response.data.errors[fieldName][0])
                }
              }
            } else {
              ElMessage.error('Error: Datos no válidos. Verifica los campos.')
            }
          } else if (error.response.status === 400) {
            // Cambia el código de estado según tu API
            if (error.response.data && error.response.data.message) {
              ElMessage.error(error.response.data.message)
            }
          } else {
            ElMessage.error('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.')
          }
        } else {
          ElMessage.error('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.')
        }
      }
    }

    const fetchEstadoCivil = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/estado-civil/list`,
          headers
        )
        estadoCivil.value = response.data
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    const guardarDatos = async () => {
      try {
        const ocupacionSelectElement = document.querySelector(
          'select.ocupacion-select'
        ) as HTMLSelectElement

        const estadoCivilSelectElemente = document.querySelector(
          'select.estadoCivil-select'
        ) as HTMLSelectElement

        const seguroSaludSelectElement = document.querySelector(
          'select.seguroSalud-select'
        ) as HTMLSelectElement

        const religionSelectElement = document.querySelector(
          'select.religion-select'
        ) as HTMLSelectElement

        const gradoInstruccionSelectElement = document.querySelector(
          'select.gradoInstruccion-select'
        ) as HTMLSelectElement

        console.log(ocupacionSelectElement)
        console.log(estadoCivilSelectElemente)
        console.log(seguroSaludSelectElement)
        console.log(religionSelectElement)
        console.log(gradoInstruccionSelectElement)

        if (
          ocupacionSelectElement &&
          estadoCivilSelectElemente &&
          seguroSaludSelectElement &&
          religionSelectElement &&
          gradoInstruccionSelectElement
        ) {
          const selectedOcupacionId = ocupacionSelectElement.value
          const selectedEstadoCivilId = estadoCivilSelectElemente.value
          const selectedSeguroSaludId = seguroSaludSelectElement.value
          const selectedReligionId = religionSelectElement.value
          const selectedGradoInstruccionId = gradoInstruccionSelectElement.value

          const formData = {
            pers_nombres: nombres.value,
            pers_apellidos: apellidos.value,
            pers_fecha_nacimiento: fechaNacimiento.value,
            edad: edad.value,
            religion_id: selectedReligionId,
            seguro_salud_id: selectedSeguroSaludId,
            grado_instruccion_id: selectedGradoInstruccionId,
            estado_civil_id: selectedEstadoCivilId,
            ocupacion_id: selectedOcupacionId,
            pers_numero_documento_identidad: searchDNI.value
          }

          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/persona/create`,
            formData,
            {
              ...headers
            }
          )

          if (response.status === 201) {
            ElMessage.success(response.data.message)
            fetchPersons()
            familia.value = ''
          }
        } else {
          //
        }
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 422) {
            if (error.response.data && error.response.data.errors) {
              for (const fieldName in error.response.data.errors) {
                if (
                  error.response.data.errors[fieldName] &&
                  error.response.data.errors[fieldName].length > 0
                ) {
                  ElMessage.error(error.response.data.errors[fieldName][0])
                }
              }
            } else {
              ElMessage.error('Error: Datos no válidos. Verifica los campos.')
            }
          } else if (error.response.status === 400) {
            if (error.response.data && error.response.data.message) {
              ElMessage.error(error.response.data.message)
            }
          } else {
            ElMessage.error('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.')
          }
        } else {
          ElMessage.error('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.')
        }
      }
    }

    const fetchPreguntas = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/pregunta/list`, headers)
        const data = response.data
        if (data.data && data.data.length > 0) {
          const pregunta = data.data[0]
          const pregunta2 = data.data[1]
          const pregunta3 = data.data[2]
          const pregunta4 = data.data[3]
          const pregunta5 = data.data[4]
          const pregunta6 = data.data[5]
          const pregunta7 = data.data[6]
          const pregunta8 = data.data[7]
          const pregunta9 = data.data[8]
          const pregunta10 = data.data[9]
          const pregunta11 = data.data[10]
          const pregunta12 = data.data[11]
          const pregunta13 = data.data[12]
          const pregunta14 = data.data[13]
          const pregunta15 = data.data[14]
          const pregunta16 = data.data[15]
          const pregunta17 = data.data[16]
          const pregunta18 = data.data[17]
          const pregunta19 = data.data[18]
          const pregunta20 = data.data[19]
          const pregunta21 = data.data[20]
          const pregunta22 = data.data[21]
          const pregunta23 = data.data[22]
          const pregunta24 = data.data[23]
          const pregunta25 = data.data[24]
          const pregunta26 = data.data[25]
          const pregunta27 = data.data[26]

          preguntaTexto.value = pregunta.pre_pregunta
          preguntaTexto2.value = pregunta2.pre_pregunta
          preguntaTexto3.value = pregunta3.pre_pregunta
          preguntaTexto4.value = pregunta4.pre_pregunta
          preguntaTexto5.value = pregunta5.pre_pregunta
          preguntaTexto6.value = pregunta6.pre_pregunta
          preguntaTexto7.value = pregunta7.pre_pregunta
          preguntaTexto8.value = pregunta8.pre_pregunta
          preguntaTexto9.value = pregunta9.pre_pregunta
          preguntaTexto10.value = pregunta10.pre_pregunta
          preguntaTexto11.value = pregunta11.pre_pregunta
          preguntaTexto12.value = pregunta12.pre_pregunta
          preguntaTexto13.value = pregunta13.pre_pregunta
          preguntaTexto14.value = pregunta14.pre_pregunta
          preguntaTexto15.value = pregunta15.pre_pregunta
          preguntaTexto16.value = pregunta16.pre_pregunta
          preguntaTexto17.value = pregunta17.pre_pregunta
          preguntaTexto18.value = pregunta18.pre_pregunta
          preguntaTexto19.value = pregunta19.pre_pregunta
          preguntaTexto20.value = pregunta20.pre_pregunta
          preguntaTexto21.value = pregunta21.pre_pregunta
          preguntaTexto22.value = pregunta22.pre_pregunta
          preguntaTexto23.value = pregunta23.pre_pregunta
          preguntaTexto24.value = pregunta24.pre_pregunta
          preguntaTexto25.value = pregunta25.pre_pregunta
          preguntaTexto26.value = pregunta26.pre_pregunta
          preguntaTexto27.value = pregunta27.pre_pregunta

          respuestas.value = pregunta.respuestas_comunes
          respuestas2.value = pregunta6.respuestas_comunes
          respuestas3.value = pregunta7.respuestas_comunes
          respuestas4.value = pregunta8.respuestas_comunes
          respuestas5.value = pregunta9.respuestas_comunes
          respuestas6.value = pregunta10.respuestas_comunes
          respuestas7.value = pregunta11.respuestas_comunes
          respuestas8.value = pregunta12.respuestas_comunes
          respuestas9.value = pregunta13.respuestas_comunes
          respuestas15.value = pregunta15.respuestas_comunes
          respuestas23.value = pregunta23.respuestas_comunes
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    const saveOccupation = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/ocupacion/create`,
          {
            ocup_nombre: ocupacion.value
          },
          {
            ...headers
          }
        )

        console.log(response)

        if (response.status === 201) {
          ElMessage.success(response.data.message)
          fetchData()
          ocupacion.value = ''
        } else {
          ElMessage.error('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.')
        }
      } catch (error: any) {
        if (error.response && error.response.status === 422) {
          if (error.response.data && error.response.data.errors) {
            for (const fieldName in error.response.data.errors) {
              if (
                error.response.data.errors[fieldName] &&
                error.response.data.errors[fieldName].length > 0
              ) {
                ElMessage.error(error.response.data.errors[fieldName][0])
              }
            }
          } else {
            ElMessage.error('Error: Datos no válidos. Verifica los campos.')
          }
        }
      }
    }

    const saveFamily = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/familia/create`,
          {
            fam_nombre_familia: familia.value
          },
          {
            ...headers
          }
        )

        console.log(response)

        if (response.status === 201) {
          ElMessage.success(response.data.message)
          fetchFamilies()
          familia.value = ''

          idFamilia.value = response.data.data.id

          console.log(idFamilia.value)
        } else {
          ElMessage.error('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.')
        }
      } catch (error: any) {
        if (error.response && error.response.status === 422) {
          if (error.response.data && error.response.data.errors) {
            for (const fieldName in error.response.data.errors) {
              if (
                error.response.data.errors[fieldName] &&
                error.response.data.errors[fieldName].length > 0
              ) {
                ElMessage.error(error.response.data.errors[fieldName][0])
              }
            }
          } else {
            ElMessage.error('Error: Datos no válidos. Verifica los campos.')
          }
        }
      }
    }

    const fetchGradoInstruccion = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/grado-instruccion/list`,
          headers
        )
        gradoInstruccion.value = response.data
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    const fetchReligion = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/religion/list`, headers)
        religion.value = response.data
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

    const fetchFamilies = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/familia/list`, {
          params: { search: searchTerm3.value },
          ...headers
        })

        familias.value = response.data.data
      } catch (error) {
        console.error('Error al obtener datos:', error)
      }
    }

    const fetchPersons = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/persona/list`, {
          params: { search: searchTerm2.value },
          ...headers
        })

        personas.value = response.data.data
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

    const openAsignmentPersonAtFamily = () => {
      const myModalElement = document.getElementById('asignarFamiliaModal')
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

    const filteredFamilies = computed(() => {
      return familias.value.filter((family) => {
        return family.fam_nombre_familia.toLowerCase().includes(searchTerm3.value.toLowerCase())
      })
    })

    const filteredPeople = computed(() => {
      return personas.value.filter((person) => {
        const fullName = `${person.pers_nombres} ${person.pers_apellidos}`
        return fullName.toLowerCase().includes(searchTerm2.value.toLowerCase())
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

    const obtenerInformacionEdad = async () => {
      try {
        if (idFamilia.value) {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/familia/${idFamilia.value}/informacion-edad`,
            headers
          )

          if (response.status === 200) {
            const data = response.data.data

            nombreFamilia.value = data.nombre_familia
            niños_0_11.value = data['0_a_11años']
            adolescentes_12_17.value = data['12_a_17años']
            jovenes_18_29.value = data['18_a_29años']
            adultos_30_59.value = data['30_a_59años']
            adultos_mayores_60.value = data['mayor_60+']
          } else {
            console.error('Error al obtener la información de edad.')
          }
        } else {
          console.error('ID de familia no válido.')
        }
      } catch (error) {
        console.error('Ocurrió un error inesperado:', error)
      }
    }

    watch(searchTerm, searchTerm2, () => {
      fetchData()
      fetchPersons()
      fetchFamilies()
    })

    onMounted(async () => {
      fetchEstadoCivil()
      fetchGradoInstruccion()
      fetchReligion()
      fetchPreguntas()
      fetchSeguroSalud()
      fetchData()
      fetchPersons()
      fetchFamilies()
    })

    return {
      tableData,
      gradoInstruccion,
      estadoCivil,
      religion,
      searchTerm,
      searchTerm2,
      searchTerm3,
      guardarDatos,
      personas,
      toggleDniField, // La función para cambiar la visibilidad del campo DNI
      opcion, // La referencia para el radio button
      ocupacion,
      idFamilia,
      familia,
      saveOccupation,
      saveFamily,
      preguntaTexto,
      respuestas2,
      respuestas3,
      respuestas4,
      respuestas5,
      respuestas6,
      showBlock,
      mostrarSiguienteBloque,
      respuestas7,
      respuestas8,
      respuestas9,
      respuestas15,
      mostrarCampoEntrada,
      nuevoNombreFamilia,
      obtenerInformacionEdad,
      showInputField,
      assignPersonToFamily,
      respuestas23,
      preguntaTexto2,
      preguntaTexto3,
      preguntaTexto4,
      preguntaTexto5,
      preguntaTexto6,
      preguntaTexto7,
      preguntaTexto8,
      preguntaTexto9,
      preguntaTexto10,
      preguntaTexto11,
      preguntaTexto12,
      preguntaTexto13,
      preguntaTexto14,
      preguntaTexto15,
      preguntaTexto16,
      preguntaTexto17,
      preguntaTexto18,
      preguntaTexto19,
      preguntaTexto20,
      preguntaTexto21,
      preguntaTexto22,
      preguntaTexto23,
      preguntaTexto24,
      preguntaTexto25,
      preguntaTexto26,
      preguntaTexto27,
      preguntaTexto28,
      respuestas,
      radioGroupName,
      filteredOccupations,
      filteredPeople,
      filteredFamilies,
      seguroSalud,
      searchDNI,
      nombreFamilia,
      niños_0_11,
      adolescentes_12_17,
      jovenes_18_29,
      adultos_30_59,
      adultos_mayores_60,
      searchByDNI,
      fechaNacimiento,
      edad,
      calcularEdad,
      ocupaciones,
      familias,
      nombres,
      openAddOccupationModal,
      openAsignmentPersonAtFamily,
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
          <a
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#familia"
            @click="obtenerInformacionEdad"
            >Familia</a
          >
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
                    <input type="text" class="form-control" placeholder="DNI" v-model="searchDNI" />
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
                  <input type="text" class="form-control" placeholder="Nombres" v-model="nombres" />
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
                    <select class="form-control mt-3 ocupacion-select">
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
                  <select class="form-control estadoCivil-select" id="exampleFormControlSelect1">
                    <option v-for="estado in estadoCivil.data" :key="estado.id" :value="estado.id">
                      {{ estado.esci_nombre }}
                    </option>
                  </select>
                </div>

                <div class="mt-3 col-md-4">
                  <label for="exampleFormControlSelect1">Grado de instrucción</label>
                  <select
                    class="form-control gradoInstruccion-select"
                    id="exampleFormControlSelect1"
                  >
                    <option
                      v-for="grado in gradoInstruccion.data"
                      :key="grado.id"
                      :value="grado.id"
                    >
                      {{ grado.grain_nombre }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-group"></div>
              <div class="row mt-3">
                <div class="mt-3 col-md-4">
                  <label for="exampleFormControlSelect1">Religion</label>
                  <select class="form-control religion-select" id="exampleFormControlSelect1">
                    <option
                      v-for="religion2 in religion.data"
                      :key="religion2.id"
                      :value="religion2.id"
                    >
                      {{ religion2.reli_nombre }}
                    </option>
                  </select>
                </div>
                <div class="mt-3 col-md-4">
                  <label for="exampleFormControlSelect1">Seguro</label>
                  <select class="form-control seguroSalud-select" id="exampleFormControlSelect1">
                    <option v-for="estado in seguroSalud.data" :key="estado.id" :value="estado.id">
                      {{ estado.sesa_nombre }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="mt-3 col-md-4"></div>

              <div class="button-container">
                <button class="btn btn-primary" @click.prevent="guardarDatos">
                  <i class="fa fa-plus"></i> Nuevo registro
                </button>
                <button class="btn btn-secondary" @click.prevent="openAsignmentPersonAtFamily">
                  Asignar familia
                </button>
              </div>
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
                      v-model="nombreFamilia"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div class="row mt-4">
                <div class="col-md-2">
                  <label for="exampleFormControlSelect1">Niños(as) O a 11 años</label>
                  <input type="int" class="form-control" v-model="niños_0_11" disabled />
                </div>
                <div class="col-md-2">
                  <label for="exampleFormControlSelect1">Adolecentes 12 a 17 años</label>
                  <input type="text" class="form-control" v-model="adolescentes_12_17" disabled />
                </div>
                <div class="col-md-2">
                  <label for="exampleFormControlSelect1">Jóvenes 18 a 29 años</label>
                  <input type="text" class="form-control" v-model="jovenes_18_29" disabled />
                </div>
                <div class="col-md-2">
                  <label for="exampleFormControlSelect1">Adulto 30 a 59 años</label>
                  <input type="text" class="form-control" v-model="adultos_30_59" disabled />
                </div>
                <div class="col-md-2">
                  <label for="exampleFormControlSelect1">Adulto mayor a 60 años</label>
                  <input type="text" class="form-control" v-model="adultos_mayores_60" disabled />
                </div>
              </div>
              <div class="form-group mt-3"></div>

              <div class="alert alert-success mt-5" role="alert">
                <h4 class="alert-heading">CARACTERÍSTICAS</h4>
              </div>

              <div class="mt-4 col-md-12">
                <label>{{ preguntaTexto }}</label>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="form-check" v-for="(respuesta, index) in respuestas" :key="index">
                    <input
                      type="radio"
                      :name="radioGroupName"
                      :id="`radioRespuesta${index}`"
                      :value="respuesta.rc_respuesta_comun"
                    />
                    {{ respuesta.rc_respuesta_comun }}
                  </label>
                </div>
              </div>

              <div class="row mt-4">
                <div class="col-md-4">
                  <label for="exampleFormControlSelect1">{{ preguntaTexto2 }}</label>
                  <input type="text" class="form-control" placeholder="Número" />
                </div>

                <div class="col-md-6">
                  <label>{{ preguntaTexto3 }}</label>
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
                <label>{{ preguntaTexto4 }}</label>
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
                  <label>{{ preguntaTexto5 }}</label>
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
                  <label>{{ preguntaTexto6 }}</label>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label
                      class="form-check"
                      v-for="(respuesta, index) in respuestas2"
                      :key="index"
                    >
                      <input
                        type="radio"
                        :id="`radioRespuesta${index}`"
                        :value="respuesta.rc_respuesta_comun"
                      />
                      {{ respuesta.rc_respuesta_comun }}
                    </label>
                  </div>
                </div>
              </div>

              <div class="mt-3 col-md-10">
                <label>{{ preguntaTexto7 }}</label>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="form-check" v-for="(respuesta, index) in respuestas3" :key="index">
                    <input
                      type="radio"
                      :id="`radioRespuesta${index}`"
                      :value="respuesta.rc_respuesta_comun"
                    />
                    {{ respuesta.rc_respuesta_comun }}
                  </label>
                </div>
              </div>

              <div class="mt-3 col-md-10"></div>

              <div class="mt-3 col-md-13">
                <label>{{ preguntaTexto8 }}</label>
                <p></p>
                <div
                  class="form-check form-check-inline"
                  v-for="(respuesta, index) in respuestas4"
                  :key="index"
                >
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :id="`checkbox${index}`"
                    :value="respuesta.rc_respuesta_comun"
                    name="serviciosBasicos"
                  />
                  <label class="form-check-label" :for="`checkbox${index}`">{{
                    respuesta.rc_respuesta_comun
                  }}</label>
                </div>
              </div>

              <div class="mt-3 col-md-10">
                <label>{{ preguntaTexto9 }}</label>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="form-check" v-for="(respuesta, index) in respuestas5" :key="index">
                    <input
                      type="radio"
                      :id="`radioRespuesta${index}`"
                      :value="respuesta.rc_respuesta_comun"
                    />
                    {{ respuesta.rc_respuesta_comun }}
                  </label>
                </div>
              </div>

              <div class="mt-3 col-md-10">
                <label for="exampleFormControlSelect1">{{ preguntaTexto10 }}</label>
                <p></p>
                <div
                  class="form-check form-check-inline"
                  v-for="(respuesta, index) in respuestas6"
                  :key="index"
                >
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :id="`checkbox${index}`"
                    :value="respuesta.rc_respuesta_comun"
                    name="serviciosBasicos"
                  />
                  <label class="form-check-label" :for="`checkbox${index}`">{{
                    respuesta.rc_respuesta_comun
                  }}</label>
                </div>
              </div>

              <div class="mt-3 col-md-10">
                <label>{{ preguntaTexto11 }}</label>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="form-check" v-for="(respuesta, index) in respuestas7" :key="index">
                    <input
                      type="radio"
                      name="radiode"
                      :id="`radioRespuesta${index}`"
                      :value="respuesta.rc_respuesta_comun"
                    />
                    {{ respuesta.rc_respuesta_comun }}
                  </label>
                </div>
              </div>

              <div class="row mt-3">
                <div class="mt-3 col-md-7">
                  <label>{{ preguntaTexto12 }}</label>
                  <div
                    class="form-check form-check-inline"
                    v-for="(respuesta, index) in respuestas8"
                    :key="index"
                  >
                    <input
                      type="checkbox"
                      class="form-check-input"
                      :id="`checkbox${index}`"
                      :value="respuesta.rc_respuesta_comun"
                      name="serviciosBasicos"
                    />
                    <label class="form-check-label" :for="`checkbox${index}`">{{
                      respuesta.rc_respuesta_comun
                    }}</label>
                  </div>
                </div>

                <div class="mt-3 col-md-4">
                  <label>{{ preguntaTexto13 }}</label>
                  <div
                    class="form-check form-check-inline"
                    v-for="(respuesta, index) in respuestas9"
                    :key="index"
                  >
                    <input
                      type="checkbox"
                      class="form-check-input"
                      :id="`checkbox${index}`"
                      :value="respuesta.rc_respuesta_comun"
                      name="serviciosBasicos"
                    />
                    <label class="form-check-label" :for="`checkbox${index}`">{{
                      respuesta.rc_respuesta_comun
                    }}</label>
                  </div>
                </div>
              </div>

              <div class="mt-3 col-md-5">
                <label>{{ preguntaTexto14 }}</label>
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
                <label>{{ preguntaTexto15 }}</label>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="form-check" v-for="(respuesta, index) in respuestas15" :key="index">
                    <input
                      type="radio"
                      name="radiode"
                      :id="`radioRespuesta${index}`"
                      :value="respuesta.rc_respuesta_comun"
                    />
                    {{ respuesta.rc_respuesta_comun }}
                  </label>
                </div>
              </div>

              <div class="row mt-3">
                <div class="mt-3 col-md-4">
                  <label>{{ preguntaTexto16 }}</label>
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
                  <label>{{ preguntaTexto18 }}</label>
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
                  <label>{{ preguntaTexto19 }}</label>
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
                  <label>{{ preguntaTexto20 }}</label>
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
                  <label>{{ preguntaTexto21 }}</label>
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
                  <label>{{ preguntaTexto22 }}</label>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn form-check">
                      <input type="radio" name="faenasComunales" value="si" /> Si
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="faenasComunales" value="no" /> No
                    </label>
                  </div>
                </div>
              </div>

              <div class="mt-3 col-md-5">
                <label>{{ preguntaTexto23 }}</label>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="form-check" v-for="(respuesta, index) in respuestas23" :key="index">
                    <input
                      type="radio"
                      name="radiode"
                      :id="`radioRespuesta${index}`"
                      :value="respuesta.rc_respuesta_comun"
                    />
                    {{ respuesta.rc_respuesta_comun }}
                  </label>
                </div>
              </div>

              <div class="form-group mt-">
                <label for="exampleFormControlTextarea1">Describa</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>

              <div class="row mt-3">
                <div class="mt-3 col-md-5">
                  <label>{{ preguntaTexto24 }}</label>
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
                <label>{{ preguntaTexto25 }}</label>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="btn form-check">
                    <input type="radio" name="participacionReforestacion" value="si" /> Si
                  </label>
                  <label class="btn form-check">
                    <input type="radio" name="participacionReforestacion" value="no" /> No
                  </label>
                </div>
              </div>
              <div class="mt-3 col-md-5">
                <label>{{ preguntaTexto26 }}</label>
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
            <div class="card-header"></div>
            <div class="card-body">
              <h5 class="card-title text-center">IDENTIFICACION DE LOS RIESGOS DE LA FAMILIA</h5>

              <div v-if="showBlock === 1">
                <p class="card-text">EN LA ETAPA NIÑO 0-11 AÑOS</p>

                <div class="row">
                  <div class="form-group col-4">
                    <select id="inputState" class="form-control">
                      <option selected>Niño 1</option>
                      <option>Niño 2</option>
                      <option>Niño 3</option>
                      <option>Niño 4</option>
                    </select>
                  </div>
                  <div class="col-7">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="nombreFamilia"
                        placeholder="Nombre y apellidos"
                      />
                    </div>
                  </div>
                  <div class="col-1">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="nombreFamilia"
                        placeholder="Edad"
                      />
                    </div>
                  </div>
                </div>
                <div class="container-fluid">
                  <div class="row mt-3">
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">Su niño/a nació con bajo peso?</h5>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio1"
                              value="option1"
                            />
                            <label class="form-check-label" for="inlineRadio1">Si</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio2"
                              value="option2"
                            />
                            <label class="form-check-label" for="inlineRadio2">No</label>
                          </div>

                          <h5 class="card-title mt-3">Lugar de nacimiento</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="#" value="domicilio" /> Domicilio del Sector
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="#" value="centro" /> Centro de Salud
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="#" value="hospital" /> Hospital
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">
                            Su Niña/o nació antes de la fecha de Probable Parto
                          </h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="2" value="domicilio" /> Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="2" value="centro" /> No
                            </label>
                          </div>
                          <div>
                            <h5 class="card-title mt-3">Niño ya Cuenta con DNI</h5>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn form-check">
                                <input type="radio" name="1" value="domicilio" /> Si
                              </label>
                              <label class="btn form-check">
                                <input type="radio" name="1" value="centro" /> No
                              </label>
                            </div>
                          </div>




                          
                        </div>
                      </div>
                    </div>
                  </div>

                  <a class="btn btn-success mt-4" @click="mostrarSiguienteBloque"
                    >Siguiente Etapa</a
                  >
                  <a href="#" class="btn btn-success mt-4">Guardar</a>

                  <a href="#" class="btn btn-success mt-4">Limpiar</a>
                </div>
              </div>

              <div v-if="showBlock === 2">
                <p class="card-text">EN LA ETAPA ADOLESCENTE 12-17 AÑOS</p>
                <div class="row">
                  <div class="form-group col-4">
                    <select id="inputState" class="form-control">
                      <option selected>Adolescente 1</option>
                      <option>Adolescente 2</option>
                      <option>Adolescente 3</option>
                      <option>Adolescente 4</option>
                    </select>
                  </div>
                  <div class="col-7">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="nombreFamilia"
                        placeholder="Nombre y apellidos"
                      />
                    </div>
                  </div>
                  <div class="col-1">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="nombreFamilia"
                        placeholder="Edad"
                      />
                    </div>
                  </div>
                </div>
                <div class="container-fluid">
                  <div class="row mt-3">
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">
                            Su niño/a nació con bajo pesofdddddddddddddddddddd?
                          </h5>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio1"
                              value="option1"
                            />
                            <label class="form-check-label" for="inlineRadio1">Si</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio2"
                              value="option2"
                            />
                            <label class="form-check-label" for="inlineRadio2">No</label>
                          </div>

                          <h5 class="card-title mt-3">Lugar de nacimiento</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="#" value="domicilio" /> Domicilio del Sector
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="#" value="centro" /> Centro de Salud
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="#" value="hospital" /> Hospital
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">
                            Su Niña/o nació antes de la fecha de Probable Parto
                          </h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="2" value="domicilio" /> Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="2" value="centro" /> No
                            </label>
                          </div>
                          <div>
                            <h5 class="card-title mt-3">Niño ya Cuenta con DNI</h5>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn form-check">
                                <input type="radio" name="1" value="domicilio" /> Si
                              </label>
                              <label class="btn form-check">
                                <input type="radio" name="1" value="centro" /> No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a class="btn btn-success mt-4" @click="mostrarSiguienteBloque">Siguiente Etapa</a>
                  <a href="#" class="btn btn-success mt-4">Guardar</a>

                  <a href="#" class="btn btn-success mt-4">Limpiar</a>
                </div>
              </div>

              <div v-if="showBlock === 3">
                <p class="card-text">EN LA ETAPA JOVEN 18-29 AÑOS</p>
                <div class="row">
                  <div class="form-group col-4">
                    <select id="inputState" class="form-control">
                      <option selected>Joven 1</option>
                      <option>Joven 2</option>
                      <option>Joven 3</option>
                      <option>Joven 4</option>
                    </select>
                  </div>
                  <div class="col-7">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="nombreFamilia"
                        placeholder="Nombre y apellidos"
                      />
                    </div>
                  </div>
                  <div class="col-1">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="nombreFamilia"
                        placeholder="Edad"
                      />
                    </div>
                  </div>
                </div>
                <div class="container-fluid">
                  <div class="row mt-3">
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">
                            Su niño/a nació con bajo pesofdddddddddddddddddddd?
                          </h5>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio1"
                              value="option1"
                            />
                            <label class="form-check-label" for="inlineRadio1">Si</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio2"
                              value="option2"
                            />
                            <label class="form-check-label" for="inlineRadio2">No</label>
                          </div>

                          <h5 class="card-title mt-3">Lugar de nacimiento</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="#" value="domicilio" /> Domicilio del Sector
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="#" value="centro" /> Centro de Salud
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="#" value="hospital" /> Hospital
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">
                            Su Niña/o nació antes de la fecha de Probable Parto
                          </h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="2" value="domicilio" /> Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="2" value="centro" /> No
                            </label>
                          </div>
                          <div>
                            <h5 class="card-title mt-3">Niño ya Cuenta con DNI</h5>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn form-check">
                                <input type="radio" name="1" value="domicilio" /> Si
                              </label>
                              <label class="btn form-check">
                                <input type="radio" name="1" value="centro" /> No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a class="btn btn-success mt-4" @click="mostrarSiguienteBloque">Siguiente Etapa</a>
                  <a href="#" class="btn btn-success mt-4">Guardar</a>

                  <a href="#" class="btn btn-success mt-4">Limpiar</a>
                </div>
              </div>

              <div v-if="showBlock === 4">
                <p class="card-text">EN LA ETAPA ADULTO 30-59 AÑOS</p>
                <div class="row">
                  <div class="form-group col-4">
                    <select id="inputState" class="form-control">
                      <option selected>Adulto 1</option>
                      <option>Adulto 2</option>
                      <option>Adulto 3</option>
                      <option>Adulto 4</option>
                    </select>
                  </div>
                  <div class="col-7">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="nombreFamilia"
                        placeholder="Nombre y apellidos"
                      />
                    </div>
                  </div>
                  <div class="col-1">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="nombreFamilia"
                        placeholder="Edad"
                      />
                    </div>
                  </div>
                </div>
                <div class="container-fluid">
                  <div class="row mt-3">
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">
                            Su niño/a nació con bajo pesofdddddddddddddddddddd?
                          </h5>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio1"
                              value="option1"
                            />
                            <label class="form-check-label" for="inlineRadio1">Si</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio2"
                              value="option2"
                            />
                            <label class="form-check-label" for="inlineRadio2">No</label>
                          </div>

                          <h5 class="card-title mt-3">Lugar de nacimiento</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="#" value="domicilio" /> Domicilio del Sector
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="#" value="centro" /> Centro de Salud
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="#" value="hospital" /> Hospital
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">
                            Su Niña/o nació antes de la fecha de Probable Parto
                          </h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="2" value="domicilio" /> Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="2" value="centro" /> No
                            </label>
                          </div>
                          <div>
                            <h5 class="card-title mt-3">Niño ya Cuenta con DNI</h5>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn form-check">
                                <input type="radio" name="1" value="domicilio" /> Si
                              </label>
                              <label class="btn form-check">
                                <input type="radio" name="1" value="centro" /> No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a class="btn btn-success mt-4" @click="mostrarSiguienteBloque">Siguiente Etapa</a>
                  <a href="#" class="btn btn-success mt-4">Guardar</a>

                  <a href="#" class="btn btn-success mt-4">Limpiar</a>
                </div>
              </div>

              <div v-if="showBlock === 5">
                <p class="card-text">EN LA ETAPA ADULTO MAYOR 60-110 AÑOS</p>
                <div class="row">
                  <div class="form-group col-4">
                    <select id="inputState" class="form-control">
                      <option selected>Adulto Mayor 1 </option>
                      <option>Adulto Mayor 2</option>
                      <option>Adulto Mayor 3</option>
                      <option>Adulto Mayor 4</option>
                    </select>
                  </div>
                  <div class="col-7">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="nombreFamilia"
                        placeholder="Nombre y apellidos"
                      />
                    </div>
                  </div>
                  <div class="col-1">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="nombreFamilia"
                        placeholder="Edad"
                      />
                    </div>
                  </div>
                </div>
                <div class="container-fluid">
                  <div class="row mt-3">
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">
                            Su niño/a nació con bajo pesofdddddddddddddddddddd?
                          </h5>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio1"
                              value="option1"
                            />
                            <label class="form-check-label" for="inlineRadio1">Si</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio2"
                              value="option2"
                            />
                            <label class="form-check-label" for="inlineRadio2">No</label>
                          </div>

                          <h5 class="card-title mt-3">Lugar de nacimiento</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="#" value="domicilio" /> Domicilio del Sector
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="#" value="centro" /> Centro de Salud
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="#" value="hospital" /> Hospital
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">
                            Su Niña/o nació antes de la fecha de Probable Parto
                          </h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="2" value="domicilio" /> Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="2" value="centro" /> No
                            </label>
                          </div>
                          <div>
                            <h5 class="card-title mt-3">Niño ya Cuenta con DNI</h5>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn form-check">
                                <input type="radio" name="1" value="domicilio" /> Si
                              </label>
                              <label class="btn form-check">
                                <input type="radio" name="1" value="centro" /> No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a href="#" class="btn btn-success mt-4">Siguiente Etapa</a>
                  <a href="#" class="btn btn-success mt-4">Guardar</a>

                  <a href="#" class="btn btn-success mt-4">Limpiar</a>
                </div>
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
        <div class="modal-dialog" role="document">
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
              <form @submit.prevent="saveOccupation">
                <div class="mb-3">
                  <label for="ocup_nombre" class="col-form-label">Ocupación:</label>
                  <input v-model="ocupacion" type="text" class="form-control" id="ocup_nombre" />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                    @click="saveOccupation"
                  >
                    Save
                  </button>
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Asignación de Persona a Familia -->
      <!-- Modal Asignación de Persona a Familia -->
      <div
        class="modal fade custom-modal custom-backdrop-modal custom-asignar-modal"
        id="asignarFamiliaModal"
        tabindex="-1"
        aria-labelledby="asignarFamiliaModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered custom-modal-extra-wide">
          <div class="modal-content">
            <br />
            <div class="modal-header">
              <h5 class="modal-title custom-title" id="asignarFamiliaModalLabel">
                Asignar Persona a Familia
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body" style="padding: 20px">
              <form @submit.prevent="assignPersonToFamily">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fa fa-search"></i>
                    </span>
                  </div>
                  <input v-model="searchTerm2" class="form-control" placeholder="Buscar persona" />
                </div>
                <select class="form-control mt-3 mb-3 person-select">
                  <option v-for="persona in filteredPeople" :key="persona.id" :value="persona.id">
                    {{ persona.pers_nombres }} {{ persona.pers_apellidos }}
                  </option>
                </select>
                <div class="mb-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="fa fa-search"></i>
                      </span>
                    </div>
                    <input
                      v-model="searchTerm3"
                      class="form-control"
                      placeholder="Buscar familia"
                    />
                  </div>

                  <select class="form-control mt-3 mb-3 family-select">
                    <option
                      v-for="familia in filteredFamilies"
                      :key="familia.id"
                      :value="familia.id"
                    >
                      {{ familia.fam_nombre_familia }}
                    </option>
                  </select>
                </div>

                <!-- Botón con icono de más (+) para mostrar el campo de entrada -->
                <button type="button" class="btn btn-primary" @click="showInputField">
                  <i class="fa fa-plus"></i> Nueva familia
                </button>

                <!-- Campo de entrada de texto para el nombre de la nueva familia -->
                <!-- Campo de entrada de texto para el nombre de la nueva familia y botón de guardar -->
                <div v-if="mostrarCampoEntrada" class="input-group mb-3">
                  <input
                    v-model="familia"
                    type="text"
                    class="form-control"
                    placeholder="Nombre de la Nueva Familia"
                  />
                  <button type="button" class="btn btn-primary" @click="saveFamily">
                    <i class="fa fa-save"></i> Guardar
                  </button>
                </div>

                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click.prevent="assignPersonToFamily"
                  >
                    Asignar
                  </button>
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Cancelar
                  </button>
                </div>
              </form>
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

.custom-backdrop-modal {
  background: rgba(0, 0, 0, 0.6);
}

.color-w {
  color: #a9a9a9;
}

.color-r {
  color: #d22b2b;
}

.custom-modal-extra-wide {
  max-width: 1000px; /* Establece un ancho máximo mayor */
}

.custom-asignar-modal .modal-dialog {
  width: 400px; /* Ancho específico para el modal "Asignar Persona a Familia" */
}

.custom-asignar-modal .modal-content {
  height: 485px; /* Altura específica para el modal "Asignar Persona a Familia" */
}

.color-arrow {
  color: #fff1c7;
}

.button-container {
  display: flex;
  align-items: center;
}

.btn {
  margin-right: 10px; /* Espacio entre los botones */
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
