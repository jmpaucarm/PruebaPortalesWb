import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import GridMenu from "../../components/menu/GridMenu";
import { getAllMenus, editMenu, addMenu } from "../../actions/menu";
import { showMessageAndHide } from "odc-common";
import ReactPlaceholder from "react-placeholder";

class MasterMenu extends React.Component {
  componentDidMount() {
    this.props.getAllMenus();
  }

  handleNewRow = menu => this.props.addMenu(menu);
  handleEditRow = menu => this.props.editMenu(menu);

  render() {
    const { rows, showMessageAndHide } = this.props;

    return (
      <Fragment>
        <ReactPlaceholder type="media" rows={10} ready={rows.length > 0}>
          <Paper>
            <GridMenu
              rows={rows}
              onEditRow={this.handleEditRow}
              onAddRow={this.handleNewRow}
              showMessageAndHide={showMessageAndHide}
            />
          </Paper>
        </ReactPlaceholder>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ security }) => {
  const { rows } = security.menu;
  return {
    rows
  };
};

MasterMenu = connect(
  mapStateToProps,
  { getAllMenus, editMenu, addMenu, showMessageAndHide }
)(MasterMenu);

export default MasterMenu;
