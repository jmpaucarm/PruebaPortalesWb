import React from "react";
import { Form } from "react-final-form";
import Button from "@material-ui/core/Button";

import { useParametros } from "odc-common";
import { useCatalogs } from "odc-configuration";

import SimpleTabs from "../../containers/Tabs";

const nombreFormulario = "digitacion";
const nombreControl = "Control 1";

const catalogsList = [
  "TiempoTrabajo",
  "TipoSueldo",
  "FuenteInfoNegocio",
  "RelacionDependencia",
  "Cargo",
  "TipoDispositivo",
  "ParentescoRelacion",
  "TipoReferencia",
  "TipoContrato",
  "TipoDoc",
  "TipoVivienda",
  "EstadoCivil",
  "Genero",
  "TipoNacionalidad",
  "NivelInstruccionCli",
  "Profesion",
  "TipoParroquia",
  "TipoPrestamos"
];

const SimpleForm = ({ taskId, onSubmit }) => {
  const { catalogs, isLoadingCatalogs } = useCatalogs(catalogsList.join(","));

  const { parametros, isLoadingParametros } = useParametros(
    nombreFormulario,
    nombreControl
  );

  if (isLoadingCatalogs || isLoadingParametros) return <>Cargando...</>;

  return (
    <Form
      initialValues={{}}
      onSubmit={onSubmit}
      subscription={{ valid: true, submitting: true }}
      render={({ handleSubmit, valid, submitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <SimpleTabs catalogos={catalogs} parametros={parametros} />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={submitting || !valid}
            >
              promover
            </Button>
          </form>
        );
      }}
    />
  );
};

export default SimpleForm;
