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
    GenericGrid
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

import { getbyid } from '../communication/FolderComunication'




const FolderForm = ({
    selectedFolder,
    setSelectedFolder,
    flagEdit,    
    handleClose,
    onSubmit,
}) => {
    const dispatch = useDispatch()
    const [folder, setFolder] = useState({})
    const [showProgressBar, setShowProgressBar] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setShowProgressBar(true)
                const coreResponse = await getbyid(setSelectedFolder.id) // institucion quemnada ??? o mejor cambiar en algun property?
                if (coreResponse.state) {
                    settypeBox(coreResponse.data)
                } else settypeBox({})
                setShowProgressBar(false)
            } catch (error) {
                setError(error)
                setShowProgressBar(false)
            }
        }
        if (flagEdit) fetchData()
    }, [typeBoxCode, flagEdit])

    return (
        <Form
            initialValues={flagEdit ? typeBox : { isActive: true }}
            onSubmit={onSubmit}
            subscription={{ valid: true, submitting: true }}
            render={({ handleSubmit, submitting, valid }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className='row'>
                            <div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3'>
                                
                                <Field
                                    name='CodeTypeFolder'
                                    label={<IntlMessages id='Folder.codeTypeFolder' />}
                                    validate={composeValidators(
                                        required,
                                        minLength(3),
                                        maxLength(32)
                                    )}
                                    component={renderTextField}
                                    subscription={{ value: true, error: true, touched: true }}
                                />
                            </div>
                            <div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3'>
                                
                                <Field
                                    name='institution'
                                    label={<IntlMessages id='Folder.institution' />}
                       
                                    component={renderTextField}
                                    subscription={{ value: true, error: true, touched: true }}
                                />
                                
                            </div>

                            <div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3'>
                                
                                <Field
                                    name='Description'
                                    label={<IntlMessages id='Folder.description' />}
                              
                                    component={renderTextField}
                                    subscription={{ value: true, error: true, touched: true }}
                                />
                                
                            </div>

                            <div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3'>
                                
                                <Field
                                    name='Path'
                                    label={<IntlMessages id='Folder.path' />}
                              
                                    component={renderTextField}
                                    subscription={{ value: true, error: true, touched: true }}
                                />
                                
                            </div>

                            <div className='col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3'>
                                
                                <Field
                                    name='IsActive'
                                    label={<IntlMessages id='Folder.isActive' />}
                                    component={renderSwitch}
                                    subscription={{ value: true, error: true, touched: true }}
                                />
                                
                            </div>

                           
                        </div>
               
                        <SaveButton type={'submit'} disabled={submitting || !valid} />
                        <CancelButton onClick={handleClose} />
                    </div>
                    {/* {showProgressBar && <ProgressBar />} */}
                </form>
            )}
        />
    )
}
export default injectIntl(FolderForm)
