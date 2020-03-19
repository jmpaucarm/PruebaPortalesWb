import React from "react";
import { Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { GenericGrid } from "odc-common";
import { checkDuplicates, showMessageAndHide } from "odc-common";

import { Table } from "@devexpress/dx-react-grid-material-ui";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

const catalogs = {
  combo: [
    {
      key: 1,
      value: "combo1",
      name: "Combo 1"
    },
    {
      key: 2,
      value: "combo2",
      name: "Combo 2"
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

  if (Number(values.order) === 0) {
    errors.order = "Debe ser mayor a 0 ";
  }
  return errors;
};

const RangeSemaphoreCell = ({ value, style, ...restProps }) => {
  const color =
    value >= 0 && value <= 10
      ? "red"
      : value > 10 && value <= 20
      ? "yellow"
      : value > 20 && value <= 30
      ? "green"
      : undefined;

  return (
    <Table.Cell
      {...restProps}
      style={{
        color: color,
        ...style
      }}
    >
      {value >= 0 && value <= 30 ? (
        <span
          style={{
            marginLeft: 10
          }}
        >
          <FiberManualRecord />
        </span>
      ) : (
        <span
          style={{
            marginLeft: 10
          }}
        >
          {"N/A"}
        </span>
      )}
    </Table.Cell>
  );
};

const CodeSemaphoreCell = ({ value, style, ...restProps }) => {
  const color =
    value === "ABC"
      ? "red"
      : value === "ABCD"
      ? "yellow"
      : value === "ABCDE"
      ? "green"
      : undefined;

  return (
    <Table.Cell
      {...restProps}
      style={{
        color: color,
        ...style
      }}
    >
      {value === "ABC" || value === "ABCD" || value === "ABCDE" ? (
        <span
          style={{
            marginLeft: 10
          }}
        >
          <FiberManualRecord />
        </span>
      ) : (
        <span
          style={{
            marginLeft: 10
          }}
        >
          {"N/A"}
        </span>
      )}
    </Table.Cell>
  );
};

const Cell = props => {
  const { column } = props;
  if (column.name === "order") {
    return <RangeSemaphoreCell {...props} />;
  } else if (column.name === "code") {
    return <CodeSemaphoreCell {...props} />;
  }
  return <Table.Cell {...props} />;
};

const GridReferenciasPersonales = ({ prefix, enablePlaceholder }) => {
  const dispatch = useDispatch();

  //const [selection, setSelection] = useState([]);

  return (
    <Field
      name={`${prefix}.ReferenciasPersonales`}
      columns={[
        { name: "code", title: "Código" },

        { name: "description", title: "Descripción" },
        { name: "combo", title: "Combo" },
        { name: "order", title: "Orden" },
        { name: "isActive", title: "Activo" }
      ]}
      emptyItem={{
        code: "",
        combo: 1,
        description: "",
        isActive: true,
        order: 1
      }}
      stringColumns={["code", "description"]}
      numberColumns={["order"]}
      booleanColumns={["isActive"]}
      selectColumns={["combo"]}
      validate={atLeastOneActive}
      errorMessage={"Debe tener al menos un detalle activo"}
      commitValidate={rows => {
        const isValid = checkDuplicates(rows.map(row => row.code));
        if (isValid) dispatch(showMessageAndHide("Error, catálogo duplicado"));
        return isValid;
      }}
      gridValidate={gridValidate}
      enablePlaceholder={enablePlaceholder}
      catalogs={catalogs}
      component={GenericGrid}
      subscription={{ value: true, error: true }}
      title={"Referencias Personales"}
      defaultFilters={[]}
      cellComponent={Cell}
      tableColumnExtensions={[
        { columnName: "code", width: 100 },
        { columnName: "order", width: 100 }
      ]}
      //enableSelection
      //onSelectionChange={setSelection}
      //enableInlineEditing
      //disableEdit
    />
  );
};

export default GridReferenciasPersonales;
