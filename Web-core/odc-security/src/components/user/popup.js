import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { ProgressBar } from "odc-common";

import User from "../../containers/user/user";

class Popup extends React.Component {
  render() {
    const {
      open,
      onClose,
      flagEdit,
      handlePopUpSubmit,
      showProgressBar,
      title,
      size,
      offices,
      userCode,
      institutions,
      catalogs,
      profiles
    } = this.props;
    return (
      <MuiThemeProvider>
        <Dialog
          onClose={onClose}
          open={open}
          maxWidth={size}
          fullScreen={false}
        >
          <DialogTitle color={"primary"}>{title}</DialogTitle>
          <DialogContent>
            <User
              onSubmit={handlePopUpSubmit}
              flagEdit={flagEdit}
              handleClose={onClose}
              offices={offices}
              userCode={userCode}
              institutions={institutions}
              catalogs={catalogs}
              profiles={profiles}
            />
            {showProgressBar && <ProgressBar />}
          </DialogContent>
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

export default Popup;
