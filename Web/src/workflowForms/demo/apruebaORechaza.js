import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import { Switch } from "odc-common";

let SimpleForm = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} style={{ marginLeft: "20px" }}>
      <br />

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
          <Switch name="aprueba" label="aprueba?" placeholder="aprueba?" />
        </div>
      </div>

      <br />

      <Button variant="contained" color="primary" type="submit">
        promover
      </Button>
      <br />
      <br />
    </form>
  );
};

SimpleForm = reduxForm({
  form: "apruebaORechaza",
  enableReinitialize: true
})(SimpleForm);
SimpleForm = connect(state => ({
  initialValues: {}
}))(SimpleForm);
export default SimpleForm;
