import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeCurrentLocationLabel } from "odc-common";
import MasterMenu from "../containers/menu";

const Menu = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeCurrentLocationLabel("Menú"));
  }, [dispatch]);

  return (
    <div className="app-wrapper">
      <MasterMenu />
    </div>
  );
};

export default Menu;
