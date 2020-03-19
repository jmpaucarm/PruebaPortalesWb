/* eslint-disable react/prop-types */
import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import  DatosFolder from  '../containers/DatosFolder'
import { ProgressBar } from 'odc-common'

class Popup extends React.Component {
  render() {
    const {
      open,
      onClose,
      flagEdit,
      selectedFolder,
      title,
      size,
      handlePopUpSubmit
      
    } = this.props
    return (
      <MuiThemeProvider>
        <Dialog
          onClose={onClose}
          open={open}
          maxWidth={size}
          fullScreen={false}
        >
          <DialogTitle color={'primary'}>{title}</DialogTitle>
          <DialogContent>
            <DatosFolder
            handleClose={onClose}
             flagEdit={flagEdit}
             selectedFolder={selectedFolder}
             onSubmit={handlePopUpSubmit}
            />
          </DialogContent>
        </Dialog>
      </MuiThemeProvider>
    )
  }
}

export default Popup
