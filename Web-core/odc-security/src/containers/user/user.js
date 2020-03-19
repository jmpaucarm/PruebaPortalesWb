import React, { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import MenuItem from "@material-ui/core/MenuItem";
import { injectIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { OnChange } from "react-final-form-listeners";

import {
  SaveButton,
  CancelButton,
  ProgressBar,
  IntlMessages,
  GenericGrid,
  WhenFieldChanges
} from "odc-common";
import {
  composeValidators,
  required,
  email,
  minLength,
  maxLength,
  renderTextField,
  renderSelectField,
  renderDateField,
  renderSwitch,
  emptyItem,
  checkDuplicates,
  showMessageAndHide,
  upper,
  cellPhone,
  onlyNumber,
  onlyText,
  onlyTextAndNumbers,
  validateIdVariant
} from "odc-common";

import { getUser, findUser } from "../../communication/user";

const atLeastOneActive = value => {
  return value
    ? Array.isArray(value)
      ? value.some(item => item.isActive)
        ? undefined
        : "Debe tener al menos un perfil activo"
      : undefined
    : "Debe tener al menos un perfil activo";
};

const User = ({
  flagEdit,
  userCode,
  onSubmit,
  handleClose,
  intl,
  institutions,
  catalogs,
  profiles,
  offices
}) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [officesInstitution, setOfficesInstitution] = useState([]);
  const [identificationType, setIdentificationType] = useState(undefined);
  const [flagStateInactivity, setFlagStateInactivity] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowProgressBar(true);
        const coreResponse = await getUser(userCode);
        if (coreResponse.state) {
          setUser(coreResponse.data);
        } else setUser({});
        setShowProgressBar(false);
      } catch (error) {
        setError(error);
        setShowProgressBar(false);
      }
    };

    if (flagEdit) fetchData();
  }, [userCode, flagEdit]);

  return (
    <Form
      initialValues={flagEdit ? user : { isActive: true }}
      onSubmit={onSubmit}
      subscription={{ valid: true, submitting: true }}
      validate={values => {
        const errors = {};

        if (validateIdVariant(values.dni, values.identificationType))
          errors["dni"] = "Identificación incorrecta";

        if (values.inactivityType !== "NINGUNA") {
          if (
            Date.parse(values.dateStartInactivity) >
            Date.parse(values.dateEndInactivity)
          )
            errors["dateStartInactivity"] =
              "Fecha inicial debe ser menor que fecha final";
        }
        return errors;
      }}
      render={({ handleSubmit, submitting, valid }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                <Field
                  name="lastName1"
                  label={<IntlMessages id="user.last.name1" />}
                  validate={composeValidators(
                    required,
                    minLength(3),
                    maxLength(15)
                  )}
                  disabled={flagEdit}
                  component={renderTextField}
                  subscription={{ value: true, error: true, touched: true }}
                  parse={onlyText}
                />
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                <Field
                  name="lastName2"
                  label={<IntlMessages id="user.last.name2" />}
                  validate={composeValidators(
                    required,
                    minLength(3),
                    maxLength(15)
                  )}
                  disabled={flagEdit}
                  component={renderTextField}
                  subscription={{ value: true, error: true, touched: true }}
                  parse={onlyText}
                />
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                <Field
                  name="firstName"
                  label={<IntlMessages id="user.first.name" />}
                  validate={composeValidators(
                    required,
                    minLength(3),
                    maxLength(15)
                  )}
                  disabled={flagEdit}
                  component={renderTextField}
                  subscription={{ value: true, error: true, touched: true }}
                  parse={onlyText}
                />
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                <Field
                  name="secondName"
                  label={<IntlMessages id="user.second.name" />}
                  validate={composeValidators(
                    required,
                    minLength(3),
                    maxLength(15)
                  )}
                  component={renderTextField}
                  subscription={{ value: true, error: true, touched: true }}
                  parse={onlyText}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                <Field
                  name="identificationType"
                  label={intl.formatMessage({ id: "core.identification.type" })}
                  component={renderSelectField}
                  subscription={{ value: true, error: true, touched: true }}
                  validate={required}
                  disabled={flagEdit}
                >
                  {emptyItem
                    .concat(catalogs["IdentificationType"])
                    .map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.code}>
                          {item.description}
                        </MenuItem>
                      );
                    })}
                </Field>
                <OnChange name="identificationType">
                  {(value, previous) => {
                    if (previous) setIdentificationType(value);
                  }}
                </OnChange>
                {!flagEdit && (
                  <WhenFieldChanges
                    field="identificationType"
                    set="dni"
                    to={null}
                  />
                )}
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                <Field
                  name="dni"
                  label={<IntlMessages id="core.dni" />}
                  validate={required}
                  component={renderTextField}
                  subscription={{ value: true, error: true, touched: true }}
                  disabled={flagEdit}
                />
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                <Field
                  name="email"
                  label={<IntlMessages id="core.mail" />}
                  validate={composeValidators(required, email)}
                  component={renderTextField}
                  subscription={{ value: true, error: true, touched: true }}
                  parse={upper}
                />
              </div>

              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                <Field
                  name="cellPhone"
                  label={<IntlMessages id="core.cell.phone" />}
                  validate={composeValidators(
                    required,
                    minLength(5),
                    maxLength(15)
                  )}
                  disabled={flagEdit}
                  component={renderTextField}
                  subscription={{ value: true, error: true, touched: true }}
                  parse={cellPhone}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                <Field
                  name="userCode"
                  label={<IntlMessages id="user.code" />}
                  validate={composeValidators(
                    required,
                    minLength(5),
                    maxLength(15),
                    async value => {
                      if (!flagEdit) {
                        let result = await findUser(value);

                        if (result.state) {
                          return result.data
                            ? "Código de usuario ya existe. Ingrese otro valor"
                            : undefined;
                        } else return undefined;
                      }
                    }
                  )}
                  disabled={flagEdit}
                  component={renderTextField}
                  subscription={{ value: true, error: true, touched: true }}
                  parse={onlyTextAndNumbers}
                />
              </div>

              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                <Field
                  name="idInstitution"
                  label={<IntlMessages id="user.institucion" />}
                  component={renderSelectField}
                  subscription={{ value: true, error: true, touched: true }}
                  validate={required}
                >
                  {emptyItem.concat(institutions).map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.idInstitution}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Field>
                <OnChange name="idInstitution">
                  {(value, previous) => {
                    let data_filter = institutions.filter(
                      x => x.idInstitution === parseInt(value)
                    );
                    data_filter = data_filter
                      ? data_filter[0]
                        ? data_filter[0].office
                        : []
                      : [];

                    setOfficesInstitution(data_filter);
                  }}
                </OnChange>
              </div>

              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                <Field
                  name="dateFrom"
                  label={intl.formatMessage({ id: "user.date.from" })}
                  disabled={flagEdit}
                  component={renderDateField}
                  subscription={{ value: true, error: true, touched: true }}
                  validate={required}
                />
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                <Field
                  name="dateUntil"
                  label={intl.formatMessage({ id: "user.date.until" })}
                  component={renderDateField}
                  subscription={{ value: true, error: true, touched: true }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                <Field
                  name="inactivityType"
                  label={<IntlMessages id="user.inactivity.type" />}
                  component={renderSelectField}
                  subscription={{ value: true, error: true, touched: true }}
                  validate={required}
                >
                  {emptyItem
                    .concat(catalogs["InactivityType"])
                    .map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.code}>
                          {item.description}
                        </MenuItem>
                      );
                    })}
                </Field>
                <OnChange name="inactivityType">
                  {(value, previous) => {
                    if (value === "NINGUNA") {
                      setFlagStateInactivity(true);
                    } else setFlagStateInactivity(false);
                  }}
                </OnChange>
                <WhenFieldChanges
                  field="inactivityType"
                  becomes={"NINGUNA"}
                  set="dateStartInactivity"
                  to={null}
                />
                <WhenFieldChanges
                  field="inactivityType"
                  becomes={"NINGUNA"}
                  set="dateEndInactivity"
                  to={null}
                />
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                <Field
                  name="dateStartInactivity"
                  label={intl.formatMessage({
                    id: "user.date.start.inactivity"
                  })}
                  component={renderDateField}
                  subscription={{ value: true, error: true, touched: true }}
                  validate={!flagStateInactivity ? required : undefined}
                />
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                <Field
                  name="dateEndInactivity"
                  label={intl.formatMessage({ id: "user.date.end.inactivity" })}
                  component={renderDateField}
                  subscription={{ value: true, error: true, touched: true }}
                  validate={!flagStateInactivity ? required : undefined}
                />
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                <Field
                  type="checkbox"
                  name="isActive"
                  label={<IntlMessages id="user.is.active" />}
                  disabled={!flagEdit}
                  component={renderSwitch}
                />
              </div>
            </div>
            <div>
              <Field
                name={"userProfile"}
                columns={[
                  {
                    name: "idProfile",
                    title: <IntlMessages id="user.profile.idprofile" />
                  },
                  {
                    name: "idOffice",
                    title: <IntlMessages id="user.profile.idoffice" />
                  },
                  {
                    name: "dateFrom",
                    title: <IntlMessages id="user.profile.datefrom" />
                  },
                  {
                    name: "dateUntil",
                    title: <IntlMessages id="user.profile.dateuntil" />
                  },
                  {
                    name: "isActive",
                    title: <IntlMessages id="user.profile.isactive" />
                  }
                ]}
                dateColumns={["dateFrom", "dateUntil"]}
                selectColumns={["idProfile", "idOffice"]}
                booleanColumns={["isActive"]}
                component={GenericGrid}
                catalogs={{
                  idProfile: profiles.map(item => {
                    return {
                      key: item.idProfile,
                      value: item.idProfile,
                      name: item.name
                    };
                  }),
                  idOffice: offices.map(item => {
                    return {
                      key: item.idOffice,
                      value: item.idOffice,
                      name: item.name
                    };
                  })
                }}
                emptyItem={{
                  idUserProfile: 0,
                  idProfile: 0,
                  idOffice: 0,
                  dateFrom: undefined,
                  dateUntil: undefined,
                  isActive: true
                }}
                gridValidate={row => {
                  const errors = {};

                  if (!row.idProfile) errors.idProfile = " ";

                  if (!row.idOffice) errors.idOffice = " ";

                  if (!row.dateFrom) errors.dateFrom = " ";

                  return errors;
                }}
                commitValidate={rows => {
                  const isValid = checkDuplicates(
                    rows.map(row => row.idProfile + "-" + row.idOffice)
                  );

                  if (isValid)
                    dispatch(showMessageAndHide("Error, perfil duplicado"));
                  return isValid;
                }}
                validate={atLeastOneActive}
                errorMessage={"Debe tener al menos un perfil activo"}
              />
            </div>
            <br />
            <br />
            <SaveButton type={"submit"} disabled={submitting || !valid} />
            <CancelButton onClick={handleClose} />
          </div>
          {showProgressBar && <ProgressBar />}
        </form>
      )}
    />
  );
};

export default injectIntl(User);
