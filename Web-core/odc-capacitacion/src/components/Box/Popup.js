/* eslint-disable react/prop-types */
import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { ProgressBar } from 'odc-common'

import DatosBox from '../../containers/Box/DatosBox'

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
      BoxCode,
      codeInstitution,
      institutions
      
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
            <DatosBox
              onSubmit={handlePopUpSubmit}
              flagEdit={flagEdit}
              handleClose={onClose}
              BoxCode={BoxCode}
              codeInstitution={codeInstitution}
              institutions={institutions}
         />
            {showProgressBar && <ProgressBar />}
          </DialogContent>
        </Dialog>
      </MuiThemeProvider>
    )
  }
}

export default Popup
