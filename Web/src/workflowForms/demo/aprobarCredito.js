import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import { File, TextBox, Switch, NumberInput } from "odc-common";

let SimpleForm = props => {
  const { handleSubmit, taskId, submitting } = props;

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
          <Switch
            name="devuelve"
            label="devuelte?"
            placeholder="devuelve?"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
          <Switch
            name="xReferencias"
            label="por referencias?"
            placeholder="por referencias?"
          />
        </div>
      </div>
      <br />
      <br />
      <div className="row">
        <legend>
          <h3>Documentos</h3>
        </legend>
        <br />
        <File
          name="docIdentification"
          isImg={true}
          label="Identificación"
          taskId={taskId}
          disabled={true}
        />
        <File
          name="docServiciosBasicos"
          isImg={true}
          label="Servicios Básicos"
          taskId={taskId}
        />
        <File name="docFirma" isImg={true} label="Firma" taskId={taskId} />
        <File name="docOtros" isImg={false} label="Otros" taskId={taskId} />
      </div>

      <br />
      <br />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={submitting}
      >
        promover
      </Button>
      <br />
      <br />
    </form>
  );
};

SimpleForm = reduxForm({
  form: "aprobarCredito",
  enableReinitialize: true
})(SimpleForm);
SimpleForm = connect(state => ({
  initialValues: {}
}))(SimpleForm);
export default SimpleForm;
