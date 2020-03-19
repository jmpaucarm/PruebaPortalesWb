/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { changeCurrentLocationLabel } from 'odc-common'

import { Form, Field } from 'react-final-form'
import MasterFolder from '../containers/FolderContainer'


const Folder = () => {

  return (
    <div className='app-wrapper'>
      <div>
        <MasterFolder />

      </div>
    </div>
  )
}

export default Folder
