import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeCurrentLocationLabel } from "odc-common";
import MasterProfile from "../containers/profile";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeCurrentLocationLabel("Perfiles"));
  }, [dispatch]);

  return (
    <div className="app-wrapper">
      <MasterProfile />
    </div>
  );
};

export default Profile;
