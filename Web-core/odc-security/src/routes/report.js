import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Iframe from "react-iframe";
import { changeCurrentLocationLabel } from "odc-common";

const reportName = "GETALLUSERS";

const Report = () => {
  const { fullName, date, institution, office } = useSelector(
    state => state.auth.authUser
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeCurrentLocationLabel("Reporte"));
  }, [dispatch]);

  const url =
    process.env.REACT_APP_API_REPORT_ROOT +
    "report?report=" +
    reportName +
    "&user=" +
    fullName +
    "&institution=" +
    institution +
    "&date=" +
    date +
    "&office=" +
    office;

  return (
    <div className="app-wrapper">
      <Iframe url={url} width="100%" height="680px" />
    </div>
  );
};

export default Report;
