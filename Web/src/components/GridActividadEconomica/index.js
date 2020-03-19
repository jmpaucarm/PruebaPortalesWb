import React from "react";
import { Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { GenericGrid } from "odc-common";
import { checkDuplicates, showMessageAndHide } from "odc-common";

const catalogs = {
  tipoDato: [
    {
      key: "telefonos",
      value: "telefonos",
      name: "Teléfono"
    },
    {
      key: "direcciones",
      value: "direcciones",
      name: "Dirección"
    }
  ],
  telefonos: [
    {
      key: "telefono1",
      value: "telefono1",
      name: "Teléfono I"
    },
    {
      key: "telefono2",
      value: "telefono2",
      name: "Teléfono II"
    }
  ],
  direcciones: [
    {
      key: "direccion1",
      value: "direccion1",
      name: "Dirección I"
    },
    {
      key: "direccion2",
      value: "direccion2",
      name: "Dirección II"
    }
  ]
};

const atLeastOneActive = value => {
  return value
    ? Array.isArray(value)
      ? value.some(item => item.isActive)
        ? undefined
        : "Debe tener al menos un detalle activo"
      : undefined
    : "Debe tener al menos un detalle activo";
};

const gridValidate = values => {
  const errors = {};

  if (!values.code) {
    errors.code = "Requerido";
  } else if (values.code.length < 3) {
    errors.code = "Debe tener más de 3 caracteres";
  } else if (values.code.length > 32) {
    errors.code = "Debe tener menos de 32 caracteres";
  }

  if (!values.description) {
    errors.description = "Requerido";
  } else if (values.description.length < 3) {
    errors.description = "Debe tener más de 3 caracteres";
  } else if (values.description.length > 128) {
    errors.description = "Debe tener menos de 128 caracteres";
  }

  if (!values.tipoDato) {
    errors.tipoDato = "Requerido";
  }


  if (Number(values.order) === 0) {
    errors.order = "Debe ser mayor a 0 ";
  }
  return errors;
};

const GridActividadEconomica = ({ prefix, enablePlaceholder }) => {
  const dispatch = useDispatch();

  return (
    <Field
      name={`${prefix}.ActividadEconomica`}
      columns={[
        { name: "code", title: "Código" },
        { name: "description", title: "Descripción" },
        { name: "tipoDato", title: "Tipo Dato" },
        { name: "order", title: "Orden" },
        { name: "isActive", title: "Activo" },
        { name: "fecha", title: "Fecha" }
      ]}
      emptyItem={{
        code: "",
        description: "",
        tipoDato: "telefonos",
        isActive: true,
        order: 1
      }}
      stringColumns={["code", "description"]}
      numberColumns={["order"]}
      booleanColumns={["isActive"]}
      selectColumns={["tipoDato"]}
      dateColumns={["fecha"]}
      validate={atLeastOneActive}
      errorMessage={"Debe tener al menos una actividad económica activa"}
      commitValidate={rows => {
        const isValid = checkDuplicates(rows.map(row => row.code));
        if (isValid) dispatch(showMessageAndHide("Error, actividad duplicada"));
        return isValid;
      }}
      gridValidate={gridValidate}
      enablePlaceholder={enablePlaceholder}
      catalogs={catalogs}
      component={GenericGrid}
      subscription={{ value: true, error: true }}
      title={"Actividad Económica"}
      editingStateColumnExtensions={[{ columnName: "description", editingEnabled: false }]}
      defaultSorting={[{ columnName: 'order', direction: 'asc' }]}
      defaultFilters={[]}
      //disableAdd
      //disableEdit
      defaultCurrentPage={0}
      pageSize={10}
      //enableSelection
      //onSelectionChange={setSelection}
      //enableInlineEditing
    />
  );
};

export default GridActividadEconomica;
