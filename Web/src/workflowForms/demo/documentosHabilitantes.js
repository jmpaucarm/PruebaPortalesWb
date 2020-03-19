import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import { TextBox, NumberInput, UploadFile } from "odc-common";

let SimpleForm = props => {
  const {
    handleSubmit,
    docHabilitantes,
    submitting,
    anyTouched,
    valid
  } = props;
  return (
    <form onSubmit={handleSubmit} style={{ marginLeft: "20px" }}>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
          <TextBox
            name="fullName"
            label="Nombre Completo"
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
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
          <Field name="docHabilitantes" component="input" hidden />
        </div>
      </div>
      <br />
      {docHabilitantes && (
        <legend>
          <h3>Documentos</h3>
        </legend>
      )}
      <div className="row">
        {docHabilitantes &&
          docHabilitantes.map(file => (
            <div
              key={file.name}
              className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4"
            >
              <UploadFile name={file.name} label={file.label} isRequired />
            </div>
          ))}
      </div>

      <br />
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

function mapStateToProps(state) {
  const files = state.form.documentosHabilitantes
    ? state.form.documentosHabilitantes.values
    : undefined;

  return { docHabilitantes: files ? files.docHabilitantes : [] };
}

SimpleForm = reduxForm({
  form: "documentosHabilitantes",
  enableReinitialize: true
})(SimpleForm);

SimpleForm = connect(mapStateToProps)(SimpleForm);
export default SimpleForm;
