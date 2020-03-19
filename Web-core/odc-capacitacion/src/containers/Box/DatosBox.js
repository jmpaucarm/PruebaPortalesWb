/* eslint-disable react/prop-types */
/* eslint-disable standard/object-curly-even-spacing */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Form, Field } from 'react-final-form'
import MenuItem from '@material-ui/core/MenuItem'
import { injectIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { OnChange } from 'react-final-form-listeners'
// importacion de botones y textBox ya generados por el negocio
import {
  SaveButton,
  CancelButton,
  ProgressBar,
  IntlMessages,
  GenericGrid,
  renderDateField,
  renderNumberField
} from 'odc-common'
import {
  composeValidators,
  required,
  minLength,
  maxLength,
  renderTextField,
  renderSwitch,
  renderSelectField,
  emptyItem,
  
  checkDuplicates,
  showMessageAndHide,
  onlyText,
  onlyTextAndNumbers,
  validateIdVariant
} from 'odc-common'

import { getbycode } from '../../communication/boxComunication'

// validacion para que la activacion del hijo sea activo almenos uno
const atLeastOneActive = value => {
  return value
    ? Array.isArray(value)
      ? value.some(item => item.isActive)
        ? undefined
        : 'Debe tener al menos un perfil activo'
      : undefined
    : 'Debe tener al menos un perfil activo'
}

const DatosBox = ({
  flagEdit,
  BoxCode,
  onSubmit,
  handleClose,
  codeInstitution,
  institutions,
  intl
}) => {
  const dispatch = useDispatch()
  const [Box, setBox] = useState({})
  const [showProgressBar, setShowProgressBar] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowProgressBar(true)
        const coreResponse = await getbycode(BoxCode, codeInstitution) 
        console.log("response",coreResponse)
        debugger;
        if (coreResponse.state) {
          setBox(coreResponse.data)
          console.log(coreResponse.data)
        } else setBox({})
        setShowProgressBar(false)
      } catch (error) {
        setError(error)
        setShowProgressBar(false)
      }
    }
    if (flagEdit) fetchData()
  }, [BoxCode, flagEdit])
  console.log(Box)

  return (
    <Form
      initialValues={flagEdit ? Box : { isActive: true }}
     
      onSubmit={onSubmit}
      subscription={{ valid: true, submitting: true }}

      render={({ handleSubmit, submitting, valid }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <div className='row'>
              <div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3'>
                <Field
                  name='codeTypeBox'
                  label={<IntlMessages id='typeBox.code' />}
                

                  component={renderTextField}
                  subscription={{ value: true, error: true, touched: true }}
                  parse={onlyText}
                />
              </div>
              <div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3'>
                <Field
                   name='institution'
                  label={<IntlMessages id='typeBox.institution' />}
                  component={renderSelectField}
                  subscription={{ value: true, error: true, touched: true }}
                  validate={required}
                   
                >
                   {emptyItem.concat(institutions).map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.code}>
                        {item.name}
                      </MenuItem>
                    );
                  })}                 
                </Field>
              </div>
              <div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3'>
                <Field
                  name='description'
                  label={<IntlMessages id='typeBox.description' />}
                  validate={composeValidators(
                    required,
                    minLength(3),
                    maxLength(128)
                  )}

                  component={renderTextField}
                  subscription={{ value: true, error: true, touched: true }}
                  parse={onlyText}
                />
              </div>
              <div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3'>
                <Field
                  name='dateEnd'
                  label={<IntlMessages id='typeBox.type' />}
                  //catalogs
                  component={renderDateField}
                  subscription={{ value: true, error: true, touched: true }}
                  validate={required}
              / >
                 
              </div>
              <div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3'>
                <Field
                  name='numberItems'
                  label={<IntlMessages id='typeBox.type' />}
                  //catalogs
                  component={renderNumberField}
                  subscription={{ value: true, error: true, touched: true }}
                  validate={required}
              / >
                 
              </div>
              <div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3'>
                <Field
                  name='isActive'
                  subscription={{ value: true, error: true, touched: true }}
                  label={<IntlMessages id='typeBox.is.active' />}
                  component={renderSwitch}                                       
                />

              </div>
            </div>
            <div>
              <Field
                name={'boxField'}
                columns={[
                  {
                    name: "codeField",
                    title: <IntlMessages id="typeBox.typeBoxField.IdField" />
                  },
                  {
                    name: 'value',
                    title: <IntlMessages id='typeBox.typeBoxField.IsActive' />
                  }
                ]}
                booleanColumns={['isActive']}
                component={GenericGrid}
                                              
                emptyItem={{
                    idBoxField: 0,
                    idBox: 0,
                                     
                }}
              
              />
            </div>
            <br />
            <br />
            <SaveButton type={'submit'} disabled={submitting || !valid} />
            <CancelButton onClick={handleClose} />
          </div>
          {showProgressBar && <ProgressBar />}
        </form>
      )}
    />
  )
}
export default injectIntl(DatosBox)
