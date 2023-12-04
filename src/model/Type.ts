export interface EstadoCivil {
  id: number
  esci_nombre: string
  esci_descripcion: string
}

export interface GradoInstruccion {
  id: number
  grain_nombre: string
  grain_descripcion: string
}

export interface Religion {
  id: number
  reli_nombre: string
  reli_descripcion: string
}

export interface SeguroSalud {
  id: number
  sesa_nombre: string
  sesa_descripcion: string
}

export interface Ocupacion {
  id: number
  ocup_nombre: string
  ocup_descripcion: string
}

export interface CensoDetails {
  id: number
  micro_red: MicroRed
}

interface MicroRed {
  id: number
  mred_micro_red: string
  rsa_red_salud: string
  ue_unidad_ejecutora: string
}
export interface Persona {
  id: number
  pers_nombres: string
  pers_apellidos: string
  pers_fecha_nacimiento: string
  edad: number
  estado_civil_id: number
  grado_instruccion_id: number
  ocupacion_id: number
  religion_id: number
  seguro_salud_id: number
  familia_id: number
  docid_nombre: string
  pers_numero_documento_identidad: string
  esci_nombre: string
  grain_nombre: string
  ocup_nombre: string
  reli_nombre: string
  sesa_nombre: string
  fam_nombre_familia: string
}
