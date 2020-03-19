import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import { required } from "odc-common";
import {
  estadoCivil,
  origenIngreso,
  situacionFinanciera,
  initialValues
} from "./init";
import { validateIdentification as asyncValidate } from "./asyncValidations";
import {
  TextBox,
  ComboBox,
  Email,
  CellPhone,
  Date,
  RadioButtons,
  NumberInput
} from "odc-common";

import { GeoLocation } from "odc-configuration";

let SimpleForm = props => {
  const { handleSubmit, form, valid, anyTouched, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <br />
      <FormLabel component="legend">Cliente</FormLabel>

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <NumberInput
            name="identificacion"
            validate={[required]}
            label="Identificación"
            placeholder="Identificación"
            isRequired
          />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <TextBox
            name="fullName"
            validate={[required]}
            label="Nombre y Apellido"
            placeholder="Nombre y Apellido"
          />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <Email
            name="email"
            label="Correo Electrónico"
            placeholder="Correo Electrónico"
            isRequired
          />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <Date
            name="fechaAfiliacion"
            label="Fecha de afiliación"
            placeholder="Fecha de afiliación"
            isRequired
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <RadioButtons
            title={"Situación financiera"}
            name={"situacionFinanciera"}
            elements={situacionFinanciera}
            isRequired
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <ComboBox
            name="origenIngreso"
            label="Orígen de ingreso"
            validate={[required]}
            elements={origenIngreso}
            isRequired
          />
        </div>
      </div>

      <br />
      <FormLabel component="legend">Datos</FormLabel>

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <ComboBox
            name="estadoCivil"
            label="Estado Civil"
            validate={[required]}
            elements={estadoCivil}
            isRequired
          />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <Date
            name="fechaNacimiento"
            validate={[required]}
            label="Fecha de nacimiento"
            placeholder="Fecha de nacimiento"
            isRequired
          />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <CellPhone name={"phone"} label={"Teléfono"} isRequired />
        </div>
      </div>
      <div className="row">
        <GeoLocation formName={form} maxGeographicLocation={3} />
      </div>
      <br />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={submitting || !(valid && anyTouched)}
      >
        Iniciar
      </Button>
    </form>
  );
};

SimpleForm = reduxForm({
  form: "startNewProcess",
  enableReinitialize: true,
  asyncValidate,
  asyncBlurFields: ["identificacion"]
})(SimpleForm);

SimpleForm = connect(state => ({
  initialValues: initialValues
}))(SimpleForm);
export default SimpleForm;
