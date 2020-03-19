import React from 'react'
import { Field } from 'react-final-form'
import { GenericGrid, IntlMessages } from 'odc-common'

const GridTFolder = ({ onSelectionChange }) => {
  return (
    <Field
      name={'folder'}
      columns={[

        { name: 'codeTypeFolder', title: <IntlMessages  id='Folder.codeTypeFolder' /> },
        { name: 'institution', title: <IntlMessages     id='Folder.institution' /> },
        { name: 'description', title: <IntlMessages     id='Folder.description' /> },
        { name: 'path', title: <IntlMessages            id='Folder.path' /> },
        { name: 'dateEnd', title: <IntlMessages         id='Folder.dateEnd' /> },
        { name: 'isActive', title: <IntlMessages        id='Folder.isActive' /> }

      ]}
      booleanColumns={['isActive']}
      component={GenericGrid}
      disableAdd
      disableEdit
      defaultCurrentPage={0}
      pageSize={20}
      enableSelections
      onSelectionChange={onSelectionChange}
    />
  )
}

export default GridTFolder
