import React from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { commonStyles } from "odc-common";
import { ProgressBar, NewButton, EditButton } from "odc-common";
import GridProfiles from "../../components/profile/GridProfiles";
import Popup from "../../components/profile/popup";
import { catalogActions, institutionActions } from "odc-configuration";
import { getAllProfiles } from "../../actions/profile";

import {
  getProfileById,
  addProfile,
  editProfile,
  showLoader,
  showWindow,
  hideWindow
} from "../../actions/profile";

import { getAllOptions } from "../../actions/menu";

const PopupWrapped = withStyles(commonStyles)(Popup);

const { getAllInstitutions } = institutionActions;
const { findCatalogs } = catalogActions;

class MasterProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flagEdit: false,
      flagUnLock: false,
      flagDisconnect: false,
      selection: [],
      index: -1,
      profileId: 0,
      offices: [],
      idInstitution: 0
    };

    this.handleClickNew = this.handleClickNew.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }

  changeSelection = selection => {
    if (selection[0] !== undefined) {
      let index = selection[selection.length - 1];

      const offices = this.props.dataInstitutions.filter(
        x => x.idInstitution === 1 //pendiente
      );

      this.setState({
        selection: [index],
        index: index,
        profileId: this.props.rows[index].idProfile,
        idInstitution: this.props.rows[index].idInstitution,
        offices: offices[0].office
      });
    } else {
      this.setState({
        selection: [],
        index: -1,
        profileId: 0,
        idInstitution: 0,
        offices: []
      });
    }
  };
  // Abre la ventana flotante
  handleClickOpen = () => {
    this.props.showWindow();
  };

  // cierra la ventana flotante
  handleClose = () => {
    this.props.hideWindow();
    this.setState({
      flagEdit: false
    });
  };

  //evento del boton nuevo
  handleClickNew = () => {
    this.props.showWindow();
  };
  //evento del boton editar
  handleClickEdit = () => {
    this.setState({
      flagEdit: true
    });

    const { profileId } = this.state;
    this.props.getProfileById(profileId);
    this.props.showWindow();
  };

  // acción de grabar edición y nuevo
  handleSubmit = values => {
    const { flagEdit } = this.state;
    const { showLoader, editProfile, addProfile } = this.props;

    showLoader();
    if (flagEdit) {
      editProfile({ payload: values, index: this.state.index });
    } else {
      addProfile(values);
    }
  };

  componentDidMount() {
    this.props.getAllProfiles();
    this.props.getAllInstitutions();
    this.props.getAllOptions();
  }

  render() {
    const { showProgressBar, openWindow } = this.props;
    const { selection } = this.state;
    return (
      <Paper style={{ position: "relative" }}>
        <div>
          <NewButton onClick={this.handleClickNew} />
          <EditButton
            disabled={selection.length === 0}
            onClick={this.handleClickEdit}
          />
          <GridProfiles
            selection={selection}
            changeSelection={this.changeSelection}
          />
          <PopupWrapped
            open={openWindow}
            onClose={this.handleClose}
            flagEdit={this.state.flagEdit}
            handleSubmit={this.handleSubmit}
            showProgressBar={showProgressBar}
            title={"Administación de perfiles"}
            size={"xl"}

            offices={this.state.offices}

          />
          {showProgressBar && <ProgressBar />}
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = ({ security, configuration, auth }) => {
  const { showProgressBar, rows, openWindow } = security.profile;
  const dataInstitutions = configuration.institution.rows;
  const { fullName, date, institution, office } = auth.authUser;

  return {
    showProgressBar,
    dataInstitutions,
    rows,
    openWindow,
    fullName,
    date,
    institution,
    office
  };
};

MasterProfile = connect(
  mapStateToProps,
  {
    showLoader,
    getProfileById,
    addProfile,
    editProfile,
    getAllProfiles,
    getAllInstitutions,
    findCatalogs,
    showWindow,
    hideWindow,
    getAllOptions
  }
)(MasterProfile);

export default MasterProfile;
