import { fetchPostService } from "odc-common";

export async function signInWithEmailAndPasswordOwner(username, password) {
  // genera un json
  let body = {};
  body.usercode = username;
  body.password = password;
  body.station = "station";

  return await fetchPostService(
    "post",
    process.env.REACT_APP_API_SECURITY_ROOT + "signin",
    body
  )
    .then(result => result)
    .catch(error => error);
}

export async function signOutOwner(username) {
  // genera un json
  let body = {};
  body.usercode = username;
  return await fetchPostService(
    "put",
    process.env.REACT_APP_API_SECURITY_ROOT + "signout",
    body
  )
    .then(result => result)
    .catch(error => error);
}

export async function changePassword(usercode, password, newpassword) {
  // genera un json
  let body = {};
  body.usercode = usercode;
  body.password = password;
  body.newpassword = newpassword;

  return await fetchPostService(
    "post",
    process.env.REACT_APP_API_SECURITY_ROOT + "changepassword",
    body
  )
    .then(result => result)
    .catch(error => error);
}

export async function connectUser(usercode, office, profile, station) {
  // genera un json
  let body = {};
  body.usercode = usercode;
  body.office = office;
  body.profileCode = profile;
  body.station = "station";

  return await fetchPostService(
    "post",
    process.env.REACT_APP_API_SECURITY_ROOT + "connect",
    body
  )
    .then(result => result)
    .catch(error => error);
}

export async function signInFromPortalComm(dtoLogin) {
  // genera un json
  let body = {};
  body.usercode = dtoLogin.payload.userCode;
  body.password = dtoLogin.payload.password;
  body.station = "station";

  return await fetchPostService(
    "post",
    process.env.REACT_APP_API_SECURITY_ROOT + "signinfromportal",
    body
  )
    .then(result => result)
    .catch(error => error);
}

export async function createUserWithEmailAndPassword() {}