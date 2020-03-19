import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import { TextBox, Switch, NumberInput } from "odc-common";
import { required } from "odc-common";

let SimpleForm = props => {
  const { handleSubmit, submitting, valid, anyTouched } = props;

  return (
    <form onSubmit={handleSubmit} style={{ marginLeft: "20px" }}>
      <br />

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
          <TextBox
            name="fullName"
            label="Nombre"
            placeholder="Nombre Completo"
            disabled
          />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
          <NumberInput
            name="identificacion"
            label="Identificación"
            placeholder="Identificación"
            disabled
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
          <TextBox
            name="referencia"
            label="Referencia"
            placeholder="Referencia"
            validate={[required]}
          />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
          <TextBox
            name="direccionCompleta"
            label="Dirección completa"
            placeholder="Dirección completa"
            validate={[required]}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
          <Switch
            name="politicaNoRegistra"
            label="política no registra?"
            placeholder="política no registra?"
          />
        </div>
      </div>

      <br />

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

SimpleForm = reduxForm({
  form: "digitacionCompleta",
  enableReinitialize: true
})(SimpleForm);
SimpleForm = connect(state => ({
  initialValues: {}
}))(SimpleForm);
export default SimpleForm;
