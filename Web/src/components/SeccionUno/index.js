import React from "react";
import { useDispatch } from "react-redux";
import { Field } from "react-final-form";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { Acordeon } from "odc-common";
import { showErrorMessage } from "odc-common";

import {
  required,
  minLength,
  maxLength,
  email,
  upper,
  emptyItem,
  renderTextField,
  renderMultiSelectField,
  composeValidators
} from "odc-common";

const SeccionUno = ({ prefix, catalogos, parametros, form, enableTest }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Acordeon
        id={"datosGenerales"}
        titulo={"Datos Generales"}
        listaNombres={["Test", "Otro"]}
        prefijo={prefix}
        desactivado={false}
        esValido={false}
        detalle={
          <>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
                <Button
                  onClick={() =>
                    dispatch(
                      showErrorMessage("c92bfe6b-bd9e-4ff8-947a-7b0b0038c52f")
                    )
                  }
                  variant="contained"
                  color={"default"}
                >
                  Test
                </Button>
                <Field
                  name={`${prefix}.Otro.PrimerNombre`}
                  initialValue={"asdasd"}
                  label="Code Type Image"
                  disabled={!parametros["PrimerNombre"].esHabilitado}
                  validate={composeValidators(
                    parametros["PrimerNombre"].esObligatorio
                      ? required
                      : () => undefined,
                    minLength(5),
                    maxLength(32)
                  )}
                  parse={upper}
                  component={renderTextField}
                  subscription={{ value: true, error: true, touched: true }}
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
                <Field
                  name={`${prefix}.Test.PrimerApellido`}
                  label="Primer Apellido"
                  disabled={!parametros["PrimerApellido"].esHabilitado}
                  validate={composeValidators(
                    parametros["PrimerApellido"].esObligatorio
                      ? required
                      : () => undefined,
                    minLength(5),
                    maxLength(32)
                  )}
                  parse={upper}
                  component={renderTextField}
                  subscription={{ value: true, error: true, touched: true }}
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
                <Field
                  name={`${prefix}.Test.Email`}
                  label="Correo Electrónico"
                  validate={composeValidators(
                    required,
                    email,
                    minLength(5),
                    maxLength(60)
                  )}
                  parse={upper}
                  component={renderTextField}
                  subscription={{ value: true, error: true, touched: true }}
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
                <Field
                  name={`${prefix}.Test.NivelInstruccion`}
                  label={"Nivel Instrucción"}
                  disabled={!parametros["NivelInstruccion"].esHabilitado}
                  validate={required}
                  component={renderMultiSelectField}
                  subscription={{ value: true, error: true, touched: true }}
                >
                  {emptyItem
                    .concat(catalogos["NivelInstruccionCli"])
                    .map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.code}>
                          {item.description}
                        </MenuItem>
                      );
                    })}
                </Field>
              </div>
              <br />
            </div>
          </>
        }
      />
      <Acordeon
        id={"ubicabilidad"}
        titulo={"Ubicabilidad"}
        listaNombres={["Test1"]}
        prefijo={prefix}
        desactivado={false}
        esValido={false}
        detalle={
          <>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
                <Button
                  onClick={() =>
                    dispatch(
                      showErrorMessage("c92bfe6b-bd9e-4ff8-947a-7b0b0038c52f")
                    )
                  }
                  variant="contained"
                  color={"default"}
                >
                  Test
                </Button>
                <Field
                  name={`${prefix}.Test1.PrimerNombre`}
                  initialValue={"asdasd"}
                  label="Code Type Image"
                  disabled={!parametros["PrimerNombre"].esHabilitado}
                  validate={composeValidators(
                    parametros["PrimerNombre"].esObligatorio
                      ? required
                      : () => undefined,
                    minLength(5),
                    maxLength(32)
                  )}
                  parse={upper}
                  component={renderTextField}
                  subscription={{ value: true, error: true, touched: true }}
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
                <Field
                  name={`${prefix}.Test1.PrimerApellido`}
                  label="Primer Apellido"
                  disabled={!parametros["PrimerApellido"].esHabilitado}
                  validate={composeValidators(
                    parametros["PrimerApellido"].esObligatorio
                      ? required
                      : () => undefined,
                    minLength(5),
                    maxLength(32)
                  )}
                  parse={upper}
                  component={renderTextField}
                  subscription={{ value: true, error: true, touched: true }}
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
                <Field
                  name={`${prefix}.Test1.Email`}
                  label="Correo Electrónico"
                  validate={composeValidators(
                    required,
                    email,
                    minLength(5),
                    maxLength(60)
                  )}
                  parse={upper}
                  component={renderTextField}
                  subscription={{ value: true, error: true, touched: true }}
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
                <Field
                  name={`${prefix}.Test1.NivelInstruccion`}
                  label={"Nivel Instrucción"}
                  disabled={!parametros["NivelInstruccion"].esHabilitado}
                  validate={required}
                  component={renderMultiSelectField}
                  subscription={{ value: true, error: true, touched: true }}
                >
                  {emptyItem
                    .concat(catalogos["NivelInstruccionCli"])
                    .map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.code}>
                          {item.description}
                        </MenuItem>
                      );
                    })}
                </Field>
              </div>
              <br />
            </div>
          </>
        }
      />
    </>
  );
};

export default SeccionUno;
