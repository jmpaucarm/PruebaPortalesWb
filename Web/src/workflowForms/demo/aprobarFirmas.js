import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import { ImageViewer, Switch } from "odc-common";

const fileImageUrl = "https://cdn.sharpened.com/img/sw/afv/afv_icon.png";
const baseUrl = process.env.REACT_APP_API_WORKFLOW_ROOT + "task/";

let SimpleForm = props => {
  const { handleSubmit, taskId, submitting } = props;

  return (
    <form onSubmit={handleSubmit} style={{ marginLeft: "20px" }}>
      <br />

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
          <Switch
            name="esOtroModulo"
            label="es otro módulo?"
            placeholder="es otro módulo?"
          />
        </div>
      </div>
      <br />
      <div className="row">
        <legend>
          <h3>Documentos</h3>
        </legend>
        <br />
        <ImageViewer
          name="docFirma"
          isImg={true}
          label="Firma"
          url={baseUrl + taskId + "/variables/docFirma/data"}
          fileImageUrl={fileImageUrl}
        />
      </div>

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
  form: "aprobarFirmas",
  enableReinitialize: true
})(SimpleForm);
SimpleForm = connect(state => ({
  initialValues: {}
}))(SimpleForm);
export default SimpleForm;
