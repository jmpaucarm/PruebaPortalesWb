import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeCurrentLocationLabel } from "odc-common";
import ContainerProfile from "../../../containers/common/profile";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeCurrentLocationLabel("Perfil"));
  }, [dispatch]);

  return <div className="app-wrapper">{<ContainerProfile />}</div>;
};

export default Profile;
