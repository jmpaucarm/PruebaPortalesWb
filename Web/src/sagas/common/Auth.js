import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { workflowActions } from "odc-workflow";

import {
  userSignInSuccess,
  userSignOutSuccess,
  userSignUpSuccess,
  hideAuthLoader,
  getUserSessionSuccess,
  getBasicDate
} from "odc-common";

import {
  signInWithEmailAndPasswordOwner,
  signOutOwner,
  connectUser,
  createUserWithEmailAndPassword,
  signInFromPortalComm
} from "../../communication/auth";

import {
  SIGNIN_USER,
  SIGNOUT_USER,
  SIGNUP_USER,
  GET_USER_SESION,
  SIGNIN_FROM_PORTAL
} from "odc-common";

import { showAlert } from "odc-common";
const { changeWorkflowQuery } = workflowActions;

function* connectUserRequest(payload) {
  const result = yield call(
    connectUser,
    payload.userName,
    payload.office,
    payload.profile,
    payload.station
  );

  const query = {
    sortBy: "created",
    sortOrder: "desc",
    processVariables: [
      {
        name: "idAgencia",
        value: parseInt(result.data.jwt.claims.officeID),
        operator: "eq"
      }
    ],
    orQueries: [
      {
        assignee: result.data.jwt.claims.userCode.toLowerCase(),
        candidateGroup: "plataforma"
      }
    ]
  };

  yield put(changeWorkflowQuery(query));

  var privilegesLocal = JSON.parse(result.data.privileges);
  var transactionLocal = JSON.parse(result.data.profileTransactions);


  let session = {
    id: result.data.jwt.claims.userID,
    userCode: result.data.jwt.claims.userCode,
    fullName: result.data.jwt.claims.fullName,
    simpleName: result.data.jwt.claims.simpleName,
    lastNameName: result.data.jwt.claims.lastNameName,

    profile: result.data.jwt.claims.profileID,
    profileName: result.data.jwt.claims.profileName,

    idInstitution: result.data.jwt.claims.institutionID,
    institution: result.data.jwt.claims.institutionName,
    
    codeInstitution: result.data.jwt.claims.institutionCode,
    isOwnerInstitution: result.data.jwt.claims.institutionIsOwner,


    idOffice: result.data.jwt.claims.officeID,
    office: result.data.jwt.claims.officeName,

    privileges: privilegesLocal,

    date: getBasicDate(),
    station: "Estación 101",
    transactions: transactionLocal
  };
  sessionStorage.setItem("jwtToken", result.data.jwt.accessToken);
  sessionStorage.setItem(
    "idInstitution",
    parseInt(result.data.jwt.claims.institutionID)
  );
  yield put(getUserSessionSuccess(session));
}
const createUserWithEmailPasswordRequest = async (email, password) =>
  await createUserWithEmailAndPassword(email, password)
    .then(authUser => authUser)
    .catch(error => error);

const signInUserWithEmailPasswordRequest = async (username, password) => {
  return await signInWithEmailAndPasswordOwner(username, password).then(
    authUser => authUser
  );
};
function* signInFromPortalRequest(payload) {
  const signInResult = yield call(signInFromPortalComm, payload);

  if (!signInResult.state) {
    yield put(hideAuthLoader());
    yield call(showAlert, signInResult.message);
  } else {
    var offices = signInResult.data.offices; //13

    if (offices.length === 1 && offices[0].profiles.length === 1) {
      var newPayload = {
        userName: signInResult.data.userLogin.userCode,
        office: offices[0].code,
        profile: offices[0].profiles[0].code,
        station: "station"
      };
      yield call(connectUserRequest, newPayload);
    } else {
      yield put(userSignInSuccess(signInResult.data));
    }
  }
}

const signOutRequest = async username =>
  await signOutOwner(username)
    .then(authUser => authUser)
    .catch(error => error);

function* createUserWithEmailPassword({ payload }) {
  const { email, password } = payload;
  try {
    const signUpUser = yield call(
      createUserWithEmailPasswordRequest,
      email,
      password
    );
    if (signUpUser.message) {
    } else {
      localStorage.setItem("user_id", signUpUser.user.uid);
      yield put(userSignUpSuccess(signUpUser.user.uid));
    }
  } catch (error) {}
}

function* signInUserWithEmailPassword({ payload }) {
  const { username, password } = payload;
  try {
    const signInResult = yield call(
      signInUserWithEmailPasswordRequest,
      username,
      password
    );
    if (!signInResult.state) {
      yield put(hideAuthLoader());
      yield call(showAlert, signInResult.message);
    } else {
      var offices = signInResult.data.offices; //13
      if (offices.length === 1 && offices[0].profiles.length === 1) {
        var newPayload = {
          userName: username,
          office: offices[0].code,
          profile: offices[0].profiles[0].code,
          station: "station"
        };
        yield call(connectUserRequest, newPayload);
      } else {
        yield put(userSignInSuccess(signInResult.data));
      }
    }
  } catch (error) {}
}

function* signOut({ payload }) {
  try {
    yield call(signOutRequest, payload);
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("idInstitution");
    sessionStorage.removeItem("state");
    yield put(userSignOutSuccess(signOutUser));
  } catch (error) {}
}

export function* createUserAccount() {
  yield takeEvery(SIGNUP_USER, createUserWithEmailPassword);
}

export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}

export function* getUserSession(payload) {
  yield takeEvery(GET_USER_SESION, connectUserRequest);
}

export function* signInFromPortal(payload) {
  yield takeEvery(SIGNIN_FROM_PORTAL, signInFromPortalRequest);
}

export default function* rootSaga() {
  yield all([
    fork(signInUser),
    fork(createUserAccount),
    fork(signOutUser),
    fork(getUserSession),
    fork(signInFromPortal)
  ]);
}
