/* eslint-disable react/prop-types */
import React from 'react'
import { Field } from 'react-final-form'
import { GenericGrid, IntlMessages } from 'odc-common'

const GridBox = ({ onSelectionChange }) => {
  return (
    <Field
      name={'Box'}
      columns={[
        // cargar el estado de los mensajes en una estructura de mensajes estos mensajes se debe exportar en el archivo
        // localization entries
        { name: 'codeTypeBox', title: <IntlMessages id='typeBox.code' /> },
        { name: 'institution', title: <IntlMessages id='typeBox.institution' /> },
        { name: 'description', title: <IntlMessages id='typeBox.description' /> },
        { name: 'dateEnd', title: <IntlMessages id='typeBox.type' /> },
        { name: 'numberItems', title: <IntlMessages id='typeBox.type' /> },
        { name: 'isActive', title: <IntlMessages id='typeBox.is.active' /> }

      ]}
      booleanColumns={['isActive']}
      component={GenericGrid}
      disableAdd
      disableEdit
      defaultCurrentPage={0}
      pageSize={20}
      enableSelection
      onSelectionChange={onSelectionChange}
    />
  )
}

export default GridBox
