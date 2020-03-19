import React from "react";
import { Field } from "react-final-form";
import {
  required,
  upper,
  minLength,
  maxLength,
  renderTextField,
  composeValidators,
  range
} from "odc-common";

import GridActividadEconomica from "../GridActividadEconomica";
import GridReferenciasPersonales from "../GridReferenciasPersonales";

import { Acordeon } from "odc-common";

const SeccionTres = ({ prefix, enableTest }) => {
  const keys4 = [...range(151, 250)];

  return (
    <>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <Field
            name={`${prefix}.Comentario`}
            label="Comentario Nombre"
            validate={composeValidators(required, minLength(5), maxLength(32))}
            parse={upper}
            component={renderTextField}
            subscription={{ value: true, error: true, touched: true }}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <GridActividadEconomica prefix={prefix} />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <GridReferenciasPersonales prefix={prefix} />
        </div>
      </div>
      <br />
      {enableTest && (
        <Acordeon
          id={"datosPrueba4"}
          titulo={"Datos Prueba IV"}
          detalle={
            <>
              <div className="row">
                {keys4.map(key => (
                  <div
                    key={key}
                    className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3"
                  >
                    <Field
                      name={`field${key}`}
                      label={`field${key}`}
                      validate={composeValidators(
                        required,
                        minLength(5),
                        maxLength(32)
                      )}
                      parse={upper}
                      component={renderTextField}
                      subscription={{ value: true, error: true, touched: true }}
                    />
                  </div>
                ))}
              </div>
            </>
          }
        />
      )}
    </>
  );
};

export default SeccionTres;
