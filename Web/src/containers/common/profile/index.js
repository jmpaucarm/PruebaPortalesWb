import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { ChangePassword } from "odc-common";
import { Redirect } from "react-router-dom";
import { userActions } from "odc-security";

const { changePassword } = userActions;

class ContainerProfile extends React.Component {
  handleSubmit = (values, dispatch) => {
    const payload = {
      UserCode: this.props.authUser.userCode,
      Password: values.currentPassword,
      NewPassword: values.newPassword
    };
    dispatch(changePassword(payload));
  };

  render() {
    const { redirect } = this.props;

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    return (
      <div>
        <Paper style={{ position: "relative" }}>
          <br />
          <ChangePassword onSubmit={this.handleSubmit} />
          <br />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = ({ security, auth }) => {
  const { redirect } = security.user;
  const { authUser } = auth;

  return {
    redirect,
    authUser
  };
};

ContainerProfile = connect(
  mapStateToProps,
  undefined
)(ContainerProfile);

export default ContainerProfile;
