import { fetchPostService } from "odc-common";
import {
  convertTimestampToDate,
  convertDateToTimestamp
} from "odc-common";


export async function getAllProfiles() {
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_SECURITY_ROOT + "getallprofiles",
    null
  )
    .then(result => result)
    .catch(error => error);
}
export async function findProfile(profileCode, idInstitution) {
  let body = {};
  body.code = profileCode;

  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_SECURITY_ROOT + "findprofilebycode",
    body
  )
    .then(result => result)
    .catch(error => error);
}

export async function getProfileById(id) {
  let body = {};
  body.id = id;
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_SECURITY_ROOT + "getprofilebyid",
    body
  )
    .then(result => {
      result.data = {
        ...result.data,
        dateValidity: convertTimestampToDate(result.data.dateValidity)
      };
      return result;
    })
    .catch(error => error);
}
export async function addProfile(profile) {
  let body = Object.assign({}, profile);
  body = {
    ...body,
    dateValidity: convertDateToTimestamp(body.dateValidity),
    idInstitution: parseInt(profile.idInstitution)
  };
  return await fetchPostService("post", process.env.REACT_APP_API_SECURITY_ROOT + "addprofile", body)
    .then(result => result)
    .catch(error => error);
}

export async function editProfile(profile) {
  let body = Object.assign({}, profile);

  body = {
    ...body,
    dateValidity: convertDateToTimestamp(profile.dateValidity)
  };

  return await fetchPostService("post", process.env.REACT_APP_API_SECURITY_ROOT + "editprofile", body)
    .then(result => result)
    .catch(error => error);
}
