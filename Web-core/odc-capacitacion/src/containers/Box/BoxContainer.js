/* eslint-disable standard/object-curly-even-spacing */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form'
import Paper from '@material-ui/core/Paper'
import { ProgressBar, NewButton, EditButton } from 'odc-common'
import { useCatalogs } from "odc-configuration";

import ComputerIcon from '@material-ui/icons/Computer'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { commonStyles } from 'odc-common'

import useBox from '../../hooks/hookBox'
import { institutionActions } from "odc-configuration";
import GridBox from '../../components/Box/GridBox'
import Popup from '../../components/Box/Popup'



// cambiar a los metodos para obtener los hijos
const { getAllInstitutions } = institutionActions;

// importar todos los metodos necesarios
import {
    addBox,
    updateBox
} from '../../communication/boxComunication'

import { showMessageAndHide, insertItem, updateItem } from 'odc-common' // insert item para refrescar la grilla nada mas interta 1

const MasterBox = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllInstitutions());
  }, []);



  // const { codeInstitution } = useSelector(
  //   state => state.auth.authUser //state te retorna todo el estado global 
 
  // );
  // console.log("institucion",codeInstitution)
const codeInstitution='2'
  const { Box, setBox, isLoadingBox , error } = useBox(codeInstitution, true)
  
  // para validar la seleccion de uno de los items de la grilla
  const [selection, setSelection] = useState([])
  const [flagEdit, setFlagEdit] = useState(false)
  const [openWindow, setOpenWindow] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(undefined)
  const [selectedBoxCode, setSelectedBoxCode] = useState(undefined)

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
      const result = await updateBox(values)
      if (result.state) {
        setBox(
          updateItem(Box, {
            index: selectedIndex,
            item: values
          })
        )
        setOpenWindow(false)
        dispatch(showMessageAndHide('Transacción Ok'))
      } else {
        dispatch(showMessageAndHide('Error: ' + result.message))
      }
    } else {
      const result = await addBox(values)
      if (result.state) {
        setBox(
          insertItem(Box, {
            index: Box.length,
            item: { ...values,id:Box.length}
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
    if (value.length > 0) {
      setSelectedIndex(value[0].id)
      setSelectedBoxCode(value[0].codeTypeBox)
    } else {
      setSelectedIndex(undefined)
      setSelectedBoxCode(undefined)
    }
    setSelection(value)
  }

  const institutions = useSelector(
    state => state.configuration.institution.rows
  );


  const PopupWrapped = withStyles(commonStyles)(Popup)

  if (isLoadingBox) return <Fragment>Cargando Box...</Fragment>

  return (
    <Paper style={{ position: 'relative' }}>
      <div>
        <NewButton onClick={handleClickNew} />
        <EditButton
          disabled={selection.length === 0}
          onClick={handleClickEdit}
        />

        <Form
          initialValues={{
            Box: Box
          }}
          onSubmit={() => {}}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <GridBox onSelectionChange={handleSelection} />
              {isLoadingBox && <ProgressBar />}
            </form>
          )}
        />
        { (
          <PopupWrapped
            open={openWindow}
            onClose={handleClose}
            flagEdit={flagEdit}
            BoxCode={selectedBoxCode}
            handlePopUpSubmit={handlePopUpSubmit}
            title={'Administracion de Cajas'}
            size={'md'}
            codeInstitution={codeInstitution}
            institutions={institutions}
         />
        )}
      </div>
    </Paper>
  )
}
export default MasterBox
