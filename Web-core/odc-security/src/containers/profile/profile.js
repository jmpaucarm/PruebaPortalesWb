import React, { Fragment } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import ReactPlaceholder from 'react-placeholder';
import {
  TextBox,
  Switch,
  ComboBox,
  Date,
  IntlMessages,
  SaveButton,
  CancelButton,
  ProgressBar
} from "odc-common";

import {
  required,
  maxLength16,
  maxLength32,
  maxLength128,
  minLength5
} from "odc-common";

import { showMessageAndHide } from "odc-common";
import { asyncValidate } from "./asyncValidate";

import GridProfileOptions from "../../components/profile/GridProfileOptions";
import { updateProfileOptions } from "../../actions/profile";

const formName = "ProfileForm";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      institutions: [],
      tabOptions: []
    };
  }

  componentDidMount() {
    if (!this.props.flagEdit) this.props.change("isActive", true);

    this.setState({
      institutions: this.props.dataInstitutions,
      tabOptions: this.props.dataOptions,
      officesinstitution: []
    });
  }

  handleChangeInstitution = event => {
    let data = this.state.institutions;
    let data_filter = data.filter(
      x => x.idInstitution === parseInt(event.target.value)
    );
    data_filter = data_filter
      ? data_filter[0]
        ? data_filter[0].office
        : []
      : [];
    this.setState({
      officesinstitution: data_filter
    });
  };

  handleChangeRows = options => {
    let temp = options.map((item, index) => {
      return {
        idOption: item.idOption,
        idProfile: item.idProfile,
        idProfileOption: item.idProfileOption,
        isActive: item.isActive,
        isFavorite: item.isFavorite
      };
    });

    const { updateProfileOptions, touch } = this.props;
    touch(formName);
    updateProfileOptions(temp);
  };

  render() {
    const {
      showProgressBar,
      handleSubmit,
      submitting,
      handleClose,
      flagEdit,
      options,
      intl,
      idProfile,
      profileOption,
      showMessageAndHide,
      valid,
      anyTouched
    } = this.props;

    const { institutions } = this.state;

    const loading = (!flagEdit || profileOption.length) !== 0;
    const atLeastOneActive = profileOption.some(item => item.isActive);
    const isValid = valid && atLeastOneActive;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-4">
              <ComboBox
                name="idInstitution"
                label={<IntlMessages id="user.institucion" />}
                onChange={this.handleChangeInstitution}
                disabled={flagEdit}
                isRequired
                elements={institutions.map(item => {
                  return { code: item.idInstitution, description: item.name };
                })}
              />
            </div>

            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-4">
              <TextBox
                name="profileCode"
                label={<IntlMessages id="user.profile.profileCode" />}
                validate={[required, minLength5, maxLength32]}
                disabled={flagEdit}
              />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-4">
              <TextBox
                name="name"
                label={<IntlMessages id="user.profile.name" />}
                validate={[required, minLength5, maxLength128]}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-4">
              <TextBox
                name="channel"
                label={<IntlMessages id="user.profile.channel" />}
                validate={[required, minLength5, maxLength16]}
              />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-4">
              <Date
                name="dateValidity"
                label={intl.formatMessage({ id: "user.profile.datefrom" })}
                isRequired
              />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-4">
              <Switch
                name="isGeneral"
                label={<IntlMessages id="user.profile.isgeneral" />}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-4">
              <Switch
                name="isActive"
                label={<IntlMessages id="user.profile.isactive" />}
                disabled={!flagEdit}
              />
            </div>
          </div>
          <br />
          {!atLeastOneActive && (
            <Fragment>{"Debe tener al menos una opción activa"}</Fragment>
          )}
          <br />
          <br />
          <ReactPlaceholder type="media" rows={10} ready={loading}>
            <GridProfileOptions
              rows={profileOption}
              handleChangeRows={this.handleChangeRows}
              options={options}
              idProfile={idProfile}
              showMessageAndHide={showMessageAndHide}
            />
          </ReactPlaceholder>
          <br />
          <SaveButton disabled={submitting || !(isValid && anyTouched)} />
          <CancelButton onClick={handleClose} />
        </div>
        {showProgressBar && <ProgressBar />}
      </form>
    );
  }
}

Profile = reduxForm({
  form: formName,
  asyncValidate,
  asyncBlurFields: ["profileCode", "idInstitution"],
  initialValues: { isActive: false, isGeneral: false }
})(Profile);

const mapStateToProps = ({ security, configuration, form }) => {
  const dataInstitutions = configuration.institution.rows;
  const { showProgressBar, options } = security.profile;

  const profileOption =
    form[formName] &&
    form[formName].values &&
    form[formName].values.profileOption
      ? form[formName].values.profileOption
      : [];

  const idProfile = profileOption.length ? form[formName].values.idProfile : 0;
  return {
    showProgressBar,
    dataInstitutions,
    options,
    idProfile,
    profileOption
  };
};

Profile = connect(
  mapStateToProps,
  { showMessageAndHide, updateProfileOptions }
)(Profile);

export default injectIntl(Profile);
