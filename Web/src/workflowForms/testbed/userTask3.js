import React from "react";
import { Form } from "react-final-form";
import Button from "@material-ui/core/Button";

import { useParametros } from "odc-common";
import { useCatalogs } from "odc-configuration";

import SimpleTabs from "../../containers/Tabs";
import { AutoSaveWorkflowVariables } from "odc-workflow";
import { LoadWorkflowVariables } from "odc-workflow";

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
      onSubmit={onSubmit}
      subscription={{ valid: true, submitting: true }}
      render={({ handleSubmit, valid, submitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <LoadWorkflowVariables
              taskId={taskId}
              otherValues={{ estado: "Prueba" }}
            />
            <AutoSaveWorkflowVariables taskId={taskId} debounce={10 * 1000} />
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
