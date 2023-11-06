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
import { format } from 'date-fns';

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
    const preguntaTexto29 = ref('')
    const preguntaTexto30 = ref('')
    const preguntaTexto31 = ref('')
    const preguntaTexto32 = ref('')
    const preguntaTexto33 = ref('')
    const preguntaTexto34 = ref('')
    const preguntaTexto35 = ref('')
    const preguntaTexto36 = ref('')
    const preguntaTexto37 = ref('')
    const preguntaTexto38 = ref('')
    const preguntaTexto39 = ref('')
    const preguntaTexto40 = ref('')
    const preguntaTexto41 = ref('')
    const preguntaTexto42 = ref('')
    const preguntaTexto43 = ref('')
    const preguntaTexto44 = ref('')
    const preguntaTexto45 = ref('')
    const preguntaTexto46 = ref('')
    const preguntaTexto47 = ref('')
    const preguntaTexto48 = ref('')
    const preguntaTexto49 = ref('')
    const preguntaTexto50 = ref('')
    const preguntaTexto51 = ref('')
    const preguntaTexto52 = ref('')
    const preguntaTexto53 = ref('')
    const preguntaTexto54 = ref('')
    const preguntaTexto55 = ref('')
    const preguntaTexto56 = ref('')
    const preguntaTexto57 = ref('')
    const preguntaTexto58 = ref('')
    const preguntaTexto59 = ref('')
    const preguntaTexto60 = ref('')
    const preguntaTexto61 = ref('')
    const preguntaTexto62 = ref('')
    const preguntaTexto63 = ref('')
    const preguntaTexto64 = ref('')
    const preguntaTexto65 = ref('')
    const preguntaTexto66 = ref('')
    const preguntaTexto67 = ref('')
    const preguntaTexto68 = ref('')
    const preguntaTexto69 = ref('')
    const preguntaTexto70 = ref('')
    const preguntaTexto71 = ref('')
    const preguntaTexto72 = ref('')
    const preguntaTexto73 = ref('')
    const preguntaTexto74 = ref('')
    const preguntaTexto75 = ref('')
    const preguntaTexto76 = ref('')
    const preguntaTexto77 = ref('')
    const preguntaTexto78 = ref('')
    const preguntaTexto79 = ref('')
    const preguntaTexto80 = ref('')
    const preguntaTexto81 = ref('')
    const preguntaTexto82 = ref('')
    const preguntaTexto83 = ref('')
    const preguntaTexto84 = ref('')
    const preguntaTexto85 = ref('')
    const preguntaTexto86 = ref('')
    const preguntaTexto87 = ref('')
    const preguntaTexto88 = ref('')
    const preguntaTexto89 = ref('')
    const preguntaTexto90 = ref('')
    const preguntaTexto91 = ref('')
    const preguntaTexto92 = ref('')
    const preguntaTexto93 = ref('')
    const preguntaTexto94 = ref('')
    const preguntaTexto95 = ref('')
    const preguntaTexto96 = ref('')
    const preguntaTexto97 = ref('')
    const preguntaTexto98 = ref('')
    const preguntaTexto99 = ref('')
    const preguntaTexto100 = ref('')
    const preguntaTexto101 = ref('')
    const preguntaTexto102 = ref('')
    const preguntaTexto103 = ref('')
    const preguntaTexto104 = ref('')
    const preguntaTexto105 = ref('')
    const preguntaTexto106 = ref('')
    const preguntaTexto107 = ref('')
    const preguntaTexto108 = ref('')
    const preguntaTexto109 = ref('')

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
    const respuestas17 = ref([])
    const respuestas23 = ref([])

    const respuestaSeleccionada = ref(null)
    const respuestaSeleccionada2 = ref(null)
    const respuestaSeleccionada3 = ref(null)
    const respuestaSeleccionada4 = ref(null)
    const respuestaSeleccionada5 = ref(null)
    const respuestaSeleccionada6 = ref(null)
    const respuestaSeleccionada7 = ref(null)
    const respuestaSeleccionada8 = ref(null)
    const respuestaSeleccionada9 = ref(null)
    const respuestaSeleccionada10 = ref(null)
    const respuestaSeleccionada11 = ref(null)
    const respuestaSeleccionada12 = ref(null)

    const radioGroupName = `tipoVivienda`

    const opcion = ref('si')

    const toggleDniField = (value: string) => {
      if (value === 'no') {
        //
      } else {
        //
      }
    }



    const nombres = ref('')
    const apellidos = ref('')
    const fechaNacimiento = ref('')
    const edad = ref<number | null>(null)
    const tableData = ref([])
    const ocupacion = ref('')
    const familia = ref('')
    const idFamilia = ref(null)

    const selectedPersona = ref('')
    const selectedAdolescente = ref('')
    const selectedJoven = ref('')
    const selectedAdulto = ref('')
    const selectedAdultoMayor = ref('')
    const selectedPersonaNinos = reactive({ nombre: '', edad: null })
    const selectedPersonaAdolescentes = reactive({ nombre: '', edad: null })
    const selectedPersonaJovenes = reactive({ nombre: '', edad: null })
    const selectedPersonaAdultos = reactive({ nombre: '', edad: null })
    const selectedPersonaAdultosMayores = reactive({ nombre: '', edad: null })

    const personasEnRangoNinos = ref([])
    const personasEnRangoAdolescentes = ref([])
    const personasEnRangoJovenes = ref([])
    const personasEnRangoAdultos = ref([])
    const personasEnRangoAdultosMayores = ref([])

    const nombreFamilia = ref('')
    const niños_0_11 = ref(0)
    const adolescentes_12_17 = ref(0)
    const jovenes_18_29 = ref(0)
    const adultos_30_59 = ref(0)
    const adultos_mayores_60 = ref(0)

    const respuestaPregunta3 = ref('') // Para capturar la respuesta "Si" o "No"
    const respuestaPregunta4 = ref('') // Para capturar la respuesta "Si" o "No"
    const respuestaPregunta5 = ref('')
    const respuestaPregunta6 = ref('')
    const respuestaPregunta7 = ref('')
    const respuestaPregunta8 = ref('')
    const respuestaPregunta9 = ref('')
    const respuestaPregunta10 = ref('')
    const respuestaPregunta11 = ref('')
    const respuestaPregunta12 = ref('')
    const respuestaPregunta13 = ref('')
    const respuestaPregunta14 = ref('')
    const respuestaPregunta15 = ref('')
    const respuestaPregunta16 = ref('')
    const respuestaPregunta17 = ref('')
    const respuestaPregunta18 = ref('')
    const respuestaPregunta19 = ref('')
    const respuestaPregunta20 = ref('')
    const respuestaPregunta21 = ref('')
    const respuestaPregunta22 = ref('')
    const respuestaPregunta23 = ref('')
    const respuestaPregunta24 = ref('')
    const respuestaPregunta25 = ref('')
    const respuestaPregunta26 = ref('')

    const descripcionCompartidas = ref('') // Para capturar la descripción
    const descripcionQuestion4 = ref('') // Para capturar la descripción
    const descripcionQuestion5 = ref('') // Para capturar la descripción
    const descripcionQuestion23 = ref('') // Para capturar la descripción

    const descripcionpreguntaTexto85 = ref('') // Para capturar la descripción
    const descripcionpreguntaTexto86 = ref('') // Para capturar la descripción
    const descripcionpreguntaTexto90 = ref('') // Para capturar la descripción
    const descripcionpreguntaTexto91 = ref('') // Para capturar la descripción
    const descripcionpreguntaTexto101 = ref('') // Para capturar la descripción
    const descripcionpreguntaTexto104 = ref('') // Para capturar la descripción
    const descripcionpreguntaTexto105 = ref('') // Para capturar la descripción
    const descripcionpreguntaTexto106 = ref('') // Para capturar la descripción
    const descripcionpreguntaTexto108 = ref('') // Para capturar la descripción

    const descripcionPregunta41 = ref('') // Para capturar la descripción
    const descripcionpreguntaTexto43 = ref('') // Para capturar la descripción
    const descripcionpreguntaTexto44 = ref('') // Para capturar la descripción

    const descicripcionpreguntaTexto54 = ref('') // Para capturar la descripción
    const descicripcionpreguntaTexto55 = ref('') // Para capturar la descripción
    const descicripcionpreguntaTexto56 = ref('') // Para capturar la descripción
    const descripcionpreguntaTexto60 = ref('') // Para capturar la descripción
    const descripcionpreguntaTexto61 = ref('') // Para capturar la descripción
    const descripcionpreguntaTexto62 = ref('') // Para capturar la descripción
    const descripcionpreguntaTexto64 = ref('') // Para capturar la descripción
    const descripcionpreguntaTexto65 = ref('') // Para capturar la descripción
    const descripcionpreguntaTexto66 = ref('') // Para capturar la descripción
    const descripcionpreguntaTexto68 = ref('') // Para capturar la descripción
    const descripcionPreguntaTexto84 = ref('') // Para capturar la descripción

 

    const showBlock = ref(1)
    const valorInput = ref('') // Inicializar la variable con un valor por defecto


    const personaSeleccionada = ref(null);
    // Otras variables de estado para el formulario de edición

    const editarPersona = (persona) => {
      // Guarda la persona seleccionada en personaSeleccionada para su edición
      personaSeleccionada.value = persona;


     

      nombres.value = personaSeleccionada.value.pers_nombres;
  apellidos.value = personaSeleccionada.value.pers_apellidos;
  fechaNacimiento.value = format(new Date(personaSeleccionada.value.pers_fecha_nacimiento), 'yyyy-MM-dd');
  edad.value = personaSeleccionada.value.edad;
  searchDNI.value = personaSeleccionada.value.pers_numero_documento_identidad;

  

      console.log(fechaNacimiento.value);
      
      // Otras lógicas para llenar el formulario de edición, si es necesario
    };


    const capturarRespuesta = (respuesta: any) => {
      respuestaSeleccionada.value = respuesta

      console.log(respuestaSeleccionada.value)
    }

    const capturarRespuesta2 = (respuesta: any) => {
      respuestaSeleccionada2.value = respuesta
      console.log(respuestaSeleccionada2.value)
    }

    const capturarRespuesta3 = (respuesta: any) => {
      respuestaSeleccionada3.value = respuesta

      console.log(respuestaSeleccionada3.value)
      // Puedes hacer más cosas con la respuesta seleccionada si es necesario
    }

    const capturarRespuesta4 = (respuesta: any) => {
      respuestaSeleccionada4.value = respuesta

      console.log(respuestaSeleccionada4.value)
      // Puedes hacer más cosas con la respuesta seleccionada si es necesario
    }

    const capturarRespuesta5 = (respuesta: any) => {
      respuestaSeleccionada5.value = respuesta

      console.log(respuestaSeleccionada5.value)
      // Puedes hacer más cosas con la respuesta seleccionada si es necesario
    }

    const capturarRespuesta6 = (respuesta: any) => {
      respuestaSeleccionada6.value = respuesta

      console.log(respuestaSeleccionada6.value)
      // Puedes hacer más cosas con la respuesta seleccionada si es necesario
    }

    const capturarRespuesta7 = (respuesta: any) => {
      respuestaSeleccionada7.value = respuesta

      console.log(respuestaSeleccionada7.value)
      // Puedes hacer más cosas con la respuesta seleccionada si es necesario
    }

    const capturarRespuesta8 = (respuesta: any) => {
      respuestaSeleccionada8.value = respuesta

      console.log(respuestaSeleccionada8.value)
      // Puedes hacer más cosas con la respuesta seleccionada si es necesario
    }

    const capturarRespuesta9 = (respuesta: any) => {
      respuestaSeleccionada9.value = respuesta

      console.log(respuestaSeleccionada9.value)
      // Puedes hacer más cosas con la respuesta seleccionada si es necesario
    }

    const capturarRespuesta10 = (respuesta: any) => {
      respuestaSeleccionada10.value = respuesta

      console.log(respuestaSeleccionada10.value)
      // Puedes hacer más cosas con la respuesta seleccionada si es necesario
    }

    const capturarRespuesta11 = (respuesta: any) => {
      respuestaSeleccionada11.value = respuesta

      console.log(respuestaSeleccionada11.value)
      // Puedes hacer más cosas con la respuesta seleccionada si es necesario
    }

    const capturarRespuesta12 = (respuesta: any) => {
      respuestaSeleccionada12.value = respuesta

      console.log(respuestaSeleccionada11.value)
      // Puedes hacer más cosas con la respuesta seleccionada si es necesario
    }

    const mostrarSiguienteBloque = () => {
      if (showBlock.value < 6) {
        obtenerAdolescentes()
        obtenerJovenes()
        obtenerAdultos()
        obtenerAdultosMayores()
        showBlock.value += 1
      }
    }

    const mostrarCampoEntrada = ref(false)
    const nuevoNombreFamilia = ref('')

    const headers = useAuth().headers()

    const showInputField = () => {
      mostrarCampoEntrada.value = true
    }

    const saveFamilyCaracteristicas = async () => {
      try {
        const checkboxes0 = document.querySelectorAll(
          'input[type="checkbox"][name="preguntaTexto1"]:checked'
        )
        const respuestasSeleccionadas0 = Array.from(checkboxes0).map((checkbox) => checkbox.value)
        const selectedValues = respuestasSeleccionadas0

        const selectedQuestion1 = [valorInput.value]
        const selectedQuestion2 = [respuestaPregunta3.value]
        const selectedQuestion3 = descripcionCompartidas.value

        const selectedQuestion4 = [respuestaPregunta4.value]
        const detallexQuestion4 = descripcionQuestion4.value
        const selectedQuestion5 = [respuestaPregunta5.value]

        const detallexQuestion5 = descripcionQuestion5.value

        const selectedQuestion6 = [respuestaSeleccionada2.value]
        const selectedQuestion7 = [respuestaSeleccionada3.value]

        const checkboxes = document.querySelectorAll(
          'input[type="checkbox"][name="preguntaTexto8"]:checked'
        )
        const respuestasSeleccionadas = Array.from(checkboxes).map((checkbox) => checkbox.value)
        const selectedQuestion8 = respuestasSeleccionadas

        const selectedQuestion9 = [respuestaSeleccionada5.value]

        const checkboxes2 = document.querySelectorAll(
          'input[type="checkbox"][name="preguntaTexto10"]:checked'
        )
        const respuestasSeleccionadas2 = Array.from(checkboxes2).map((checkbox) => checkbox.value)
        const selectedQuestion10 = respuestasSeleccionadas2

        const checkboxes11 = document.querySelectorAll(
          'input[type="checkbox"][name="preguntaTexto11"]:checked'
        )
        const respuestasSeleccionadas11 = Array.from(checkboxes11).map((checkbox) => checkbox.value)
        const selectedQuestion11 = respuestasSeleccionadas11

        const checkboxes3 = document.querySelectorAll(
          'input[type="checkbox"][name="preguntaTexto12"]:checked'
        )
        const respuestasSeleccionadas3 = Array.from(checkboxes3).map((checkbox) => checkbox.value)
        const selectedQuestion12 = respuestasSeleccionadas3

        const checkboxes4 = document.querySelectorAll(
          'input[type="checkbox"][name="preguntaTexto13"]:checked'
        )
        const respuestasSeleccionadas4 = Array.from(checkboxes4).map((checkbox) => checkbox.value)
        const selectedQuestion13 = respuestasSeleccionadas4

        const selectedQuestion14 = [respuestaPregunta14.value]

        const checkboxesex = document.querySelectorAll(
          'input[type="checkbox"][name="preguntaTexto15"]:checked'
        )
        const respuestasSeleccionadasex = Array.from(checkboxesex).map((checkbox) => checkbox.value)
        const selectedQuestion15 = respuestasSeleccionadasex

        const selectedQuestion16 = [respuestaPregunta16.value]

        const checkboxes5 = document.querySelectorAll(
          'input[type="checkbox"][name="preguntaTexto17"]:checked'
        )
        const respuestasSeleccionadas5 = Array.from(checkboxes5).map((checkbox) => checkbox.value)
        const selectedQuestion17 = respuestasSeleccionadas5

        const selectedQuestion18 = [respuestaPregunta18.value]
        const selectedQuestion19 = [respuestaPregunta19.value]
        const selectedQuestion20 = [respuestaPregunta20.value]
        const selectedQuestion21 = [respuestaPregunta21.value]
        const selectedQuestion22 = [respuestaPregunta22.value]

        const checkboxesees = document.querySelectorAll(
          'input[type="checkbox"][name="preguntaTexto23"]:checked'
        )
        const respuestasSeleccionadasss = Array.from(checkboxesees).map(
          (checkbox) => checkbox.value
        )
        const selectedQuestion23 = respuestasSeleccionadasss

        const detallexQuestion23 = descripcionQuestion23.value
        const selectedQuestion24 = [respuestaPregunta24.value]
        const selectedQuestion25 = [respuestaPregunta25.value]
        const selectedQuestion26 = [respuestaPregunta26.value]

        const data = {
          respuestas: {
            '1': {
              respuesta: selectedValues,
              detalle: ''
            },
            '2': {
              respuesta: selectedQuestion1,
              detalle: ''
            },
            '3': {
              respuesta: selectedQuestion2,
              detalle: selectedQuestion3
            },
            '4': {
              respuesta: selectedQuestion4,
              detalle: detallexQuestion4
            },
            '5': {
              respuesta: selectedQuestion5,
              detalle: detallexQuestion5
            },
            '6': {
              respuesta: selectedQuestion6,
              detalle: ''
            },
            '7': {
              respuesta: selectedQuestion7,
              detalle: ''
            },
            '8': {
              respuesta: selectedQuestion8,
              detalle: ''
            },
            '9': {
              respuesta: selectedQuestion9,
              detalle: ''
            },
            '10': {
              respuesta: selectedQuestion10,
              detalle: ''
            },
            '11': {
              respuesta: selectedQuestion11,
              detalle: ''
            },
            '12': {
              respuesta: selectedQuestion12,
              detalle: ''
            },
            '13': {
              respuesta: selectedQuestion13,
              detalle: ''
            },
            '14': {
              respuesta: selectedQuestion14,
              detalle: ''
            },
            '15': {
              respuesta: selectedQuestion15,
              detalle: ''
            },
            '16': {
              respuesta: selectedQuestion16,
              detalle: ''
            },
            '17': {
              respuesta: selectedQuestion17,
              detalle: ''
            },
            '18': {
              respuesta: selectedQuestion18,
              detalle: ''
            },
            '19': {
              respuesta: selectedQuestion19,
              detalle: ''
            },
            '20': {
              respuesta: selectedQuestion20,
              detalle: ''
            },
            '21': {
              respuesta: selectedQuestion21,
              detalle: ''
            },
            '22': {
              respuesta: selectedQuestion22,
              detalle: ''
            },
            '23': {
              respuesta: selectedQuestion23,
              detalle: detallexQuestion23
            },
            '24': {
              respuesta: selectedQuestion24,
              detalle: ''
            },
            '26': {
              respuesta: selectedQuestion25,
              detalle: ''
            },
            '27': {
              respuesta: selectedQuestion26,
              detalle: ''
            }
          },
          familia_id: idFamilia.value
        }

        console.log(data)

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/pregunta-familia/create`,
          data,
          {
            ...headers
          }
        )

        console.log(response)

        if (response.status === 201) {
          ElMessage.success(response.data.message)
          const resetAllCheckboxesAndRadios = () => {
            const inputsToReset = document.querySelectorAll(
              'input[type="checkbox"], input[type="radio"]'
            )

            inputsToReset.forEach((input: any) => {
              input.checked = false
            })
          }

          resetAllCheckboxesAndRadios()
        } else {
          ElMessage.error('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.')
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
          } else if (error.response.status === 409) {
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

    const saveFamilyDimentions = async () => {
      try {
        const selectedValues85 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto85"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues86 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto86"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues87 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto87"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues88 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto88"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues89 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto89"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues90 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto90"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues91 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto91"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues92 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto92"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues93 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto93"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues94 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto94"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues95 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto95"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues96 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto96"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues97 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto97"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues98 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto98"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues99 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto99"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues100 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto100"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues101 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto101"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues102 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto102"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues103 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto103"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues104 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto104"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues105 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto105"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues106 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto106"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues107 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto107"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues108 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto108"]:checked')
        ).map((checkbox) => checkbox.value)

        if (
          selectedValues85.length === 0 ||
          selectedValues86.length === 0 ||
          selectedValues87.length === 0 ||
          selectedValues88.length === 0 ||
          selectedValues89.length === 0 ||
          selectedValues90.length === 0 ||
          selectedValues91.length === 0 ||
          selectedValues92.length === 0 ||
          selectedValues93.length === 0 ||
          selectedValues94.length === 0 ||
          selectedValues95.length === 0 ||
          selectedValues96.length === 0 ||
          selectedValues97.length === 0 ||
          selectedValues98.length === 0 ||
          selectedValues99.length === 0 ||
          selectedValues100.length === 0 ||
          selectedValues101.length === 0 ||
          selectedValues102.length === 0 ||
          selectedValues103.length === 0 ||
          selectedValues104.length === 0 ||
          selectedValues105.length === 0 ||
          selectedValues106.length === 0 ||
          selectedValues107.length === 0 ||
          selectedValues108.length === 0
        ) {
          ElMessage.error('Por favor, completa todas las preguntas.')
          return
        }

        const data = {
          respuestas: {
            '86': {
              respuesta: selectedValues85,
              detalle: descripcionpreguntaTexto85.value
            },
            '87': {
              respuesta: selectedValues86,
              detalle: descripcionpreguntaTexto86.value
            },
            '88': {
              respuesta: selectedValues87,
              detalle: ''
            },
            '89': {
              respuesta: selectedValues88,
              detalle: ''
            },
            '90': {
              respuesta: selectedValues89,
              detalle: ''
            },
            '91': {
              respuesta: selectedValues90,
              detalle: descripcionpreguntaTexto90.value
            },
            '92': {
              respuesta: selectedValues91,
              detalle: descripcionpreguntaTexto91.value
            },
            '93': {
              respuesta: selectedValues92,
              detalle: ''
            },
            '94': {
              respuesta: selectedValues93,
              detalle: ''
            },
            '95': {
              respuesta: selectedValues94,
              detalle: ''
            },
            '96': {
              respuesta: selectedValues95,
              detalle: ''
            },
            '97': {
              respuesta: selectedValues96,
              detalle: ''
            },
            '98': {
              respuesta: selectedValues97,
              detalle: ''
            },
            '99': {
              respuesta: selectedValues98,
              detalle: ''
            },
            '100': {
              respuesta: selectedValues99,
              detalle: ''
            },
            '101': {
              respuesta: selectedValues100,
              detalle: ''
            },
            '102': {
              respuesta: selectedValues101,
              detalle: descripcionpreguntaTexto101.value
            },
            '103': {
              respuesta: selectedValues102,
              detalle: ''
            },
            '104': {
              respuesta: selectedValues103,
              detalle: ''
            },
            '105': {
              respuesta: selectedValues104,
              detalle: descripcionpreguntaTexto104.value
            },
            '106': {
              respuesta: selectedValues105,
              detalle: descripcionpreguntaTexto105.value
            },
            '107': {
              respuesta: selectedValues106,
              detalle: descripcionpreguntaTexto106.value
            },
            '108': {
              respuesta: selectedValues107,
              detalle: ''
            },
            '109': {
              respuesta: selectedValues108,
              detalle: descripcionpreguntaTexto108.value
            }
          },
          familia_id: 29
        }

        console.log(data)

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/pregunta-familia/create`,
          data,
          {
            ...headers
          }
        )

        console.log(response)

        if (response.status === 201) {
          ElMessage.success(response.data.message)
          const resetAllCheckboxesAndRadios = () => {
            const inputsToReset = document.querySelectorAll(
              'input[type="checkbox"], input[type="radio"]'
            )

            inputsToReset.forEach((input: any) => {
              input.checked = false
            })
          }

          resetAllCheckboxesAndRadios()
        } else {
          ElMessage.error('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.')
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
          } else if (error.response.status === 409) {
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

    const saveRiesgosNiños = async () => {
      try {
        const selectedValues = Array.from(
          document.querySelectorAll('input[name="pregunta1"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion1 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto28"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion2 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto29"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion3 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto30"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion4 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto31"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion5 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto32"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion6 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto33"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion7 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto34"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion8 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto35"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion9 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto36"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion10 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto37"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion11 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto38"]:checked')
        ).map((input: any) => input.value)

        console.log(selectedValues)

        if (
          selectedValues.length === 0 ||
          selectedQuestion1.length === 0 ||
          selectedQuestion2.length === 0 ||
          selectedQuestion3.length === 0 ||
          selectedQuestion4.length === 0 ||
          selectedQuestion5.length === 0 ||
          selectedQuestion6.length === 0 ||
          selectedQuestion7.length === 0 ||
          selectedQuestion8.length === 0 ||
          selectedQuestion9.length === 0 ||
          selectedQuestion10.length === 0 ||
          selectedQuestion11.length === 0
        ) {
          ElMessage.error('Por favor, completa todas las preguntas.')
          return
        }

        const data = {
          respuestas: [
            {
              pregunta_id: 27,
              respuesta: selectedValues,
              detalle: ''
            },
            {
              pregunta_id: 28,
              respuesta: selectedQuestion1,
              detalle: ''
            },
            {
              pregunta_id: 29,
              respuesta: selectedQuestion2,
              detalle: ''
            },
            {
              pregunta_id: 30,
              respuesta: selectedQuestion3,
              detalle: ''
            },
            {
              pregunta_id: 31,
              respuesta: selectedQuestion4,
              detalle: ''
            },
            {
              pregunta_id: 32,
              respuesta: selectedQuestion5,
              detalle: ''
            },
            {
              pregunta_id: 33,
              respuesta: selectedQuestion6,
              detalle: ''
            },
            {
              pregunta_id: 34,
              respuesta: selectedQuestion7,
              detalle: ''
            },
            {
              pregunta_id: 35,
              respuesta: selectedQuestion8,
              detalle: ''
            },
            {
              pregunta_id: 36,
              respuesta: selectedQuestion9,
              detalle: ''
            },
            {
              pregunta_id: 37,
              respuesta: selectedQuestion10,
              detalle: ''
            },
            {
              pregunta_id: 38,
              respuesta: selectedQuestion11,
              detalle: ''
            }
          ],
          persona_id: 6
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/pregunta-persona/create`,
          data,
          {
            ...headers
          }
        )

        console.log(response)

        if (response.status === 201) {
          ElMessage.success(response.data.message)
          const resetAllCheckboxesAndRadios = () => {
            const inputsToReset = document.querySelectorAll(
              'input[type="checkbox"], input[type="radio"]'
            )

            inputsToReset.forEach((input: any) => {
              input.checked = false
            })
          }

          resetAllCheckboxesAndRadios()
        } else {
          ElMessage.error('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.')
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
          } else if (error.response.status === 409) {
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

    const saveRiesgosAdolescentes = async () => {
      try {
        const selectedValues = Array.from(
          document.querySelectorAll('input[name="preguntaTexto39"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion1 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto40"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion2 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto41"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion3 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto42"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion4 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto43"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion5 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto44"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion6 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto45"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion7 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto46"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion8 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto47"]:checked')
        ).map((input: any) => input.value)

        console.log(selectedValues)

        if (
          selectedValues.length === 0 ||
          selectedQuestion1.length === 0 ||
          selectedQuestion2.length === 0 ||
          selectedQuestion3.length === 0 ||
          selectedQuestion4.length === 0 ||
          selectedQuestion5.length === 0 ||
          selectedQuestion6.length === 0 ||
          selectedQuestion7.length === 0 ||
          selectedQuestion8.length === 0
        ) {
          ElMessage.error('Por favor, completa todas las preguntas.')
          return
        }

        const data = {
          respuestas: [
            {
              pregunta_id: 39,
              respuesta: selectedValues,
              detalle: ''
            },
            {
              pregunta_id: 40,
              respuesta: selectedQuestion1,
              detalle: ''
            },
            {
              pregunta_id: 41,
              respuesta: selectedQuestion2,
              detalle: descripcionPregunta41.value
            },
            {
              pregunta_id: 42,
              respuesta: selectedQuestion3,
              detalle: ''
            },
            {
              pregunta_id: 44,
              respuesta: selectedQuestion4,
              detalle: descripcionpreguntaTexto43.value
            },
            {
              pregunta_id: 45,
              respuesta: selectedQuestion5,
              detalle: descripcionpreguntaTexto44.value
            },
            {
              pregunta_id: 46,
              respuesta: selectedQuestion6,
              detalle: ''
            },
            {
              pregunta_id: 47,
              respuesta: selectedQuestion7,
              detalle: ''
            },
            {
              pregunta_id: 48,
              respuesta: selectedQuestion8,
              detalle: ''
            }
          ],
          persona_id: 6
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/pregunta-persona/create`,
          data,
          {
            ...headers
          }
        )

        console.log(response)

        if (response.status === 201) {
          ElMessage.success(response.data.message)
          const resetAllCheckboxesAndRadios = () => {
            const inputsToReset = document.querySelectorAll(
              'input[type="checkbox"], input[type="radio"]'
            )

            inputsToReset.forEach((input: any) => {
              input.checked = false
            })
          }

          resetAllCheckboxesAndRadios()
        } else {
          ElMessage.error('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.')
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
          } else if (error.response.status === 409) {
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

    const saveRiesgosJovenes = async () => {
      try {
        const selectedValues = Array.from(
          document.querySelectorAll('input[name="preguntaTexto48"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion1 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto49"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion2 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto50"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion3 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto51"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion4 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto52"]:checked')
        ).map((input: any) => input.value)

        if (
          selectedValues.length === 0 ||
          selectedQuestion1.length === 0 ||
          selectedQuestion2.length === 0 ||
          selectedQuestion3.length === 0 ||
          selectedQuestion4.length === 0
        ) {
          ElMessage.error('Por favor, completa todas las preguntas.')
          return
        }

        const data = {
          respuestas: [
            {
              pregunta_id: 49,
              respuesta: selectedValues,
              detalle: ''
            },
            {
              pregunta_id: 50,
              respuesta: selectedQuestion1,
              detalle: ''
            },
            {
              pregunta_id: 51,
              respuesta: selectedQuestion2,
              detalle: ''
            },
            {
              pregunta_id: 52,
              respuesta: selectedQuestion3,
              detalle: ''
            },
            {
              pregunta_id: 53,
              respuesta: selectedQuestion4,
              detalle: ''
            },
          ],
          persona_id: 29
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/pregunta-persona/create`,
          data,
          {
            ...headers
          }
        )

        console.log(response)

        if (response.status === 201) {
          ElMessage.success(response.data.message)
          const resetAllCheckboxesAndRadios = () => {
            const inputsToReset = document.querySelectorAll(
              'input[type="checkbox"], input[type="radio"]'
            )

            inputsToReset.forEach((input: any) => {
              input.checked = false
            })
          }

          resetAllCheckboxesAndRadios()
        } else {
          ElMessage.error('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.')
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
          } else if (error.response.status === 409) {
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

    const saveRiesgosAdultos = async () => {
      try {
        const selectedValues = Array.from(
          document.querySelectorAll('input[name="preguntaTexto53"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion1 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto54"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion2 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto55"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion3 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto56"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion4 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto57"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion5 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto58"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion6 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto59"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion7 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto60"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion8 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto61"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion9 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto62"]:checked')
        ).map((input: any) => input.value)

        console.log(selectedValues)

        if (
          selectedValues.length === 0 ||
          selectedQuestion1.length === 0 ||
          selectedQuestion2.length === 0 ||
          selectedQuestion3.length === 0 ||
          selectedQuestion4.length === 0 ||
          selectedQuestion5.length === 0 ||
          selectedQuestion6.length === 0 ||
          selectedQuestion7.length === 0 ||
          selectedQuestion8.length === 0 ||
          selectedQuestion9.length === 0
        ) {
          ElMessage.error('Por favor, completa todas las preguntas.')
          return
        }

        const data = {
          respuestas: [
            {
              pregunta_id: 54,
              respuesta: selectedValues,
              detalle: ''
            },
            {
              pregunta_id: 55,
              respuesta: selectedQuestion1,
              detalle: descicripcionpreguntaTexto54.value
            },
            {
              pregunta_id: 56,
              respuesta: selectedQuestion2,
              detalle: descicripcionpreguntaTexto55.value
            },
            {
              pregunta_id: 57,
              respuesta: selectedQuestion3,
              detalle: descicripcionpreguntaTexto56.value
            },
            {
              pregunta_id: 58,
              respuesta: selectedQuestion4,
              detalle: ''
            },
            {
              pregunta_id: 59,
              respuesta: selectedQuestion5,
              detalle: ''
            },
            {
              pregunta_id: 60,
              respuesta: selectedQuestion6,
              detalle: ''
            },
            {
              pregunta_id: 61,
              respuesta: selectedQuestion7,
              detalle: descripcionpreguntaTexto60.value
            },
            {
              pregunta_id: 62,
              respuesta: selectedQuestion8,
              detalle: descripcionpreguntaTexto61.value
            },
            {
              pregunta_id: 63,
              respuesta: selectedQuestion9,
              detalle: descripcionpreguntaTexto62.value
            }
          ],
          persona_id: 29
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/pregunta-persona/create`,
          data,
          {
            ...headers
          }
        )

        console.log(response)

        if (response.status === 201) {
          ElMessage.success(response.data.message)
          const resetAllCheckboxesAndRadios = () => {
            const inputsToReset = document.querySelectorAll(
              'input[type="checkbox"], input[type="radio"]'
            )

            inputsToReset.forEach((input: any) => {
              input.checked = false
            })
          }

          resetAllCheckboxesAndRadios()
        } else {
          ElMessage.error('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.')
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
          } else if (error.response.status === 409) {
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

    const saveRiesgosAdultosMayores = async () => {
      try {
        const selectedValues = Array.from(
          document.querySelectorAll('input[name="preguntaTexto63"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion1 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto64"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion2 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto65"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion3 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto66"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion4 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto67"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion5 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto68"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion6 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto69"]:checked')
        ).map((input: any) => input.value)

        console.log(selectedValues)

        if (
          selectedValues.length === 0 ||
          selectedQuestion1.length === 0 ||
          selectedQuestion2.length === 0 ||
          selectedQuestion3.length === 0 ||
          selectedQuestion4.length === 0 ||
          selectedQuestion5.length === 0 ||
          selectedQuestion6.length === 0
        ) {
          ElMessage.error('Por favor, completa todas las preguntas.')
          return
        }

        const data = {
          respuestas: [
            {
              pregunta_id: 65,
              respuesta: selectedValues,
              detalle: ''
            },
            {
              pregunta_id: 66,
              respuesta: selectedQuestion1,
              detalle: descripcionpreguntaTexto64.value
            },
            {
              pregunta_id: 67,
              respuesta: selectedQuestion2,
              detalle: descripcionpreguntaTexto65.value
            },
            {
              pregunta_id: 68,
              respuesta: selectedQuestion3,
              detalle: descripcionpreguntaTexto66.value
            },
            {
              pregunta_id: 69,
              respuesta: selectedQuestion4,
              detalle: ''
            },
            {
              pregunta_id: 70,
              respuesta: selectedQuestion5,
              detalle: descripcionpreguntaTexto68.value
            },
            {
              pregunta_id: 71,
              respuesta: selectedQuestion6,
              detalle: ''
            }
          ],
          persona_id: 6
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/pregunta-persona/create`,
          data,
          {
            ...headers
          }
        )

        console.log(response)

        if (response.status === 201) {
          ElMessage.success(response.data.message)
          const resetAllCheckboxesAndRadios = () => {
            const inputsToReset = document.querySelectorAll(
              'input[type="checkbox"], input[type="radio"]'
            )

            inputsToReset.forEach((input: any) => {
              input.checked = false
            })
          }

          resetAllCheckboxesAndRadios()
        } else {
          ElMessage.error('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.')
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
          } else if (error.response.status === 409) {
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

    const saveRiesgosDiscapacidad = async () => {
      try {
        const selectedValues70 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto70"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion71 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto71"]:checked')
        ).map((input: any) => input.value)

        console.log(selectedValues70)

        if (
          selectedValues70.length === 0 ||
          selectedQuestion71.length === 0 
        ) {
          ElMessage.error('Por favor, completa todas las preguntas.')
          return
        }

        const data = {
          respuestas: [
            {
              pregunta_id: 71,
              respuesta: selectedValues70,
              detalle: ''
            },
            {
              pregunta_id: 72,
              respuesta: selectedQuestion71,
              detalle: ''
            },
          ],
          persona_id: 29
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/pregunta-persona/create`,
          data,
          {
            ...headers
          }
        )

        console.log(response)

        if (response.status === 201) {
          ElMessage.success(response.data.message)
          const resetAllCheckboxesAndRadios = () => {
            const inputsToReset = document.querySelectorAll(
              'input[type="checkbox"], input[type="radio"]'
            )

            inputsToReset.forEach((input: any) => {
              input.checked = false
            })
          }

          resetAllCheckboxesAndRadios()
        } else {
          ElMessage.error('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.')
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
          } else if (error.response.status === 409) {
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

    const saveRiesgosGestante = async () => {
      try {
        const selectedValues72= Array.from(
          document.querySelectorAll('input[name="preguntaTexto72"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion73 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto73"]:checked')
        ).map((input: any) => input.value)

        console.log(selectedValues72)

        if (
          selectedValues72.length === 0 ||
          selectedQuestion73.length === 0 
        ) {
          ElMessage.error('Por favor, completa todas las preguntas.')
          return
        }

        const data = {
          respuestas: [
            {
              pregunta_id: 73,
              respuesta: selectedValues72,
              detalle: ''
            },
            {
              pregunta_id: 74,
              respuesta: selectedQuestion73,
              detalle: ''
            },
          ],
          persona_id: 29
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/pregunta-persona/create`,
          data,
          {
            ...headers
          }
        )

        console.log(response)

        if (response.status === 201) {
          ElMessage.success(response.data.message)
          const resetAllCheckboxesAndRadios = () => {
            const inputsToReset = document.querySelectorAll(
              'input[type="checkbox"], input[type="radio"]'
            )

            inputsToReset.forEach((input: any) => {
              input.checked = false
            })
          }

          resetAllCheckboxesAndRadios()
        } else {
          ElMessage.error('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.')
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
          } else if (error.response.status === 409) {
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

    const saveRiesgosPuerpera = async () => {
      try {
        const selectedValues74= Array.from(
          document.querySelectorAll('input[name="preguntaTexto74"]:checked')
        ).map((input: any) => input.value)

        const selectedQuestion75 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto75"]:checked')
        ).map((input: any) => input.value)

        console.log(selectedValues74)

        if (
          selectedValues74.length === 0 ||
          selectedQuestion75.length === 0 
        ) {
          ElMessage.error('Por favor, completa todas las preguntas.')
          return
        }

        const data = {
          respuestas: [
            {
              pregunta_id: 75,
              respuesta: selectedValues74,
              detalle: ''
            },
            {
              pregunta_id: 76,
              respuesta: selectedQuestion75,
              detalle: ''
            },
          ],
          persona_id: 29
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/pregunta-persona/create`,
          data,
          {
            ...headers
          }
        )

        console.log(response)

        if (response.status === 201) {
          ElMessage.success(response.data.message)
          const resetAllCheckboxesAndRadios = () => {
            const inputsToReset = document.querySelectorAll(
              'input[type="checkbox"], input[type="radio"]'
            )

            inputsToReset.forEach((input: any) => {
              input.checked = false
            })
          }

          resetAllCheckboxesAndRadios()
        } else {
          ElMessage.error('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.')
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
          } else if (error.response.status === 409) {
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

    const saveOtrosRiesgos = async () => {

      try {
        const selectedValues76 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto76"]:checked')
        ).map((input: any) => input.value)

        console.log(selectedValues76)

        if (
          selectedValues76.length === 0 
        ) {
          ElMessage.error('Por favor, completa todas las preguntas.')
          return
        }

        const data = {
          respuestas: [
            {
              pregunta_id: 77,
              respuesta: selectedValues76,
              detalle: ''
            }
          ],
          persona_id: 29
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/pregunta-persona/create`,
          data,
          {
            ...headers
          }
        )

        console.log(response)

        if (response.status === 201) {
          ElMessage.success(response.data.message)
          const resetAllCheckboxesAndRadios = () => {
            const inputsToReset = document.querySelectorAll(
              'input[type="checkbox"], input[type="radio"]'
            )

            inputsToReset.forEach((input: any) => {
              input.checked = false
            })
          }

          resetAllCheckboxesAndRadios()
        } else {
          ElMessage.error('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.')
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
          } else if (error.response.status === 409) {
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

    const saveRiesgosFamilia = async () => {
      try {
        const selectedValues77 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto77"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues78 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto78"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues79 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto79"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues80 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto80"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues81 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto81"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues82 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto82"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues83= Array.from(
          document.querySelectorAll('input[name="preguntaTexto83"]:checked')
        ).map((checkbox) => checkbox.value)
        const selectedValues84 = Array.from(
          document.querySelectorAll('input[name="preguntaTexto84"]:checked')
        ).map((checkbox) => checkbox.value)

        if (
          selectedValues77.length === 0 ||
          selectedValues78.length === 0 ||
          selectedValues79.length === 0 ||
          selectedValues80.length === 0 ||
          selectedValues81.length === 0 ||
          selectedValues82.length === 0 ||
          selectedValues83.length === 0 ||
          selectedValues84.length === 0 
        ) {
          ElMessage.error('Por favor, completa todas las preguntas.')
          return
        }

        const data = {
          respuestas: {
            '77': {
              respuesta: selectedValues77,
              detalle: ''
            },
            '78': {
              respuesta: selectedValues78,
              detalle: ''
            },
            '79': {
              respuesta: selectedValues79,
              detalle: ''
            },
            '80': {
              respuesta: selectedValues80,
              detalle: ''
            },
            '81': {
              respuesta: selectedValues81,
              detalle: ''
            },
            '82': {
              respuesta: selectedValues82,
              detalle: ''
            },
            '83': {
              respuesta: selectedValues83,
              detalle: ''
            },
            '84': {
              respuesta: selectedValues84,
              detalle: descripcionPreguntaTexto84.value
            },
          },
          familia_id: 29
        }

        console.log(data)

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/pregunta-familia/create`,
          data,
          {
            ...headers
          }
        )

        console.log(response)

        if (response.status === 201) {
          ElMessage.success(response.data.message)
          const resetAllCheckboxesAndRadios = () => {
            const inputsToReset = document.querySelectorAll(
              'input[type="checkbox"], input[type="radio"]'
            )

            inputsToReset.forEach((input: any) => {
              input.checked = false
            })
          }

          resetAllCheckboxesAndRadios()
        } else {
          ElMessage.error('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.')
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
          } else if (error.response.status === 409) {
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
            
            nombres.value = '';
  apellidos.value = '';
  fechaNacimiento.value = '';
  searchDNI.value = '';
  edad.value = null;

                // Llamar a asignarPersonaAFamilia
      const personaId = response.data.data.id; // Asegúrate de obtener el ID de la persona creada


            const asignarPersonaAFamiliaResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/familia/asignar-persona-a-familia`,
        {
          persona_id: personaId,
          familia_id: idFamilia.value
        },
        {
          ...headers
        }
      );

      console.log(asignarPersonaAFamiliaResponse);

      if (asignarPersonaAFamiliaResponse.status === 200) {
        ElMessage.success(asignarPersonaAFamiliaResponse.data.message);
        fetchFamilies()
      }
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
          const pregunta28 = data.data[27]
          const pregunta29 = data.data[28]
          const pregunta30 = data.data[29]
          const pregunta31 = data.data[30]
          const pregunta32 = data.data[31]
          const pregunta33 = data.data[32]
          const pregunta34 = data.data[33]
          const pregunta35 = data.data[34]
          const pregunta36 = data.data[35]
          const pregunta37 = data.data[36]
          const pregunta38 = data.data[37]
          const pregunta39 = data.data[38]
          const pregunta40 = data.data[39]
          const pregunta41 = data.data[40]
          const pregunta42 = data.data[41]
          const pregunta43 = data.data[42]
          const pregunta44 = data.data[43]
          const pregunta45 = data.data[44]
          const pregunta46 = data.data[45]
          const pregunta47 = data.data[46]
          const pregunta48 = data.data[47]
          const pregunta49 = data.data[48]
          const pregunta50 = data.data[49]
          const pregunta51 = data.data[50]
          const pregunta52 = data.data[51]
          const pregunta53 = data.data[52]
          const pregunta54 = data.data[53]
          const pregunta55 = data.data[54]
          const pregunta56 = data.data[55]
          const pregunta57 = data.data[56]
          const pregunta58 = data.data[57]
          const pregunta59 = data.data[58]
          const pregunta60 = data.data[59]
          const pregunta61 = data.data[60]
          const pregunta62 = data.data[61]
          const pregunta63 = data.data[62]
          const pregunta64 = data.data[63]
          const pregunta65 = data.data[64]
          const pregunta66 = data.data[65]
          const pregunta67 = data.data[66]
          const pregunta68 = data.data[67]
          const pregunta69 = data.data[68]
          const pregunta70 = data.data[69]
          const pregunta71 = data.data[70]
          const pregunta72 = data.data[71]
          const pregunta73 = data.data[72]
          const pregunta74 = data.data[73]
          const pregunta75 = data.data[74]
          const pregunta76 = data.data[75]
          const pregunta77 = data.data[76]
          const pregunta78 = data.data[77]
          const pregunta79 = data.data[78]
          const pregunta80 = data.data[79]
          const pregunta81 = data.data[80]
          const pregunta82 = data.data[81]
          const pregunta83 = data.data[82]
          const pregunta84 = data.data[83]
          const pregunta85 = data.data[84]
          const pregunta86 = data.data[85]
          const pregunta87 = data.data[86]
          const pregunta88 = data.data[87]
          const pregunta89 = data.data[88]
          const pregunta90 = data.data[89]
          const pregunta91 = data.data[90]
          const pregunta92 = data.data[91]
          const pregunta93 = data.data[92]
          const pregunta94 = data.data[93]
          const pregunta95 = data.data[94]
          const pregunta96 = data.data[95]
          const pregunta97 = data.data[96]
          const pregunta98 = data.data[97]
          const pregunta99 = data.data[98]
          const pregunta100 = data.data[99]
          const pregunta101 = data.data[100]
          const pregunta102 = data.data[101]
          const pregunta103 = data.data[102]
          const pregunta104 = data.data[103]
          const pregunta105 = data.data[104]
          const pregunta106 = data.data[105]
          const pregunta107 = data.data[106]
          const pregunta108 = data.data[107]
          const pregunta109 = data.data[108]

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
          preguntaTexto28.value = pregunta28.pre_pregunta
          preguntaTexto29.value = pregunta29.pre_pregunta
          preguntaTexto30.value = pregunta30.pre_pregunta
          preguntaTexto31.value = pregunta31.pre_pregunta
          preguntaTexto32.value = pregunta32.pre_pregunta
          preguntaTexto33.value = pregunta33.pre_pregunta
          preguntaTexto34.value = pregunta34.pre_pregunta
          preguntaTexto35.value = pregunta35.pre_pregunta
          preguntaTexto36.value = pregunta36.pre_pregunta
          preguntaTexto37.value = pregunta37.pre_pregunta
          preguntaTexto38.value = pregunta38.pre_pregunta
          preguntaTexto39.value = pregunta39.pre_pregunta
          preguntaTexto40.value = pregunta40.pre_pregunta
          preguntaTexto41.value = pregunta41.pre_pregunta
          preguntaTexto42.value = pregunta42.pre_pregunta
          preguntaTexto43.value = pregunta43.pre_pregunta
          preguntaTexto44.value = pregunta44.pre_pregunta
          preguntaTexto45.value = pregunta45.pre_pregunta
          preguntaTexto46.value = pregunta46.pre_pregunta
          preguntaTexto47.value = pregunta47.pre_pregunta
          preguntaTexto48.value = pregunta48.pre_pregunta
          preguntaTexto49.value = pregunta49.pre_pregunta
          preguntaTexto50.value = pregunta50.pre_pregunta
          preguntaTexto51.value = pregunta51.pre_pregunta
          preguntaTexto52.value = pregunta52.pre_pregunta
          preguntaTexto53.value = pregunta53.pre_pregunta
          preguntaTexto54.value = pregunta54.pre_pregunta
          preguntaTexto55.value = pregunta55.pre_pregunta
          preguntaTexto56.value = pregunta56.pre_pregunta
          preguntaTexto57.value = pregunta57.pre_pregunta
          preguntaTexto58.value = pregunta58.pre_pregunta
          preguntaTexto59.value = pregunta59.pre_pregunta
          preguntaTexto60.value = pregunta60.pre_pregunta
          preguntaTexto61.value = pregunta61.pre_pregunta
          preguntaTexto62.value = pregunta62.pre_pregunta
          preguntaTexto63.value = pregunta63.pre_pregunta
          preguntaTexto64.value = pregunta64.pre_pregunta
          preguntaTexto65.value = pregunta65.pre_pregunta
          preguntaTexto66.value = pregunta66.pre_pregunta
          preguntaTexto67.value = pregunta67.pre_pregunta
          preguntaTexto68.value = pregunta68.pre_pregunta
          preguntaTexto69.value = pregunta69.pre_pregunta
          preguntaTexto70.value = pregunta70.pre_pregunta
          preguntaTexto71.value = pregunta71.pre_pregunta
          preguntaTexto72.value = pregunta72.pre_pregunta
          preguntaTexto73.value = pregunta73.pre_pregunta
          preguntaTexto74.value = pregunta74.pre_pregunta
          preguntaTexto75.value = pregunta75.pre_pregunta
          preguntaTexto76.value = pregunta76.pre_pregunta
          preguntaTexto77.value = pregunta77.pre_pregunta
          preguntaTexto78.value = pregunta78.pre_pregunta
          preguntaTexto79.value = pregunta79.pre_pregunta
          preguntaTexto80.value = pregunta80.pre_pregunta
          preguntaTexto81.value = pregunta81.pre_pregunta
          preguntaTexto82.value = pregunta82.pre_pregunta
          preguntaTexto83.value = pregunta83.pre_pregunta
          preguntaTexto84.value = pregunta84.pre_pregunta
          preguntaTexto85.value = pregunta85.pre_pregunta
          preguntaTexto86.value = pregunta86.pre_pregunta
          preguntaTexto87.value = pregunta87.pre_pregunta
          preguntaTexto88.value = pregunta88.pre_pregunta
          preguntaTexto89.value = pregunta89.pre_pregunta
          preguntaTexto90.value = pregunta90.pre_pregunta
          preguntaTexto91.value = pregunta91.pre_pregunta
          preguntaTexto92.value = pregunta92.pre_pregunta
          preguntaTexto93.value = pregunta93.pre_pregunta
          preguntaTexto94.value = pregunta94.pre_pregunta
          preguntaTexto95.value = pregunta95.pre_pregunta
          preguntaTexto96.value = pregunta96.pre_pregunta
          preguntaTexto97.value = pregunta97.pre_pregunta
          preguntaTexto98.value = pregunta98.pre_pregunta
          preguntaTexto99.value = pregunta99.pre_pregunta
          preguntaTexto100.value = pregunta100.pre_pregunta
          preguntaTexto101.value = pregunta101.pre_pregunta
          preguntaTexto102.value = pregunta102.pre_pregunta
          preguntaTexto103.value = pregunta103.pre_pregunta
          preguntaTexto104.value = pregunta104.pre_pregunta
          preguntaTexto105.value = pregunta105.pre_pregunta
          preguntaTexto106.value = pregunta106.pre_pregunta
          preguntaTexto107.value = pregunta107.pre_pregunta
          preguntaTexto108.value = pregunta108.pre_pregunta

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
          respuestas17.value = pregunta17.respuestas_comunes

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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/persona/records-custom`, headers)

        familias.value = response.data.data

        console.log(familias.value)
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
      return ocupaciones.value.filter((occupation: any) => {
        return occupation.ocup_nombre.toLowerCase().includes(searchTerm.value.toLowerCase())
      })
    })

    const filteredFamilies = computed(() => {
      return familias.value.filter((family: any) => {
        return family.fam_nombre_familia.toLowerCase().includes(searchTerm3.value.toLowerCase())
      })
    })

    const filteredPeople = computed(() => {
      return personas.value.filter((person: any) => {
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

    const updateFields = () => {
      const selected = personasEnRangoNinos.value.find(
        (persona: any) => persona.nombre === selectedPersona.value
      )
      if (selected) {
        selectedPersonaNinos.nombre = selected.nombre
        selectedPersonaNinos.edad = selected.edad
      } else {
        selectedPersonaNinos.nombre = ''
        selectedPersonaNinos.edad = null
      }
    }

    const updateFields2 = () => {
      const selected = personasEnRangoAdolescentes.value.find(
        (persona: any) => persona.nombre === selectedAdolescente.value
      )
      if (selected) {
        selectedPersonaAdolescentes.nombre = selected.nombre
        selectedPersonaAdolescentes.edad = selected.edad
      } else {
        selectedPersonaAdolescentes.nombre = ''
        selectedPersonaAdolescentes.edad = null
      }
    }

    const updateFields3 = () => {
  const selectedId = selectedJoven.value; 

  const selected:any = personasEnRangoJovenes.value.find(
    (persona: any) => persona.id === selectedId
  );

  if (selected) {
    const id = selected.id;

    
    const nombre = selected.nombre;
    const edad = selected.edad;

    console.log(id)

    selectedPersonaJovenes.nombre = nombre;
    selectedPersonaJovenes.edad = edad;
  } else {
    selectedPersonaJovenes.nombre = '';
    selectedPersonaJovenes.edad = null;
  }
};

    

    const updateFields4 = () => {
      const selected = personasEnRangoAdultos.value.find(
        (persona: any) => persona.nombre === selectedAdulto.value
      )
      if (selected) {
        selectedPersonaAdultos.nombre = selected.nombre
        selectedPersonaAdultos.edad = selected.edad
      } else {
        selectedPersonaAdolescentes.nombre = ''
        selectedPersonaAdolescentes.edad = null
      }
    }

    const updateFields5 = () => {
      const selected = personasEnRangoAdultosMayores.value.find(
        (persona: any) => persona.nombre === selectedAdultoMayor.value
      )
      if (selected) {
        selectedPersonaAdultosMayores.nombre = selected.nombre
        selectedPersonaAdultosMayores.edad = selected.edad
      } else {
        selectedPersonaAdultosMayores.nombre = ''
        selectedPersonaAdultosMayores.edad = null
      }
    }

    const obtenerNinos = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/familia/${idFamilia.value}/ninos`,
          headers
        )

        personasEnRangoNinos.value = response.data.data

        console.log(personasEnRangoNinos.value)
      } catch (error) {
        console.error('Ocurrió un error inesperado:', error)
      }
    }

    const obtenerAdolescentes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/familia/${idFamilia.value}/adolescentes`,
          headers
        )

        personasEnRangoAdolescentes.value = response.data.data

        console.log(personasEnRangoAdolescentes.value)
      } catch (error) {
        console.error('Ocurrió un error inesperado:', error)
      }
    }

    const obtenerJovenes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/familia/${29}/jovenes`,
          headers
        )

        personasEnRangoJovenes.value = response.data.data

        console.log(personasEnRangoJovenes.value)
      } catch (error) {
        console.error('Ocurrió un error inesperado:', error)
      }
    }

    const obtenerAdultos = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/familia/${idFamilia.value}/adultos`,
          headers
        )

        personasEnRangoAdultos.value = response.data.data

        console.log(personasEnRangoAdultos.value)
      } catch (error) {
        console.error('Ocurrió un error inesperado:', error)
      }
    }

    const obtenerAdultosMayores = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/familia/${idFamilia.value}/adultos-mayores`,
          headers
        )

        personasEnRangoAdultosMayores.value = response.data.data

        console.log(personasEnRangoAdultosMayores.value)
      } catch (error) {
        console.error('Ocurrió un error inesperado:', error)
      }
    }

    watch([searchTerm, searchTerm2, searchTerm3], () => {
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
      saveRiesgosNiños,
      personas,
      toggleDniField,
      opcion,
      ocupacion,
      idFamilia,
      saveRiesgosAdultos,
      familia,
      saveRiesgosJovenes,
      saveOccupation,
      saveFamily,
      preguntaTexto,
      respuestas2,
      selectedPersona,
      selectedPersonaNinos,
      updateFields,
      updateFields2,
      updateFields3,
      updateFields4,
      updateFields5,
      personasEnRangoNinos,
      obtenerNinos,
      obtenerAdolescentes,
      obtenerJovenes,
      obtenerAdultos,
      obtenerAdultosMayores,
      respuestas3,
      respuestas4,
      respuestas5,
      respuestas6,
      showBlock,
      personasEnRangoAdolescentes,
      personasEnRangoJovenes,
      personasEnRangoAdultos,
      personasEnRangoAdultosMayores,
      mostrarSiguienteBloque,
      saveRiesgosAdolescentes,
      saveRiesgosAdultosMayores,
      respuestas7,
      respuestas8,
      respuestas9,
      respuestas15,
      respuestas17,
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
      preguntaTexto29,
      preguntaTexto30,
      preguntaTexto31,
      preguntaTexto32,
      preguntaTexto33,
      preguntaTexto34,
      preguntaTexto35,
      preguntaTexto36,
      preguntaTexto37,
      preguntaTexto38,
      preguntaTexto39,
      preguntaTexto40,
      preguntaTexto41,
      preguntaTexto42,
      preguntaTexto43,
      preguntaTexto44,
      preguntaTexto45,
      preguntaTexto46,
      preguntaTexto47,
      preguntaTexto48,
      preguntaTexto49,
      preguntaTexto50,
      preguntaTexto51,
      preguntaTexto52,
      preguntaTexto53,
      preguntaTexto54,
      preguntaTexto55,
      preguntaTexto56,
      preguntaTexto57,
      preguntaTexto58,
      preguntaTexto59,
      preguntaTexto60,
      respuestaPregunta3,
      respuestaPregunta4,
      respuestaPregunta5,
      respuestaPregunta6,
      respuestaPregunta7,
      respuestaPregunta8,
      respuestaPregunta9,
      respuestaPregunta10,
      respuestaPregunta11,
      respuestaPregunta12,
      respuestaPregunta13,
      respuestaPregunta14,
      respuestaPregunta15,
      respuestaPregunta16,
      respuestaPregunta17,
      respuestaPregunta18,
      respuestaPregunta19,
      respuestaPregunta20,
      respuestaPregunta21,
      respuestaPregunta22,
      respuestaPregunta23,
      respuestaPregunta24,
      respuestaPregunta25,
      respuestaPregunta26,
      descripcionCompartidas,
      descripcionQuestion4,
      descripcionQuestion5,
      descripcionQuestion23,
      saveFamilyCaracteristicas,
      preguntaTexto61,
      descripcionpreguntaTexto108,
      descripcionpreguntaTexto85,
      descripcionpreguntaTexto86,
      descripcionpreguntaTexto90,
      descripcionpreguntaTexto91,
      descripcionpreguntaTexto101,
      descripcionpreguntaTexto104,
      descripcionpreguntaTexto105,
      descripcionpreguntaTexto106,
      preguntaTexto62,
      preguntaTexto63,
      preguntaTexto64,
      preguntaTexto65,
      preguntaTexto66,
      preguntaTexto67,
      preguntaTexto68,
      preguntaTexto69,
      preguntaTexto70,
      preguntaTexto71,
      preguntaTexto72,
      preguntaTexto73,
      preguntaTexto74,
      preguntaTexto75,
      preguntaTexto76,
      preguntaTexto77,
      preguntaTexto78,
      preguntaTexto79,
      preguntaTexto80,
      preguntaTexto81,
      preguntaTexto82,
      preguntaTexto83,
      preguntaTexto84,
      preguntaTexto85,
      preguntaTexto86,
      preguntaTexto87,
      preguntaTexto88,
      preguntaTexto89,
      preguntaTexto90,
      preguntaTexto91,
      preguntaTexto92,
      preguntaTexto93,
      preguntaTexto94,
      preguntaTexto95,
      preguntaTexto96,
      preguntaTexto97,
      preguntaTexto98,
      preguntaTexto99,
      preguntaTexto100,
      preguntaTexto101,
      descripcionPregunta41,
      descripcionpreguntaTexto43,
      descripcionpreguntaTexto44,
      descicripcionpreguntaTexto54,
      descicripcionpreguntaTexto55,
      descicripcionpreguntaTexto56,
      descripcionpreguntaTexto60,
      descripcionpreguntaTexto61,
      descripcionpreguntaTexto62,
      descripcionpreguntaTexto64,
      descripcionpreguntaTexto65,
      descripcionpreguntaTexto66,
      descripcionpreguntaTexto68,
      descripcionPreguntaTexto84,
personaSeleccionada,
editarPersona,
      preguntaTexto102,
      preguntaTexto103,
      preguntaTexto104,
      preguntaTexto105,
      preguntaTexto106,
      preguntaTexto107,
      preguntaTexto108,
      preguntaTexto109,
      saveFamilyDimentions,
      saveRiesgosDiscapacidad,
      saveRiesgosGestante,
      saveRiesgosPuerpera,
      saveOtrosRiesgos,
      respuestaSeleccionada,
      capturarRespuesta,
      capturarRespuesta2,
      capturarRespuesta3,
      capturarRespuesta4,
      capturarRespuesta5,
      capturarRespuesta6,
      capturarRespuesta7,
      capturarRespuesta8,
      capturarRespuesta9,
      capturarRespuesta10,
      capturarRespuesta11,
      capturarRespuesta12,
      selectedAdolescente,
      selectedJoven,
      selectedAdulto,
      selectedAdultoMayor,
      selectedPersonaAdolescentes,
      selectedPersonaJovenes,
      selectedPersonaAdultos,
      selectedPersonaAdultosMayores,
      respuestas,
      radioGroupName,
      filteredOccupations,
      filteredPeople,
      filteredFamilies,
      seguroSalud,
      searchDNI,
      valorInput,
      nombreFamilia,
      niños_0_11,
      adolescentes_12_17,
      jovenes_18_29,
      adultos_30_59,
      adultos_mayores_60,
      searchByDNI,
      saveRiesgosFamilia,
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
          <a class="nav-link" data-bs-toggle="tab" data-bs-target="#riesgo" @click="obtenerNinos"
            >Riesgo</a
          >
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
                <div class="col-md-3">

                    <div  class="input-group mb-3">
                  <input
                    v-model="familia"
                    type="text"
                    class="form-control"
                    placeholder="Nueva Familia"
                  />
                  <button type="button" class="btn btn-primary" @click="saveFamily">
                    <i class="fa fa-save"></i> Guardar
                  </button>
                </div>

                </div>
                <div class="col-md-3">
                  
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
 
              </div>
            </div>
          </div>

          <table class="table mt-5">
            <thead>
        <tr>
          <th>ID</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Documento de Identidad</th>
          <th>Estado Civil</th>
          <th>Grado de Instrucción</th>
          <th>Ocupación</th>
          <th>Religión</th>
          <th>Seguro de Salud</th>
          <th>Familia</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="persona in familias" :key="persona.id">
          <td>{{ persona.id }}</td>
          <td>{{ persona.pers_nombres }}</td>
          <td>{{ persona.pers_apellidos }}</td>
          <td>{{ persona.pers_numero_documento_identidad }}</td>
          <td>{{ persona.esci_nombre }}</td>
          <td>{{ persona.grain_nombre }}</td>
          <td>{{ persona.ocup_nombre }}</td>
          <td>{{ persona.reli_nombre }}</td>
          <td>{{ persona.sesa_nombre }}</td>
          <td>{{ persona.fam_nombre_familia }}</td>
          <td>
            <!-- Agregar íconos de editar y eliminar con enlaces o botones -->
            <a @click="editarPersona(persona)"><em class="icon ni ni-edit-alt-fill"></em> </a>
            <a @click="eliminarPersona(persona.id)"><em class="icon ni ni-delete-fill"></em> </a>
          </td>
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
                <div
                  class="form-check form-check-inline"
                  v-for="(respuesta, index) in respuestas"
                  :key="index"
                >
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :id="`checkbox${index}`"
                    :value="respuesta.rc_respuesta_comun"
                    name="preguntaTexto1"
                    @change="capturarRespuesta4(respuesta.rc_respuesta_comun)"
                  />
                  <label class="form-check-label" :for="`checkbox${index}`">{{
                    respuesta.rc_respuesta_comun
                  }}</label>
                </div>
              </div>

              <div class="row mt-4">
                <div class="col-md-4">
                  <label for="exampleFormControlSelect1">{{ preguntaTexto2 }}</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="valorInput"
                    name="preguntaTexto2"
                    placeholder="Número"
                  />
                </div>

                <div class="col-md-6">
                  <label>{{ preguntaTexto3 }}</label>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="form-check">
                      <input type="radio" v-model="respuestaPregunta3" value="Si" /> Si
                    </label>
                    <label class="form-check">
                      <input type="radio" v-model="respuestaPregunta3" value="No" /> No
                    </label>
                  </div>
                </div>
              </div>

              <div class="form-group mt-3">
                <label for="exampleFormControlTextarea1">Describe como son compartidas</label>
                <textarea
                  v-model="descripcionCompartidas"
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>

              <div class="mt-3 col-md-5">
                <label>{{ preguntaTexto4 }}</label>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="form-check">
                    <input type="radio" v-model="respuestaPregunta4" value="Si" /> Si
                  </label>
                  <label class="form-check">
                    <input type="radio" v-model="respuestaPregunta4" value="No" /> No
                  </label>
                </div>
              </div>

              <div class="form-group mt-3">
                <label for="exampleFormControlTextarea1">Detalle</label>
                <textarea
                  v-model="descripcionQuestion4"
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>

              <div class="row mt-4">
                <div class="col-md-4">
                  <label>{{ preguntaTexto5 }}</label>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="form-check">
                      <input type="radio" v-model="respuestaPregunta5" value="Si" /> Si
                    </label>
                    <label class="form-check">
                      <input type="radio" v-model="respuestaPregunta5" value="No" /> No
                    </label>
                  </div>
                </div>

                <div class="form-group mt-3">
                  <label for="exampleFormControlTextarea1">Describa</label>
                  <textarea
                    v-model="descripcionQuestion5"
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
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
                        name="xd"
                        :id="`radioRespuesta${index}`"
                        :value="respuesta.rc_respuesta_comun"
                        @change="capturarRespuesta2(respuesta.rc_respuesta_comun)"
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
                      @change="capturarRespuesta3(respuesta.rc_respuesta_comun)"
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
                    name="preguntaTexto8"
                    @change="capturarRespuesta4(respuesta.rc_respuesta_comun)"
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
                      name="ga"
                      :id="`radioRespuesta${index}`"
                      :value="respuesta.rc_respuesta_comun"
                      @change="capturarRespuesta5(respuesta.rc_respuesta_comun)"
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
                    name="preguntaTexto10"
                    @change="capturarRespuesta6(respuesta.rc_respuesta_comun)"
                  />
                  <label class="form-check-label" :for="`checkbox${index}`">{{
                    respuesta.rc_respuesta_comun
                  }}</label>
                </div>
              </div>

              <div class="mt-3 col-md-10">
                <label>{{ preguntaTexto11 }}</label>
                <div
                  class="form-check form-check-inline"
                  v-for="(respuesta, index) in respuestas7"
                  :key="index"
                >
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :id="`checkbox${index}`"
                    :value="respuesta.rc_respuesta_comun"
                    name="preguntaTexto11"
                    @change="capturarRespuesta6(respuesta.rc_respuesta_comun)"
                  />
                  <label class="form-check-label" :for="`checkbox${index}`">{{
                    respuesta.rc_respuesta_comun
                  }}</label>
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
                      name="preguntaTexto12"
                      @change="capturarRespuesta8(respuesta.rc_respuesta_comun)"
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
                      name="preguntaTexto13"
                      @change="capturarRespuesta9(respuesta.rc_respuesta_comun)"
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
                  <label class="form-check">
                    <input type="radio" v-model="respuestaPregunta14" value="Si" /> Si
                  </label>
                  <label class="form-check">
                    <input type="radio" v-model="respuestaPregunta14" value="No" /> No
                  </label>
                </div>
              </div>

              <div class="mt-3 col-md-9">
                <label>{{ preguntaTexto15 }}</label>
                <div
                  class="form-check form-check-inline"
                  v-for="(respuesta, index) in respuestas15"
                  :key="index"
                >
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :id="`checkbox${index}`"
                    :value="respuesta.rc_respuesta_comun"
                    name="preguntaTexto15"
                    @change="capturarRespuesta10(respuesta.rc_respuesta_comun)"
                  />
                  <label class="form-check-label" :for="`checkbox${index}`">{{
                    respuesta.rc_respuesta_comun
                  }}</label>
                </div>
              </div>

              <div class="row mt-3">
                <div class="mt-3 col-md-4">
                  <label>{{ preguntaTexto16 }}</label>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="form-check">
                      <input type="radio" v-model="respuestaPregunta16" value="Si" /> Si
                    </label>
                    <label class="form-check">
                      <input type="radio" v-model="respuestaPregunta16" value="No" /> No
                    </label>
                  </div>
                </div>

                <div class="mt-3 col-md-4">
                  <label>{{ preguntaTexto17 }}</label>
                  <div
                    class="form-check form-check-inline"
                    v-for="(respuesta, index) in respuestas17"
                    :key="index"
                  >
                    <input
                      type="checkbox"
                      class="form-check-input"
                      :id="`checkbox${index}`"
                      :value="respuesta.rc_respuesta_comun"
                      name="preguntaTexto17"
                      @change="capturarRespuesta11(respuesta.rc_respuesta_comun)"
                    />
                    <label class="form-check-label" :for="`checkbox${index}`">{{
                      respuesta.rc_respuesta_comun
                    }}</label>
                  </div>
                </div>
                <div class="mt-3 col-md-4">
                  <label>{{ preguntaTexto18 }}</label>
                  <p></p>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="form-check">
                      <input type="radio" v-model="respuestaPregunta18" value="Si" /> Si
                    </label>
                    <label class="form-check">
                      <input type="radio" v-model="respuestaPregunta18" value="No" /> No
                    </label>
                  </div>
                </div>
                <div class="mt-3 col-md-4">
                  <label>{{ preguntaTexto19 }}</label>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="form-check">
                      <input type="radio" v-model="respuestaPregunta19" value="Si" /> Si
                    </label>
                    <label class="form-check">
                      <input type="radio" v-model="respuestaPregunta19" value="No" /> No
                    </label>
                    <p></p>
                  </div>
                </div>
              </div>

              <div class="row mt-3">
                <div class="mt-3 col-md-5">
                  <label>{{ preguntaTexto20 }}</label>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="form-check">
                      <input type="radio" v-model="respuestaPregunta20" value="Si" /> Si
                    </label>
                    <label class="form-check">
                      <input type="radio" v-model="respuestaPregunta20" value="No" /> No
                    </label>
                  </div>
                </div>
                <div class="mt-3 col-md-7">
                  <label>{{ preguntaTexto21 }}</label>
                  <p></p>

                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="form-check">
                      <input type="radio" v-model="respuestaPregunta21" value="Si" /> Si
                    </label>
                    <label class="form-check">
                      <input type="radio" v-model="respuestaPregunta21" value="No" /> No
                    </label>
                  </div>
                </div>
              </div>

              <div class="row mt-3">
                <div class="mt-3 col-md-5">
                  <label>{{ preguntaTexto22 }}</label>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="form-check">
                      <input type="radio" v-model="respuestaPregunta22" value="Si" /> Si
                    </label>
                    <label class="form-check">
                      <input type="radio" v-model="respuestaPregunta22" value="No" /> No
                    </label>
                  </div>
                </div>
              </div>

              <div class="mt-3 col-md-5">
                <label>{{ preguntaTexto23 }}</label>
                <div
                  class="form-check form-check-inline"
                  v-for="(respuesta, index) in respuestas23"
                  :key="index"
                >
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :id="`checkbox${index}`"
                    :value="respuesta.rc_respuesta_comun"
                    name="preguntaTexto23"
                    @change="capturarRespuesta11(respuesta.rc_respuesta_comun)"
                  />
                  <label class="form-check-label" :for="`checkbox${index}`">{{
                    respuesta.rc_respuesta_comun
                  }}</label>
                </div>
              </div>

              <div class="form-group mt-">
                <label for="exampleFormControlTextarea1">Describa</label>
                <textarea
                  v-model="descripcionQuestion23"
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>

              <div class="row mt-3">
                <div class="mt-3 col-md-5">
                  <label>{{ preguntaTexto24 }}</label>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="form-check">
                      <input type="radio" v-model="respuestaPregunta24" value="Si" /> Si
                    </label>
                    <label class="form-check">
                      <input type="radio" v-model="respuestaPregunta24" value="No" /> No
                    </label>
                  </div>
                </div>
              </div>

              <div class="mt-3 col-md-5">
                <label>{{ preguntaTexto25 }}</label>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="form-check">
                    <input type="radio" v-model="respuestaPregunta25" value="Si" /> Si
                  </label>
                  <label class="form-check">
                    <input type="radio" v-model="respuestaPregunta25" value="No" /> No
                  </label>
                </div>
              </div>
              <div class="mt-3 col-md-5">
                <label>{{ preguntaTexto26 }}</label>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                  <label class="form-check">
                    <input type="radio" v-model="respuestaPregunta26" value="Si" /> Si
                  </label>
                  <label class="form-check">
                    <input type="radio" v-model="respuestaPregunta26" value="No" /> No
                  </label>
                </div>
              </div>

              <button class="btn btn-success mt-5" @click="saveFamilyCaracteristicas">
                <i class="fa fa-save"></i>
              </button>
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
                    <select
                      id="inputState"
                      class="form-control"
                      v-model="selectedPersona"
                      @change="updateFields"
                    >
                      <option selected>Seleccionar nombre</option>
                      <option v-for="(persona, index) in personasEnRangoNinos" :key="index" :value="persona.id">
                        {{ persona.nombre }}
                      </option>
                    </select>
                  </div>
                  <div class="col-7">
                    <div class="form-group">
                      <input
                        disabled
                        type="text"
                        class="form-control"
                        id="nombreFamilia"
                        placeholder="Nombre y apellidos"
                        v-model="selectedPersonaNinos.nombre"
                      />
                    </div>
                  </div>
                  <div class="col-1">
                    <div class="form-group">
                      <input
                        disabled
                        type="text"
                        class="form-control"
                        id="nombreFamilia"
                        v-model="selectedPersonaNinos.edad"
                      />
                    </div>
                  </div>
                </div>

                <div class="container-fluid">
                  <div class="row mt-3">
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">{{ preguntaTexto27 }}</h5>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="pregunta1"
                              id="pregunta1"
                              value="Si"
                            />
                            <label class="form-check-label" for="inlineRadio1">Si</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="pregunta1"
                              id="pregunta1"
                              value="No"
                            />
                            <label class="form-check-label" for="inlineRadio2">No</label>
                          </div>

                          <h5 class="card-title mt-4">{{ preguntaTexto29 }}</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input
                                type="radio"
                                name="preguntaTexto29"
                                value="Domicilio del Sector"
                              />
                              Domicilio del Sector
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto29" value="Centro de Salud" />
                              Centro de Salud
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto29" value="Hospital" />
                              Hospital
                            </label>
                          </div>

                          <h5 class="card-title mt-4">{{ preguntaTexto32 }}</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto32" value="Si" />
                              Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto32" value="No" /> No
                            </label>
                          </div>

                          <h5 class="card-title mt-4">{{ preguntaTexto34 }}</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto34" value="Si" />
                              Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto34" value="No" /> No
                            </label>
                          </div>

                          <h5 class="card-title mt-4">{{ preguntaTexto35 }}</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto35" value="Si" />
                              Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto35" value="No" /> No
                            </label>
                          </div>

                          <h5 class="card-title mt-3">{{ preguntaTexto38 }}</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto38" value="Si" />
                              Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto38" value="No" /> No
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">{{ preguntaTexto28 }}</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto28" value="Si" />
                              Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto28" value="No" /> No
                            </label>
                          </div>
                          <div>
                            <h5 class="card-title mt-3">
                              {{ preguntaTexto30 }}
                            </h5>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn form-check">
                                <input type="radio" name="preguntaTexto30" value="Si" />
                                Si
                              </label>
                              <label class="btn form-check">
                                <input type="radio" name="preguntaTexto30" value="No" />
                                No
                              </label>
                            </div>
                          </div>

                          <h5 class="card-title mt-2">
                            {{ preguntaTexto31 }}
                          </h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto31" value="Si" />
                              Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto31" value="No" /> No
                            </label>
                          </div>

                          <h5 class="card-title mt-2">
                            {{ preguntaTexto33 }}
                          </h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto33" value="Si" />
                              Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto33" value="No" /> No
                            </label>
                          </div>

                          <h5 class="card-title mt-2">
                            {{ preguntaTexto36 }}
                          </h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto36" value="Si" />
                              Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto36" value="No" /> No
                            </label>
                          </div>

                          <h5 class="card-title mt-2">
                            {{ preguntaTexto37 }}
                          </h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto37" value="Si" />
                              Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto37" value="No" /> No
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a @click="saveRiesgosNiños" class="btn btn-success mt-4">Guardar</a>

                  <a class="btn btn-success mt-4" @click="mostrarSiguienteBloque"
                    >Siguiente Etapa</a
                  >
                </div>
              </div>

              <div v-if="showBlock === 2">
                <p class="card-text">EN LA ETAPA ADOLESCENTE 12-17 AÑOS</p>
                <div class="row">
                  <div class="form-group col-4">
                    <select
                      id="inputState"
                      class="form-control"
                      v-model="selectedAdolescente"
                      @change="updateFields2"
                    >
                      <option selected>Seleccionar nombre</option>
                      <option v-for="(persona, index) in personasEnRangoAdolescentes" :key="index">
                        {{ persona.nombre }}
                      </option>
                    </select>
                  </div>
                  <div class="col-7">
                    <div class="form-group">
                      <input
                        disabled
                        type="text"
                        class="form-control"
                        id="nombreFamilia"
                        placeholder="Nombre y apellidos"
                        v-model="selectedPersonaAdolescentes.nombre"
                      />
                    </div>
                  </div>
                  <div class="col-1">
                    <div class="form-group">
                      <input
                        disabled
                        type="text"
                        class="form-control"
                        id="nombreFamilia"
                        v-model="selectedPersonaAdolescentes.edad"
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
                            {{ preguntaTexto39 }}
                          </h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="checkbox" name="preguntaTexto39" value="COVID" />
                              COVID
                            </label>
                            <label class="btn form-check">
                              <input type="checkbox" name="preguntaTexto39" value="Tetano" />
                              Tetano
                            </label>
                            <label class="btn form-check">
                              <input type="checkbox" name="preguntaTexto39" value="Hepatitis B" />
                              Hepatitis B
                            </label>
                          </div>

                          <h5 class="card-title mt-3">
                            {{ preguntaTexto40 }}
                          </h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto40" value="Siempre" /> Siempre
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto40" value="Aveces" /> Aveces
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto40" value="Nunca" />Nunca
                            </label>
                          </div>
                          <h5 class="card-title mt-3">{{ preguntaTexto41 }}</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto41" value="Si" /> Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto41" value="No" /> No
                            </label>
                          </div>
                          <textarea
                            v-model="descripcionPregunta41"
                            class="form-control"
                            id="comentario"
                            name="comentario"
                            placeholder=" Que es lo que nota"
                          ></textarea>
                          <h5 class="card-title mt-3">
                            {{ preguntaTexto45 }}
                          </h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto45" value="Si" /> Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto45" value="No" /> No
                            </label>
                          </div>
                          <h5 class="card-title mt-2">{{ preguntaTexto46 }}</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto46" value="Si" /> Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto46" value="No" />
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">
                            {{ preguntaTexto43 }}
                          </h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto43" value="Si" />
                              Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto43" value="No" /> No
                            </label>
                          </div>
                          <textarea
                            v-model="descripcionpreguntaTexto43"
                            class="form-control"
                            id="ado1"
                            name="ado1"
                            placeholder="¿Podria describir que es lo que nota? y ¿Que le hicieron?"
                          ></textarea>

                          <div>
                            <h5 class="card-title mt-3">
                              {{ preguntaTexto44 }}
                            </h5>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn form-check">
                                <input type="radio" name="preguntaTexto44" value="Si" /> Si
                              </label>
                              <label class="btn form-check">
                                <input type="radio" name="preguntaTexto44" value="No" /> No
                              </label>
                            </div>
                            <textarea
                              v-model="descripcionpreguntaTexto44"
                              class="form-control"
                              id="ado3"
                              name="ado3"
                              placeholder="Tienen a algun acompañante"
                            ></textarea>

                            <h5 class="card-title mt-3">
                              {{ preguntaTexto42 }}
                            </h5>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn form-check">
                                <input type="radio" name="preguntaTexto42" value="Si" />
                                Si
                              </label>
                              <label class="btn form-check">
                                <input type="radio" name="preguntaTexto42" value="No" />
                                No
                              </label>
                            </div>
                            <h5 class="card-title mt-2">
                              {{ preguntaTexto47 }}
                            </h5>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn form-check">
                                <input type="radio" name="preguntaTexto47" value="Si" />
                                Si
                              </label>
                              <label class="btn form-check">
                                <input type="radio" name="preguntaTexto47" value="No" />
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a class="btn btn-success mt-4" @click="saveRiesgosAdolescentes">Guardar</a>

                  <a class="btn btn-success mt-4" @click="mostrarSiguienteBloque"
                    >Siguiente Etapa</a
                  >
                </div>
              </div>

              <div v-if="showBlock === 3">
                <p class="card-text">EN LA ETAPA JOVEN 18-29 AÑOS</p>
                <div class="row">
                  <div class="form-group col-4">
                    <select
                      id="inputState"
                      class="form-control"
                      v-model="selectedJoven"
                      @change="updateFields3"
                    >
                      <option selected>Seleccionar nombre</option>
                      <option v-for="(persona, index) in personasEnRangoJovenes" :key="index" :value="persona.id">
                        {{ persona.nombre }}
                      </option>
                    </select>
                  </div>
                  <div class="col-7">
                    <div class="form-group">
                      <input
                        disabled
                        type="text"
                        class="form-control"
                        id="nombreFamilia"
                        placeholder="Nombre y apellidos"
                        v-model="selectedPersonaJovenes.nombre"
                      />
                    </div>
                  </div>
                  <div class="col-1">
                    <div class="form-group">
                      <input
                        disabled
                        type="text"
                        class="form-control"
                        id="nombreFamilia"
                        v-model="selectedPersonaJovenes.edad"
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
                            {{ preguntaTexto48 }}
                          </h5>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="preguntaTexto48"
                              id="inlineRadio1"
                              value="Si"
                            />
                            <label class="form-check-label" for="inlineRadio1">Si</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="preguntaTexto48"
                              id="inlineRadio2"
                              value="No"
                            />
                            <label class="form-check-label" for="inlineRadio2">No</label>
                          </div>

                          <h5 class="card-title mt-3">{{ preguntaTexto49 }}</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto49" value="Si" />
                              Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto49" value="No" /> No
                            </label>
                          </div>
                          <div>
                            <h5 class="card-title mt-3">
                              {{ preguntaTexto52 }}
                            </h5>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn form-check">
                                <input type="radio" name="preguntaTexto52" value="Si" />
                                Si
                              </label>
                              <label class="btn form-check">
                                <input type="radio" name="preguntaTexto52" value="No" />
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">
                            {{ preguntaTexto51 }}
                          </h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto51" value="Si" />
                              Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto51" value="No" /> No
                            </label>
                          </div>
                          <div>
                            <h5 class="card-title mt-3">
                              {{ preguntaTexto50 }}
                            </h5>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn form-check">
                                <input type="radio" name="preguntaTexto50" value="Si" />
                                Si
                              </label>
                              <label class="btn form-check">
                                <input type="radio" name="preguntaTexto50" value="No" />
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a class="btn btn-success mt-4" @click="saveRiesgosJovenes">Guardar</a>

                  <a class="btn btn-success mt-4" @click="mostrarSiguienteBloque"
                    >Siguiente Etapa</a
                  >

                  <a href="#" class="btn btn-success mt-4">Limpiar</a>
                </div>
              </div>

              <div v-if="showBlock === 4">
                <p class="card-text">EN LA ETAPA ADULTO 30-59 AÑOS</p>
                <div class="row">
                  <div class="form-group col-4">
                    <select
                      id="inputState"
                      class="form-control"
                      v-model="selectedAdulto"
                      @change="updateFields4"
                    >
                      <option selected>Seleccionar nombre</option>
                      <option v-for="(persona, index) in personasEnRangoAdultos" :key="index">
                        {{ persona.nombre }}
                      </option>
                    </select>
                  </div>
                  <div class="col-7">
                    <div class="form-group">
                      <input
                        disabled
                        type="text"
                        class="form-control"
                        id="nombreFamilia"
                        placeholder="Nombre y apellidos"
                        v-model="selectedPersonaAdultos.nombre"
                      />
                    </div>
                  </div>
                  <div class="col-1">
                    <div class="form-group">
                      <input
                        disabled
                        type="text"
                        class="form-control"
                        id="nombreFamilia"
                        v-model="selectedPersonaAdultos.edad"
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
                            {{ preguntaTexto53 }}
                          </h5>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="preguntaTexto53"
                              id="adulto"
                              value="Si"
                            />
                            <label class="form-check-label" for="inlineRadio1">Si</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="preguntaTexto53"
                              id="adulto2"
                              value="No"
                            />
                            <label class="form-check-label" for="inlineRadio2">No</label>
                          </div>

                          <h5 class="card-title mt-3">{{ preguntaTexto54 }}</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto54" value="Si" /> Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto54" value="No" /> No
                            </label>
                          </div>
                          <textarea
                            v-model="descicripcionpreguntaTexto54"
                            class="form-control"
                            id="comentario"
                            name="comentario"
                            placeholder="Describe"
                          ></textarea>

                          <h5 class="card-title mt-3">{{ preguntaTexto55 }}</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto55" value="Si" /> Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto55" value="No" /> No
                            </label>
                          </div>
                          <textarea
                            v-model="descicripcionpreguntaTexto55"
                            class="form-control"
                            id="describe"
                            name="describe"
                            placeholder="Describe nombres"
                          ></textarea>

                          <h5 class="card-title mt-3">{{ preguntaTexto56 }}</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto56" value="Si" /> Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto56" value="No" /> No
                            </label>
                          </div>
                          <textarea
                            v-model="descicripcionpreguntaTexto56"
                            class="form-control"
                            id="diga"
                            name="diga"
                            placeholder="Diga su nombre"
                          ></textarea>

                          <h5 class="card-title mt-2">{{ preguntaTexto57 }}</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto57" value="Si" /> Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto57" value="No" /> No
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">{{ preguntaTexto58 }}</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto58" value="Si" /> Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto58" value="No" /> No
                            </label>
                          </div>

                          <div>
                            <h5 class="card-title mt-3">
                              {{ preguntaTexto59 }}
                            </h5>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn form-check">
                                <input type="checkbox" name="preguntaTexto59" value="Colesterol" />
                                Colesterol
                              </label>
                              <label class="btn form-check">
                                <input
                                  type="checkbox"
                                  name="preguntaTexto59"
                                  value="Trigleceridos"
                                />
                                Trigleceridos
                              </label>
                              <label class="btn form-check">
                                <input type="checkbox" name="preguntaTexto59" value="Diarreas" />
                                Diarreas
                              </label>
                              <label class="btn form-check">
                                <input type="checkbox" name="preguntaTexto59" value="Fiebres" />
                                Fiebres
                              </label>
                            </div>

                            <h5 class="card-title mt-3">
                              {{ preguntaTexto60 }}
                            </h5>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn form-check">
                                <input type="radio" name="preguntaTexto60" value="Si" />
                                Si
                              </label>
                              <label class="btn form-check">
                                <input type="radio" name="preguntaTexto60" value="No" />
                                No
                              </label>
                            </div>
                            <textarea
                              v-model="descripcionpreguntaTexto60"
                              class="form-control"
                              id="diga"
                              name="diga"
                              placeholder="Escriba el nombre de la persona"
                            ></textarea>

                            <h5 class="card-title mt-3">
                              {{ preguntaTexto61 }}
                            </h5>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn form-check">
                                <input type="radio" name="preguntaTexto61" value="Si" /> Si
                              </label>
                              <label class="btn form-check">
                                <input type="radio" name="preguntaTexto61" value="No" />
                                No
                              </label>
                            </div>
                            <textarea
                              v-model="descripcionpreguntaTexto61"
                              class="form-control"
                              id="diga"
                              name="diga"
                              placeholder="Escriba el nombre de la persona"
                            ></textarea>

                            <h5 class="card-title mt-3">
                              {{ preguntaTexto62 }}
                            </h5>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn form-check">
                                <input type="radio" name="preguntaTexto62" value="Si" /> Si
                              </label>
                              <label class="btn form-check">
                                <input type="radio" name="preguntaTexto62" value="No" /> No
                              </label>
                            </div>
                            <textarea
                              v-model="descripcionpreguntaTexto62"
                              class="form-control"
                              id="diga"
                              name="diga"
                              placeholder="Nombre Completo de la persona"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a class="btn btn-success mt-4" @click="saveRiesgosAdultos">Guardar</a>

                  <a class="btn btn-success mt-4" @click="mostrarSiguienteBloque"
                    >Siguiente Etapa</a
                  >
                </div>
              </div>

              <div v-if="showBlock === 5">
                <p class="card-text">EN LA ETAPA ADULTO MAYOR 60-110 AÑOS</p>
                <div class="row">
                  <div class="form-group col-4">
                    <select
                      id="inputState"
                      class="form-control"
                      v-model="selectedAdultoMayor"
                      @change="updateFields5"
                    >
                      <option selected>Seleccionar nombre</option>
                      <option
                        v-for="(persona, index) in personasEnRangoAdultosMayores"
                        :key="index"
                      >
                        {{ persona.nombre }}
                      </option>
                    </select>
                  </div>
                  <div class="col-7">
                    <div class="form-group">
                      <input
                        disabled
                        type="text"
                        class="form-control"
                        id="nombreFamilia"
                        placeholder="Nombre y apellidos"
                        v-model="selectedPersonaAdultosMayores.nombre"
                      />
                    </div>
                  </div>
                  <div class="col-1">
                    <div class="form-group">
                      <input
                        disabled
                        type="text"
                        class="form-control"
                        id="nombreFamilia"
                        v-model="selectedPersonaAdultosMayores.edad"
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
                            {{ preguntaTexto63 }}
                          </h5>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="preguntaTexto63"
                              id="preguntaTexto63"
                              value="Pollo"
                            />
                            <label class="form-check-label" for="inlineRadio1">Pollo</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="preguntaTexto63"
                              id="preguntaTexto63"
                              value="Cerdo"
                            />
                            <label class="form-check-label" for="inlineRadio2">Cerdo</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="preguntaTexto63"
                              id="preguntaTexto63"
                              value="Otros"
                            />
                            <label class="form-check-label" for="inlineRadio2">Otros</label>
                          </div>

                          <h5 class="card-title mt-3">{{ preguntaTexto64 }}</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto64" value="Si" />
                              Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto64" value="No" />
                              No
                            </label>
                          </div>
                          <textarea
                            v-model="descripcionpreguntaTexto64"
                            class="form-control"
                            id="comentario"
                            name="Describa"
                            placeholder="Describe"
                          ></textarea>

                          <h5 class="card-title mt-3">{{ preguntaTexto65 }}</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto65" value="Si" />
                              Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto65" value="No" />
                              No
                            </label>
                          </div>
                          <textarea
                            v-model="descripcionpreguntaTexto65"
                            class="form-control"
                            id="comentario"
                            name="Describa"
                            placeholder="Describe"
                          ></textarea>

                          <h5 class="card-title mt-3">{{ preguntaTexto66 }}</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto66" value="Si" />
                              Si
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto66" value="No" />
                              No
                            </label>
                          </div>
                          <textarea
                            v-model="descripcionpreguntaTexto66"
                            class="form-control"
                            id="comentario"
                            name="Describa"
                            placeholder="Describe"
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-6">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title mt-3">{{ preguntaTexto67 }}</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="checkbox" name="preguntaTexto67" value="Colesterol" />
                              Colesterol
                            </label>
                            <label class="btn form-check">
                              <input type="checkbox" name="preguntaTexto67" value="Trigleceridos" />
                              Trigleceridos
                            </label>
                            <label class="btn form-check">
                              <input type="checkbox" name="preguntaTexto67" value="Diarreas" />
                              Diarreas
                            </label>
                            <label class="btn form-check">
                              <input type="checkbox" name="preguntaTexto67" value="Fiebres" />
                              Fiebres
                            </label>
                          </div>
                          <div>
                            <h5 class="card-title mt-3">
                              {{ preguntaTexto68 }}
                            </h5>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn form-check">
                                <input type="checkbox" name="preguntaTexto68" value="COVID" />
                                COVID
                              </label>
                              <label class="btn form-check">
                                <input type="checkbox" name="preguntaTexto68" value="Influenza" />
                                Influenza
                              </label>
                              <label class="btn form-check">
                                <input type="checkbox" name="preguntaTexto68" value="Hepatitis B" />
                                Hepatitis B
                              </label>
                              <label class="btn form-check">
                                <input type="checkbox" name="preguntaTexto68" value="Tetano" />
                                Tetano
                              </label>
                            </div>
                            <textarea
                              v-model="descripcionpreguntaTexto68"
                              class="form-control"
                              id="otros"
                              name="Otros"
                              placeholder="Otros"
                            ></textarea>
                          </div>
                          <h5 class="card-title mt-3">{{ preguntaTexto69 }}</h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="checkbox" name="preguntaTexto69" value="Próstata" />
                              Próstata
                            </label>
                            <label class="btn form-check">
                              <input type="checkbox" name="preguntaTexto69" value="Cáncer mama" />
                              Cáncer mama
                            </label>
                            <label class="btn form-check">
                              <input type="checkbox" name="preguntaTexto69" value="Otro" />
                              Otro
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a class="btn btn-success mt-4" @click="mostrarSiguienteBloque">Otros Riesgos</a>

                  <a class="btn btn-success mt-4" @click="saveRiesgosAdultosMayores">Guardar</a>
                </div>
              </div>
              <div v-if="showBlock === 6">

<p class="card-text">Otros Riesgos</p>



<div class="container-fluid">

<!-- Preguntas específicas de esta etapa -->
<div style="text-align: center;">
     <div class="alert alert-success" role="alert"> 
      <h5 class="alert-heading">DISCAPACIDAD</h5> 
    </div> </div>

<div class="row mt-3">

<div class="col-sm-14">
<div class="container-fluid">
      <div class="row mt-3">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title ">{{ preguntaTexto70 }} </h5>
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto70" value="Para caminar" /> Para caminar
                </label>
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto70" value="Problemas de entendimiento" /> Problemas de entendimiento
                </label>
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto70" value="Lenguaje" /> Lenguaje
                </label>
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto70" value="Acidente" /> Acidente
                </label>
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto70" value="Otro" /> Otro
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ preguntaTexto71 }}</h5>
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto71" value="Enfermedad Laboral" /> Enfermedad Laboral
                </label>
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto71" value="Genetico/congenito/nacimienoto" /> Genetico/congenito/nacimienoto
                </label>
              </div>

            </div>

            
          </div>
          
        </div>
        
      </div>

    </div>
<!-- Preguntas de esta columna -->
  <div class="row justify-content-end mt-3">
    <div class="col-1">
      <button type="button" @click="saveRiesgosDiscapacidad" class="btn btn-success">Guardar</button>
    </div>
  </div>


</div>

<p></p>

<div style="text-align: center;">
     <div class="alert alert-success" role="alert"> 
      <h5 class="alert-heading">GESTANTE</h5> 
    </div> </div>

    <div class="col-sm-14">
<div class="container-fluid">
      <div class="row mt-3">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title ">{{ preguntaTexto72 }}</h5>
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto72" value="Si" /> Si
                </label>
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto72" value="No" /> No
                </label>
              </div>
            </div>
          </div>
        </div>


        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title ">{{ preguntaTexto73 }}</h5>
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn form-check">
                  <input type="checkbox" name="preguntaTexto73" value="Vacunas" /> Vacunas
                </label>
                <label class="btn form-check">
                  <input type="checkbox" name="preguntaTexto73" value="Psicoprofilaxis" /> Psicoprofilaxis
                </label>
                <label class="btn form-check">
                  <input type="checkbox" name="preguntaTexto73" value="Vigilancia nutricional" /> Vigilancia nutricional
                </label>
                <label class="btn form-check">
                  <input type="checkbox" name="preguntaTexto73" value="Con la evaluación bucal" /> Con la evaluación bucal
                </label>
              </div>
            </div>
          </div>
        </div>
        


      </div>
      </div>

      <div class="row justify-content-end mt-3">
    <div class="col-1">
      <button type="button"  @click="saveRiesgosGestante" class="btn btn-success">Guardar</button>
    </div>
  </div>

    </div>

<p></p>

              <div style="text-align: center;">
     <div class="alert alert-success" role="alert"> 
      <h5 class="alert-heading">PUERPERA</h5> 
    </div> 
  </div>
    <div class="container-fluid">
      <div class="container-fluid">

<div class="row mt-3 d-flex justify-content-center align-items-center">
<div class="col-sm-14">
<div class="card text-center">
<div class="card-body">
<h5 class="card-title">{{ preguntaTexto74 }}</h5>
<div class="btn-group btn-group-toggle" data-toggle="buttons">
<label class="btn form-check">
  <input type="radio" name="preguntaTexto74" value="Si" /> Si
</label>
<label class="btn form-check">
  <input type= "radio" name="preguntaTexto74" value="No" /> No
</label>

</div>

<h5 class="card-title">{{ preguntaTexto75 }}</h5>
<div class="btn-group btn-group-toggle" data-toggle="buttons">
<label class="btn form-check">
  <input type="checkbox" name="preguntaTexto75" value="Sangrado vaginal" /> Sangrado vaginal
</label>
<label class="btn form-check">
  <input type= "checkbox" name="preguntaTexto75" value="Sangrado vaginal con Olor" /> Sangrado vaginal con Olor
</label>
<label class="btn form-check">
  <input type="checkbox" name="preguntaTexto75" value="Fiebres / escalofríos" /> Fiebres / escalofríos
</label>
<label class="btn form-check">
  <input type= "checkbox" name="preguntaTexto75" value="Tos y Flema más de 14 días" /> Tos y Flema más de 14 días
</label>

<label class="btn form-check">
  <input type="checkbox" name="preguntaTexto75" value="Riesgo Sedentarismo" /> Riesgo Sedentarismo
</label>
<label class="btn form-check">
  <input type= "checkbox" name="preguntaTexto75" value="Alergia a medicamentos" /> Alergia a medicamentos
</label>

</div>
<div>

<p></p>
</div>

</div>
</div>
</div>
</div>
</div>
<div class="row justify-content-end mt-3">
    <div class="col-1">
      <button type="button" @click="saveRiesgosPuerpera" class="btn btn-success">Guardar</button>
    </div>
  </div>
</div>
<p></p>
<div style="text-align: center;">
     <div class="alert alert-success" role="alert"> 
      <h5 class="alert-heading">OTROS RIESGOS</h5> 
    </div> 
  </div>
    <div class="container-fluid">
      <div class="container-fluid">

<div class="row mt-3 d-flex justify-content-center align-items-center">
<div class="col-sm-14">
<div class="card text-center">
<div class="card-body">
<div>

  <h5 class="card-title">{{ preguntaTexto76 }}</h5>
<div class="btn-group btn-group-toggle" data-toggle="buttons">
<label class="btn form-check">
  <input type="checkbox" name="preguntaTexto76" value="Riesgo de exposicion" /> Riesgo de exposicion
</label>
<label class="btn form-check">
  <input type= "checkbox" name="preguntaTexto76" value=" Riesgo en el Trabajo" /> Riesgo en el Trabajo
</label>
<label class="btn form-check">
  <input type="checkbox" name="preguntaTexto76" value="Riesgo del consumo tabaco" /> Riesgo del consumo tabaco
</label>
<label class="btn form-check">
  <input type= "checkbox" name="preguntaTexto76" value="Otro" /> Otro
</label>

<label class="btn form-check">
  <input type="checkbox" name="preguntaTexto76" value="Riesgo Sedentarismo" /> Riesgo Sedentarismo
</label>
<label class="btn form-check">
  <input type= "checkbox" name="preguntaTexto76" value="Alergia a medicamentos" /> Alergia a medicamentos
</label>




</div>
<div class="row justify-content-end mt-3">
    <div class="col-1">
      <button type="button" @click="saveOtrosRiesgos" class="btn btn-success">Guardar</button>
    </div>
  </div>
<p></p>

<div style="text-align: center;">
     <div class="alert alert-success" role="alert"> 
      <h5 class="alert-heading">FAMILIA</h5> 
    </div> </div>

    <div class="col-sm-14">
<div class="container-fluid">
      <div class="row mt-3">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title ">{{ preguntaTexto77 }}</h6>
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto77" value="Si" /> Si
                </label>
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto77" value="No" /> No
                </label>
              </div>
              <h6 class="card-title ">{{ preguntaTexto79 }}</h6>
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto79" value="Si" /> Si
                </label>
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto79" value="No" /> No
                </label>
              </div>

              <h6 class="card-title ">{{ preguntaTexto80 }}</h6>
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto80" value="Si" /> Si
                </label>
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto80" value="No" /> No
                </label>
              </div>

              <h6 class="card-title ">{{ preguntaTexto82 }}</h6>
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto82" value="Si" /> Si
                </label>
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto82" value="No" /> No
                </label>
              </div>

            </div>
          </div>
        </div>
        <div class="col-sm-6">
<div class="card">
<div class="card-body">
<h6 class="card-title ">{{ preguntaTexto78 }}</h6>
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto78" value="Si" /> Si
                </label>
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto78" value="No" /> No
                </label>
                </div>
                <h6 class="card-title ">{{ preguntaTexto81 }}</h6>
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto81" value="Si" /> Si
                </label>
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto81" value="No" /> No
                </label>
                </div>
                <h6 class="card-title ">{{ preguntaTexto83 }}</h6>
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto83" value="Si" /> Si
                </label>
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto83" value="No" /> No
                </label>
                </div>
                <h6 class="card-title ">{{ preguntaTexto84 }}</h6>
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto84" value="Lurawi peru" /> Lurawi peru
                </label>
                <label class="btn form-check">
                  <input type="radio" name="preguntaTexto84" value="Trabaja peru" /> Trabaja peru
                </label>
                </div>
                <textarea class="form-control" v-model="descripcionPreguntaTexto84" id="diga" name="diga" placeholder="describa la persona o la institucion"></textarea>

</div>          

</div>
</div>

      </div>
      </div>
    </div>

<p></p>
<div class="row justify-content-end mt-3">
    <div class="col-1">
      <button type="button" @click="saveRiesgosFamilia" class="btn btn-success">Guardar</button>
    </div>
  </div>
</div>

</div>
</div>
</div>
</div>
</div>
</div>

<p></p>

</div>


</div>



</div>
</div>


</div>
</div>
              
            
        

        <div class="tab-pane" id="dimension">
          <!-- Contenido de la pestaña Dimensión -->

          <div class="alert alert-success" role="alert">
            <h4 class="alert-heading text-center">
              SISTEMAS DE PROTECCION SOCIAL - DIMENSION FIN DE LA POBREZA
            </h4>
            <hr />
          </div>

          <div class="row">
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">
                    {{ preguntaTexto85 }}
                  </h5>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      name="preguntaTexto85"
                      value="Vaso de Leche"
                    />
                    <label class="form-check-label" for="inlineCheckbox1">Vaso de Leche</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      name="preguntaTexto85"
                      value="Pension 65"
                    />
                    <label class="form-check-label" for="inlineCheckbox2">Pension 65</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      name="preguntaTexto85"
                      value="Beca 18"
                    />
                    <label class="form-check-label" for="inlineCheckbox2">Beca 18</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      name="preguntaTexto85"
                      value="Juntos"
                    />
                    <label class="form-check-label" for="inlineCheckbox2">Juntos</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      name="preguntaTexto85"
                      value="Todos"
                    />
                    <label
                      class="form-check-label"
                      value="Todos"
                      name="preguntaTexto85"
                      for="inlineCheckbox2"
                      >Todos</label
                    >
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlTextarea1">Describa</label>
                    <textarea
                      v-model="descripcionpreguntaTexto85"
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                  <div>
                    <h5 class="card-title mt-3">
                      {{ preguntaTexto87 }}
                    </h5>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto87" value="Si" /> Si
                      </label>
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto87" value="No" /> No
                      </label>
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto87" value="Solo un miembro" /> Solo
                        un miembro
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">
                    {{ preguntaTexto86 }}
                  </h5>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn form-check">
                      <input type="radio" name="preguntaTexto86" value="Si" /> Si
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="preguntaTexto86" value="No" /> No
                    </label>
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlTextarea1">Describa</label>
                    <textarea
                      v-model="descripcionpreguntaTexto86"
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="alert alert-success mt-3" role="alert">
            <h4 class="alert-heading text-center">
              RESILIENCIA A DESASTRES AMBIENTALES, ECONÓMICOS Y SOCIALES - DIMENSION FIN DE LA
              POBREZA
            </h4>
            <hr />
          </div>

          <div class="row">
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <div>
                    <h5 class="card-title mt-3">
                      {{ preguntaTexto88 }}
                    </h5>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto88" value="Si" /> Si
                      </label>
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto88" value="No" /> No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title mt-3">
                    {{ preguntaTexto89 }}
                  </h5>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn form-check">
                      <input type="radio" name="preguntaTexto89" value="Si" /> Si
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="preguntaTexto89" value="No" /> No
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="alert alert-success mt-3" role="alert">
            <h4 class="alert-heading text-center">MALNUTRICION - HAMBRE CERO</h4>
            <hr />
          </div>

          <div class="row">
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <div>
                    <h5 class="card-title mt-3">{{ preguntaTexto90 }}</h5>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto90" value="Si" /> Si
                      </label>
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto90" value="No" /> No
                      </label>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlTextarea1">Describa</label>
                    <textarea
                      v-model="descripcionpreguntaTexto90"
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title mt-3">
                    {{ preguntaTexto91 }}
                  </h5>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn form-check">
                      <input type="radio" name="preguntaTexto91" value="Si" /> Si
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="preguntaTexto91" value="No" /> No
                    </label>
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlTextarea1">Describa</label>
                    <textarea
                      v-model="descripcionpreguntaTexto91"
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="alert alert-success mt-3" role="alert">
            <h4 class="alert-heading text-center">
              PRODUCTIVIDAD E INGRESOS AGRÍCOLAS A PEOUEÑA ESCALA - DIMENSION HAMBRE CERO
            </h4>
            <hr />
          </div>

          <div class="row">
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">
                    {{ preguntaTexto92 }}
                  </h5>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      name="preguntaTexto92"
                      value="Mototaxi"
                    />
                    <label class="form-check-label" for="inlineCheckbox1">Mototaxi</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      name="preguntaTexto92"
                      value="Agro"
                    />
                    <label class="form-check-label" for="inlineCheckbox2">Agro</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      name="preguntaTexto92"
                      value="Obrero"
                    />
                    <label class="form-check-label" for="inlineCheckbox2">Obrero</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      name="preguntaTexto92"
                      value="Vendedor ambulante"
                    />
                    <label class="form-check-label" for="inlineCheckbox2">Vendedor ambulante</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      name="preguntaTexto92"
                      value="Mas de 2100"
                    />
                    <label class="form-check-label" for="inlineCheckbox2">Mas de 2100</label>
                  </div>
                  <div>
                    <h5 class="card-title mt-3">{{ preguntaTexto93 }}</h5>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox1"
                        name="preguntaTexto93"
                        value="Diario"
                      />
                      <label class="form-check-label" for="inlineCheckbox1">Diario</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox2"
                        name="preguntaTexto93"
                        value="Agro"
                      />
                      <label class="form-check-label" for="inlineCheckbox2">Agro</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox2"
                        name="preguntaTexto93"
                        value="Obrero"
                      />
                      <label class="form-check-label" for="inlineCheckbox2">Obrero</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox2"
                        name="preguntaTexto93"
                        value="Otro"
                      />
                      <label class="form-check-label" for="inlineCheckbox2">Otro</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{{ preguntaTexto94 }}</h5>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn form-check">
                      <input type="radio" name="preguntaTexto94" value="de 10-300" /> de 10-300
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="preguntaTexto94" value="400-800" /> 400-800
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="preguntaTexto94" value="801-1200" /> 801-1200
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="preguntaTexto94" value="1201-1600" /> 1201-1600
                    </label>
                    <label class="btn form-check">
                      <input type="radio" name="preguntaTexto94" value="1201-1600" /> 1601-2010
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contenido de la pestaña Dimensión -->
          <div style="text-align: center">
            <!-- GUALDAD DE GENERO - ELIMINAR FORMAS DE VIOLENCIA DE GENRO -->
            <div class="alert alert-success" role="alert">
              <h5 class="alert-heading">
                IGUALDAD DE GENERO - ELIMINAR FORMAS DE VIOLENCIA DE GENRO
              </h5>
            </div>
          </div>
          <div class="container-fluid">
            <div class="row mt-3">
              <div class="col-sm-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">
                      {{ preguntaTexto95 }}
                    </h5>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto95" value="Si" /> Si
                      </label>
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto95" value="No" /> No
                      </label>
                    </div>

                    <h5 class="card-title mt-3">
                      {{ preguntaTexto96 }}
                    </h5>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto96" value="Si" /> Si
                      </label>
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto96" value="No" /> No
                      </label>
                    </div>
                    <h5 class="card-title mt-3">{{ preguntaTexto97 }}</h5>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto97" value="Si" /> Si
                      </label>
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto97" value="No" /> No
                      </label>
                    </div>

                    <h5 class="card-title mt-3">{{ preguntaTexto98 }}</h5>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto98" value="Si" /> Si
                      </label>
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto98" value="No" /> No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title mt-3">
                      {{ preguntaTexto99 }}
                    </h5>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto99" value="Si" /> Si
                      </label>
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto99" value="No" /> No
                      </label>
                    </div>

                    <h5 class="card-title mt-3">
                      {{ preguntaTexto100 }}
                    </h5>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto100" value="Si" /> Si
                      </label>
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto100" value="No" /> No
                      </label>
                    </div>
                    <h5 class="card-title mt-3">
                      {{ preguntaTexto101 }}
                    </h5>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto101" value="Personal" /> Personal
                      </label>
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto101" value="Delincuencial" />
                        Delincuencial
                      </label>
                      <label class="btn form-check">
                        <input type="radio" name="preguntaTexto101" value="Psicologica" />
                        Psicologica
                      </label>
                    </div>
                    <textarea
                      v-model="descripcionpreguntaTexto101"
                      class="form-control"
                      id="diga"
                      name="diga"
                      placeholder="Otro"
                    ></textarea>
                    <p></p>
                  </div>
                </div>
              </div>
              <p></p>

              <!-- PRODUCTIVIDAD E INGRESOS AGRÍCOLAS A PEQUEÑA ESCALA - DIMENSION HAMBRE CERO-->
              <div style="text-align: center">
                <div class="alert alert-success" role="alert">
                  <h5 class="alert-heading">
                    PRODUCTIVIDAD E INGRESOS AGRÍCOLAS A PEQUEÑA ESCALA - DIMENSION HAMBRE CERO
                  </h5>
                </div>
              </div>
              <div class="container-fluid">
                <div class="container-fluid">
                  <div class="row mt-3 d-flex justify-content-center align-items-center">
                    <div class="col-sm-8">
                      <div class="card text-center">
                        <div class="card-body">
                          <h5 class="card-title">
                            {{ preguntaTexto102 }}
                          </h5>
                          <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn form-check">
                              <input type="radio" name="#preguntaTexto102" value="Denuncié al TG" />
                              Denuncié al TG
                            </label>
                            <label class="btn form-check">
                              <input
                                type="radio"
                                name="preguntaTexto102"
                                value=" Denuncié en la Policía"
                              />
                              Denuncié en la Policía
                            </label>
                            <label class="btn form-check">
                              <input
                                type="radio"
                                name="preguntaTexto102"
                                value="Hice justicia solo"
                              />
                              Hice justicia solo
                            </label>
                            <label class="btn form-check">
                              <input type="radio" name="preguntaTexto102" value="No hice nada" /> No
                              hice nada
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p></p>

                  <!-- TRABAJO DECENTE Y CRECIMIENTO ECONOMICO -->

                  <div style="text-align: center">
                    <div class="alert alert-success" role="alert">
                      <h5 class="alert-heading">TRABAJO DECENTE Y CRECIMIENTO ECONOMICO</h5>
                    </div>
                  </div>
                  <div class="container-fluid">
                    <div class="container-fluid">
                      <div class="row mt-3 d-flex justify-content-center align-items-center">
                        <div class="col-sm-8">
                          <div class="card text-center">
                            <div class="card-body">
                              <h5 class="card-title">{{ preguntaTexto103 }}</h5>
                              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                <label class="btn form-check">
                                  <input type="radio" name="preguntaTexto103" value="Si" /> Si
                                </label>
                                <label class="btn form-check">
                                  <input type="radio" name="preguntaTexto103" value="No" /> No
                                </label>
                              </div>
                              <div>
                                <h5 class="card-title mt-3">
                                  {{ preguntaTexto104 }}
                                </h5>
                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                  <label class="btn form-check">
                                    <input type="radio" name="preguntaTexto104" value="Si" /> Si
                                  </label>
                                  <label class="btn form-check">
                                    <input type="radio" name="preguntaTexto104" value="No" /> No
                                  </label>
                                </div>
                                <textarea
                                  class="form-control"
                                  id="diga"
                                  v-model="descripcionpreguntaTexto104"
                                  name="diga"
                                  placeholder="NRO RUC"
                                ></textarea>
                                <p></p>
                              </div>

                              <div>
                                <h5 class="card-title mt-3">
                                  {{ preguntaTexto105 }}
                                </h5>
                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                  <label class="btn form-check">
                                    <input type="radio" name="preguntaTexto105" value="Si" /> Si
                                  </label>
                                  <label class="btn form-check">
                                    <input type="radio" name="preguntaTexto105" value="No" /> No
                                  </label>
                                </div>
                                <textarea
                                  v-model="descripcionpreguntaTexto105"
                                  class="form-control"
                                  id="diga"
                                  name="diga"
                                  placeholder="A cuantos"
                                ></textarea>
                                <p></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p></p>

                  <!-- PAZ, JUSTICIA E INSTITUCIONES SOLIDAS -->
                  <div style="text-align: center">
                    <div class="alert alert-success" role="alert">
                      <h5 class="alert-heading">PAZ, JUSTICIA E INSTITUCIONES SOLIDAS</h5>
                    </div>
                  </div>
                  <div class="container-fluid">
                    <div class="row mt-3">
                      <div class="col-sm-6">
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title mt-3">{{ preguntaTexto106 }}</h5>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn form-check">
                                <input
                                  type="radio"
                                  name="preguntaTexto106"
                                  value="Asociacion Vecinal"
                                />
                                Asociacion Vecinal
                              </label>
                              <label class="btn form-check">
                                <input
                                  type="radio"
                                  name="preguntaTexto106"
                                  value="Grupo de rondas"
                                />
                                Grupo de rondas
                              </label>
                            </div>
                            <textarea
                              v-model="descripcionpreguntaTexto106"
                              class="form-control"
                              id="diga"
                              name="aso2"
                              placeholder="Otro"
                            ></textarea>
                            <p></p>

                            <h5 class="card-title">
                              {{ preguntaTexto107 }}
                            </h5>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn form-check">
                                <input type="radio" name="preguntaTexto107" value="Si" /> Si
                              </label>
                              <label class="btn form-check">
                                <input type="radio" name="preguntaTexto107" value="No" /> No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title mt-3">
                              {{ preguntaTexto108 }}
                            </h5>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn form-check">
                                <input
                                  type="radio"
                                  name="preguntaTexto108"
                                  value="Gestion Financiera"
                                />
                                Gestion Financiera
                              </label>
                              <label class="btn form-check">
                                <input
                                  type="radio"
                                  name="preguntaTexto108"
                                  value="Planes de Trabajo"
                                />
                                Planes de Trabajo
                              </label>
                              <label class="btn form-check">
                                <input type="radio" name="preguntaTexto108" value="Acuerdos" />
                                Acuerdos
                              </label>
                            </div>
                            <textarea
                              v-model="descripcionpreguntaTexto108"
                              class="form-control"
                              id="diga"
                              name="gt2"
                              placeholder="Otro"
                            ></textarea>
                            <p></p>
                          </div>
                        </div>
                        <br />
                        <button class="btn btn-primary" @click="saveFamilyDimentions">
                          Guardar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
