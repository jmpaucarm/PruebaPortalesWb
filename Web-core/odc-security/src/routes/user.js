import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeCurrentLocationLabel } from "odc-common";
import MasterUser from "../containers/user";

const User = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeCurrentLocationLabel("Usuarios100"));
  }, [dispatch]);

  return (
    <div className="app-wrapper">
      <MasterUser />
    </div>
  );
};

export default User;
