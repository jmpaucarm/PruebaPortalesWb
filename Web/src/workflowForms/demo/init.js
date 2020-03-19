export const producto = [
  { code: "", description: "" },
  { code: "Personal", description: "Personal" },
  { code: "Advance", description: "Advance" },
  { code: "Emprendedor", description: "Emprendedor" }
];

export const origenIngreso = [
  { code: "Salario", description: "Salario" },
  { code: "Remesas", description: "Remesas" },
  { code: "Jubilado", description: "Jubilado" },
  { code: "Ventas", description: "Ventas" }
];

export const estadoCivil = [
  { code: "SOL", description: "Soltero" },
  { code: "CAS", description: "Casado" },
  { code: "DIV", description: "Divorciado" },
  { code: "VIU", description: "Viudo" }
];

export const situacionFinanciera = [
  {
    code: "INDFORHON",
    description: "INDEPENDIENTE FORMAL (HONORARIOS)"
  },
  {
    code: "INDFORINF",
    description: "INDEPENDIENTE FORMAL O INFORMAL"
  },
  {
    code: "INDINFOFI",
    description: "INDEPENDIENTE INFORMAL - OFICIO"
  }
];

export const initialValues = {
  throwError: false,
  idAgencia: 1,
  estado: "INICIADA",
  producto: "Personal",
  esPerfilCliente: false,
  perfil: "INCLUSION",

  /* montoSolicitado: 1850,
      plazoSolicitado: 15,
      periodosSolicitado: 18, */

  devuelve: false,
  origenIngreso: "",
  montoSugerido: 800,
  periodosSugerido: 12,
  cuota: 0,
  docHabilitantes: [
    { name: "docIdentification", label: "Identificación" },
    { name: "docServiciosBasicos", label: "Servicios Básicos" },
    { name: "docOtros", label: "Otros" }
  ]
};
