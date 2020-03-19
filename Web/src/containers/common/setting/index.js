import React from "react";
import Paper from "@material-ui/core/Paper";
import Test from "../../../components/Test";

class ContainerSetting extends React.Component {
  render() {
    return (
      <Paper style={{ position: "relative" }}>
        <Test />
      </Paper>
    );
  }
}

export default ContainerSetting;
