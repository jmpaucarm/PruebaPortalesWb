import React from "react";
import Button from "@material-ui/core/Button";
import Replay from "@material-ui/icons/Replay";
import LockOpen from "@material-ui/icons/LockOpen";
import { IntlMessages } from "odc-common";

export const UnLockButton = props => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={props.onClick}
      disabled={props.disabled}
      style={{ margin: "5px" }}
    >
      <LockOpen /> {<IntlMessages id="user.state.unlock" />}
    </Button>
  );
};

export const DisconnectButton = props => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={props.onClick}
      disabled={props.disabled}
      style={{ margin: "5px" }}
    >
      <Replay /> {<IntlMessages id="user.state.disconnect" />}
    </Button>
  );
};
