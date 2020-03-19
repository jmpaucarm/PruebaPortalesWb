import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import { TextBox, NumberInput, ComboBox } from "odc-common";
import { producto } from "./init";
import { consultarTasa as asyncValidate } from "./asyncValidations";

let SimpleForm = props => {
  const { handleSubmit, submitting, valid, anyTouched } = props;

  return (
    <form onSubmit={handleSubmit} style={{ marginLeft: "20px" }}>
      <br />
      <FormLabel component="legend">Oferta sugerida</FormLabel>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
          <NumberInput
            name="montoSugerido"
            label="Monto"
            placeholder="Monto"
            disabled
          />
          <NumberInput
            name={"montoSugerido"}
            label={"Monto"}
            placeholder={"Monto"}
            isRequired
          />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
          <NumberInput
            name="periodosSugerido"
            label="Periodos"
            placeholder="Periodos"
            disabled
          />
        </div>
      </div>
      <br />
      <FormLabel component="legend">Oferta solicitada</FormLabel>
      <br />
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <TextBox name="perfil" label="Perfil" placeholder="Perfil" disabled />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <ComboBox
            name="producto"
            label="Producto"
            isRequired
            elements={producto}
          />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <NumberInput
            name="montoSolicitado"
            label="Monto solicitado"
            isRequired
            placeholder="Monto solicitado"
          />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <NumberInput
            name="plazoSolicitado"
            label="Plazo"
            isRequired
            placeholder="Plazo"
          />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <NumberInput
            name="periodosSolicitado"
            label="Periodos"
            placeholder="Periodos"
            isRequired
          />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <NumberInput
            name="cuota"
            label="Cuota"
            placeholder="Cuota"
            disabled
          />
        </div>
      </div>
      <br />
      <br /> <br />
      <br /> <br />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={submitting || !(valid && anyTouched)}
      >
        promover
      </Button>
      <br />
      <br />
    </form>
  );
};

SimpleForm = connect(null)(SimpleForm);

export default reduxForm({
  form: "ingresoOferta",
  asyncValidate,
  asyncBlurFields: [
    "producto",
    "montoSolicitado",
    "plazoSolicitado",
    "periodosSolicitado"
  ]
})(SimpleForm);
