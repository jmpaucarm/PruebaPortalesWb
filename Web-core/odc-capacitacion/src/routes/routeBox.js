/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { changeCurrentLocationLabel } from 'odc-common'

import { Form, Field } from 'react-final-form'
import MasterBox from '../containers/Box/BoxContainer'


const Box = () => {

  return (
    <div className='app-wrapper'>
      <div>
        <MasterBox />

      </div>
    </div>
  )
}

export default Box
