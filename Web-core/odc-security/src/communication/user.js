import { fetchPostService } from "odc-common";
import { convertTimestampToDate, convertDateToTimestamp } from "odc-common";

export async function getUserProfiles(username) {
  let body = {};
  body.usercode = username;
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_SECURITY_ROOT + "getuserprofiles",
    body
  )
    .then(result => result)
    .catch(error => error);
}

export async function getAllUsers() {
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_SECURITY_ROOT + "getall",
    undefined
  );
}

export async function getAllProfiles() {
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_SECURITY_ROOT + "getallprofiles",
    null
  )
    .then(result => result)
    .catch(error => error);
}

export async function findUser(userCode) {
  // genera un json
  let body = {};
  body.usercode = userCode;

  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_SECURITY_ROOT + "find",
    body
  )
    .then(result => result)
    .catch(error => error);
}

export async function getUser(userCode) {
  // genera un json
  let body = {};
  body.usercode = userCode;

  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_SECURITY_ROOT + "get",
    body
  )
    .then(result => {
      result.data.dateFrom = convertTimestampToDate(result.data.dateFrom);
      result.data.dateUntil = convertTimestampToDate(result.data.dateUntil);
      result.data.dateStartInactivity = convertTimestampToDate(result.data.dateStartInactivity);
      result.data.dateEndInactivity = convertTimestampToDate(result.data.dateEndInactivity);

      let i = 0;
      result.data.userProfile = result.data.userProfile.map(profile => {
        return {
          ...profile,
          id: i++,
          dateFrom: convertTimestampToDate(profile.dateFrom),

          dateUntil: convertTimestampToDate(profile.dateUntil)
        };
      });
      return result;
    })
    .catch(error => error);
}

export async function editUser(user) {
  let body = Object.assign({}, user);
  body.dateFrom = convertDateToTimestamp(user.dateFrom);
  body.dateUntil = convertDateToTimestamp(user.dateUntil);

  body.dateStartInactivity = convertDateToTimestamp(user.dateStartInactivity);
  body.dateEndInactivity = convertDateToTimestamp(user.dateEndInactivity);
  body.userProfile = user.userProfile.map(profile => {
    return {
      ...profile,
      idProfile: profile.idProfile,
      idUser: body.idUser,
      dateFrom: convertDateToTimestamp(profile.dateFrom),
      dateUntil: convertDateToTimestamp(profile.dateUntil),
      idUserProfile: profile.idUserProfile,
      isActive: profile.isActive,
      idOffice: profile.idOffice
    };
  });
  return await fetchPostService(
    "post",
    process.env.REACT_APP_API_SECURITY_ROOT + "edit",
    body
  )
    .then(result => result)
    .catch(error => error);
}

export async function addUser(user) {
  let body = Object.assign({}, user);

  body.dateFrom = convertDateToTimestamp(body.dateFrom);
  body.dateUntil = convertDateToTimestamp(body.dateUntil);

  body.dateStartInactivity = convertDateToTimestamp(body.dateStartInactivity);
  body.dateEndInactivity = convertDateToTimestamp(body.dateEndInactivity);
  body.userProfile = body.userProfile.map(profile => {
    return {
      idProfile: profile.idProfile,
      idUserProfile: profile.idUserProfile,
      isActive: profile.isActive,
      idOffice: profile.idOffice,
      dateFrom: convertDateToTimestamp(profile.dateFrom),
      dateUntil: convertDateToTimestamp(profile.dateUntil),
      ctlgState: "DESC"
    };
  });

  return await fetchPostService(
    "post",
    process.env.REACT_APP_API_SECURITY_ROOT + "add",
    body
  )
    .then(result => result)
    .catch(error => error);
}

export async function unLockUser(userCode) {
  let body = {};
  body.usercode = userCode;

  return fetchPostService(
    "put",
    process.env.REACT_APP_API_SECURITY_ROOT + "unlock",
    body
  );
}

export async function disconnectUser(userCode) {
  let body = {};
  body.usercode = userCode;

  return fetchPostService(
    "put",
    process.env.REACT_APP_API_SECURITY_ROOT + "disconnect",
    body
  );
}

export async function changePassword(payload) {
  let body = payload;
  return fetchPostService(
    "post",
    process.env.REACT_APP_API_SECURITY_ROOT + "ChangePassword",
    body
  );
}
