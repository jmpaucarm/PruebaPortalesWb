import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeCurrentLocationLabel } from "odc-common";
import ContainerSetting from "../../../containers/common/setting";

const Setting = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeCurrentLocationLabel("Componentes básicos"));
  }, [dispatch]);

  return (
    <div className="app-wrapper">
      <ContainerSetting />
    </div>
  );
};
export default Setting;