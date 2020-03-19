import React from "react";
import { Field } from "react-final-form";
import {
  required,
  minLength,
  maxLength,
  upper,
  renderTextField,
  renderDateField,
  composeValidators,
  range
} from "odc-common";

import { WFGeoLocation } from "odc-configuration";
import { Acordeon } from "odc-common";

const SeccionDos = ({ prefix, enableTest }) => {
  const keys3 = [...range(101, 150)];

  return (
    <>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <Field
            type={"date"}
            name={`${prefix}.fechaActivacion`}
            label="Fecha de Activación"
            component={renderDateField}
            validate={required}
            subscription={{ value: true, error: true, touched: true }}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <WFGeoLocation prefix={prefix} maxGeographicLocation={4} disabled={true} />
      </div>
      <br />
      {enableTest && (
        <Acordeon
          id={"datosPrueba3"}
          titulo={"Datos Prueba III"}
          detalle={
            <>
              <div className="row">
                {keys3.map(key => (
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

export default SeccionDos;
