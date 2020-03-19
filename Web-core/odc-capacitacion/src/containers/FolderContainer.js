import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form'
import Paper from '@material-ui/core/Paper'
import { ProgressBar, NewButton, EditButton } from 'odc-common'
import { useCatalogs } from "odc-configuration";

import { withStyles } from '@material-ui/core/styles'
import { commonStyles } from 'odc-common'
import { institutionActions } from "odc-configuration";
const { getAllInstitutions } = institutionActions;
import { showMessageAndHide, insertItem, updateItem } from 'odc-common' 
import  useFolder from  '../hooks/hookFolder';
import  GridTFolder from  '../components/GridFolder'
import  Popup  from '../components/Popup'
import {
    addFolder,
} from '../communication/FolderComunication'



const MasterFolder = () => {
  const dispatch = useDispatch()

//   const { catalogs, isLoadingCatalogs } = useCatalogs(
//     ["TypeBox"].join(",")
//   );

//   useEffect(() => {
//     dispatch(getAllInstitutions());
//   }, []);


//   const { codeInstitution } = useSelector(
//     state => state.auth.authUser //state te retorna todo el estado global 
//   );

  const { folder, setfolder, isLoadingFolder, error  } = useFolder("2", true)
  
  const [selection, setSelection] = useState([])
  const [flagEdit, setFlagEdit] = useState(false)
  const [openWindow, setOpenWindow] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(undefined)
  const [selectedFolder, setSelectedFolder] = useState(undefined)

  const handleClickNew = () => {
    setFlagEdit(false)
    setOpenWindow(true)
  }

  const handleClickEdit = () => {
    setFlagEdit(true)
    setOpenWindow(true)
  }

  const handlePopUpSubmit = async values => {
    if (flagEdit) {
        console.log("edicion")
    } else {
      //map values from fieldsthe to values set the fields
      const result = await addFolder(values)
      if (result.state) {
        setfolder(
          insertItem(folder, {
            index: folder.length,
            item: { ...values,id:folder.length}
          })
        )
        setOpenWindow(false)
        dispatch(showMessageAndHide('Transacción Ok'))
      } else {
        dispatch(showMessageAndHide('Error: ' + result.message))
      }
    }
  }

  const handleClose = () => {
    setOpenWindow(false)
  }

  const handleSelection = value => {
    console.log(value)

    if (value.length > 0) {
      console.log(value)
      setSelectedIndex(value[0].id)
      setSelectedFolder(value[0].IdFolder)
    } else {
      setSelectedIndex(undefined)
      setSelectedFolder(undefined)
    }
    setSelection(value)
  }

  

//   const institutions = useSelector(
//     state => state.configuration.institution.rows
//   );


  const PopupWrapped = withStyles(commonStyles)(Popup)

  //if (isLoadingFolder) return <Fragment>Cargando Folder...</Fragment>

  return (
    <Paper style={{ position: 'relative' }}>
      <div>
        <NewButton onClick={handleClickNew} />
        <EditButton disabled={selection.length === 0} onClick={handleClickEdit} /> 

        <Form
          initialValues={{
            folder: folder
          }}
          onSubmit={() => {}}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <GridTFolder onSelectionChange={handleSelection} />
              {isLoadingFolder && <ProgressBar />}
            </form>
          )}
        />
      
      </div>
      <PopupWrapped
            open={openWindow}
            onClose={handleClose}
            flagEdit={flagEdit}
            selectedFolder={selectedFolder}
            title={'Administracion de Carpetas'}
            size={'md'}
            handlePopUpSubmit={handlePopUpSubmit}

         />



    </Paper>
    
  )
}
export default MasterFolder
