import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";
import Paper from "@material-ui/core/Paper";
import { ProgressBar, NewButton, EditButton } from "odc-common";
import { UnLockButton, DisconnectButton } from "../../components/user/buttons";
import ComputerIcon from "@material-ui/icons/Computer";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { commonStyles } from "odc-common";
import GridUsers from "../../components/user/GridUsers";
import Popup from "../../components/user/popup";
import { useCatalogs } from "odc-configuration";
import useUsers from "../../hooks/useUsers";

import { institutionActions } from "odc-configuration";
const { getAllInstitutions } = institutionActions;

import { getAllProfiles } from "../../actions/profile";

import {
  findUser,
  addUser,
  editUser,
  unLockUser,
  disconnectUser
} from "../../communication/user";

import { showMessageAndHide, insertItem, updateItem } from "odc-common";

const MasterUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllInstitutions());
    dispatch(getAllProfiles());
  }, []);

  const { catalogs, isLoadingCatalogs } = useCatalogs(
    ["IdentificationType", "InactivityType"].join(",")
  );

  const { users, setUsers, isLoadingUsers, error } = useUsers();

  const [selection, setSelection] = useState([]);

  const [flagEdit, setFlagEdit] = useState(false);
  const [flagUnlock, setFlagUnlock] = useState(false);
  const [flagDisconnect, setFlagDisconnect] = useState(false);

  const [openWindow, setOpenWindow] = useState(false);

  const [selectedUserCode, setSelectedUserCode] = useState(undefined);
  const [selectedIndex, setSelectedIndex] = useState(undefined);

  const handleClickNew = () => {
    setFlagEdit(false);
    setOpenWindow(true);
  };

  const handleClickEdit = () => {
    setFlagEdit(true);
    setOpenWindow(true);
  };

  const handleClickUnlock = async () => {
    await unLockUser(selectedUserCode);

    setUsers(
      updateItem(users, {
        index: selectedIndex,
        item: { ...selection, ctlgState: "DESC" }
      })
    );
    dispatch(showMessageAndHide("Transacción Ok"));
    setFlagUnlock(false);
  };

  const handleClickDisconnect = async () => {
    await disconnectUser(selectedUserCode);

    setUsers(
      updateItem(users, {
        index: selectedIndex,
        item: { ...selection, ctlgState: "DESC" }
      })
    );
    dispatch(showMessageAndHide("Transacción Ok"));
    setFlagUnlock(false);
  };

  const handlePopUpSubmit = async values => {
    if (flagEdit) {
      const result = await editUser(values);
      if (result.state) {
        setUsers(
          updateItem(users, {
            index: selectedIndex,
            item: values
          })
        );
        setOpenWindow(false);
        dispatch(showMessageAndHide("Transacción Ok"));
      } else {
        dispatch(showMessageAndHide("Error: " + result.message));
      }
    } else {
      const result = await addUser(values);
      if (result.state) {
        setUsers(
          insertItem(users, {
            index: users.length,
            item: { ...values, ctlgState: "DESC" }
          })
        );
        setOpenWindow(false);
        dispatch(showMessageAndHide("Transacción Ok"));
      } else {
        dispatch(showMessageAndHide("Error: " + result.message));
      }
    }
  };

  const handleClose = () => {
    setOpenWindow(false);
  };

  const handleSelection = value => {
    if (value.length > 0) {
      setSelectedIndex(value[0].id);
      setSelectedUserCode(value[0].userCode);
      setFlagUnlock(value[0].ctlgState === "BLOQ");
      setFlagDisconnect(value[0].ctlgState === "CON");
    } else {
      setSelectedIndex(undefined);
      setSelectedUserCode(undefined);
      setFlagUnlock(false);
      setFlagDisconnect(false);
    }

    setSelection(value);
  };

  const { fullName, institution, date, office } = useSelector(
    state => state.auth.authUser
  );

  const institutions = useSelector(
    state => state.configuration.institution.rows
  );

  const profiles = useSelector(state => state.security.profile.rows);

  const officesTmp = institutions.filter(x => x.idInstitution === 1); //pendiente

  const offices = officesTmp[0] ? officesTmp[0].office : [];

  const reportName = "GETALLUSERS";

  const reportUrl =
    process.env.REACT_APP_API_REPORT_ROOT +
    "api/pdf/generate?report=" +
    reportName +
    "&user=" +
    fullName +
    "&institution=" +
    institution +
    "&date=" +
    date +
    "&office=" +
    office;

  const PopupWrapped = withStyles(commonStyles)(Popup);

  //if (isLoadingCatalogs || isLoadingUsers) return <Fragment>Cargando Catálogos...</Fragment>;
  if (isLoadingCatalogs ) return <Fragment>Cargando Catálogos...</Fragment>;

  return (
    <Paper style={{ position: "relative" }}>
      <div>
        <NewButton onClick={handleClickNew} />
        <EditButton
          disabled={selection.length === 0}
          onClick={handleClickEdit}
        />
        <DisconnectButton
          disabled={!flagDisconnect}
          onClick={handleClickDisconnect}
        />
        <UnLockButton disabled={!flagUnlock} onClick={handleClickUnlock} />
        <a href={reportUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="contained" color="default">
            <ComputerIcon /> Reporte
          </Button>
        </a>
        <Form
          initialValues={{
            users: users
          }}
          onSubmit={() => {}}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <GridUsers onSelectionChange={handleSelection} />
              {isLoadingUsers && <ProgressBar />}
            </form>
          )}
        />
        {offices.length > 0 && (
          <PopupWrapped
            open={openWindow}
            onClose={handleClose}
            flagEdit={flagEdit}
            handlePopUpSubmit={handlePopUpSubmit}
            title={"Administación de usuarios"}
            size={"xl"}
            offices={offices}
            userCode={selectedUserCode}
            institutions={institutions}
            profiles={profiles}
            catalogs={catalogs}
          />
        )}
      </div>
    </Paper>
  );
};

export default MasterUser;
