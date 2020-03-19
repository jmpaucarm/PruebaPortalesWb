import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { ProgressBar } from "odc-common";
import Profile from "../../containers/profile/profile";

class Popup extends React.Component {
  render() {
    const {
      open,
      onClose,
      flagEdit,
      handleSubmit,
      showProgressBar,
      title,
      size,
      offices
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
            <Profile
              onSubmit={handleSubmit}
              flagEdit={flagEdit}
              handleClose={onClose}
              offices={offices}
            />
            {showProgressBar && <ProgressBar />}
          </DialogContent>
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

export default Popup;
