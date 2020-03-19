import React from "react";
import { Field } from "react-final-form";
import { GenericGrid, IntlMessages } from "odc-common";

const GridUsers = ({ onSelectionChange }) => {
  return (
    <Field
      name={"users"}
      columns={[
        { name: "firstName", title: <IntlMessages id="user.first.name" /> },
        { name: "secondName", title: <IntlMessages id="user.second.name" /> },
        { name: "lastName1", title: <IntlMessages id="user.last.name1" /> },
        { name: "lastName2", title: <IntlMessages id="user.last.name2" /> },
        { name: "dni", title: <IntlMessages id="core.dni" /> },
        { name: "userCode", title: <IntlMessages id="user.code" /> },
        { name: "isActive", title: <IntlMessages id="user.is.active" /> },
        { name: "ctlgState", title: <IntlMessages id="user.state" /> }
      ]}
      booleanColumns={["isActive"]}
      component={GenericGrid}
      disableAdd
      disableEdit
      defaultCurrentPage={0}
      pageSize={20}
      enableSelection
      onSelectionChange={onSelectionChange}
    />
  );
};

export default GridUsers;
