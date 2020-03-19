import React from "react";
import {
  TreeDataState,
  CustomTreeData,
  EditingState
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn,
  TableColumnResizing,
  Toolbar,
  TableEditRow,
  TableEditColumn,
  TableColumnVisibility
} from "@devexpress/dx-react-grid-material-ui";
import {
  BooleanTypeProvider,
  DateTypeProvider,
  StringTypeProvider,
  NumberTypeProvider,
  SelectTypeProvider,
  LevelTypeProvider,
  ParentTypeProvider,
  IconTypeProvider,
  Command
} from "odc-common";

import { tableMessages } from "odc-common";

import { getChildRows, getDepth, customFilter } from "./GridMenuUtils";
import { validate } from "./GridMenuValidate";
import { maxDepth, messages } from "./GridMenuConstants";

class GridMenu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: "name", title: "Nombre" },
        { name: "level", title: "Nivel" },
        { name: "description", title: "Descripción" },
        {
          name: "parentId",
          title: "Origen"
        },
        { name: "channel", title: "Canal" },
        {
          name: "isActive",
          title: "Activo"
        },
        {
          name: "icon",
          title: "Icono"
        },
        {
          name: "order",
          title: "Orden"
        },

        { name: "module", title: "Módulo" },
        {
          name: "dateSince",
          title: "Fecha Desde"
        },
        { name: "routeLink", title: "URL" }
      ],
      defaultColumnWidths: [
        { columnName: "name", width: 200 },
        { columnName: "description", width: 100 },
        { columnName: "parentId", width: 250 },
        { columnName: "channel", width: 50 },
        { columnName: "dateSince", width: 150 },
        { columnName: "icon", width: 80 },
        { columnName: "isActive", width: 80 },
        { columnName: "order", width: 80 },
        { columnName: "level", width: 80 },
        { columnName: "module", width: 140 },
        { columnName: "routeLink", width: 230 }
      ],
      stringColumns: [
        "name",
        "description",
        "channel",
        "icon",
        "module",
        "routeLink"
      ],
      booleanColumns: ["isActive"],
      dateColumns: ["dateSince"],
      parentColumns: ["parentId"],
      moduleColumns: ["module"],
      numberColumns: ["order"],
      levelColumns: ["level"],
      iconColumns: ["icon"],
      hiddenColumnNames: ["channel"],
      editingRowIds: [],
      addedRows: [],
      rowChanges: [],
      treeColumn: "name",
      editingText: "",
      availableValues: {
        module: [
          { key: "SGS", value: "SGS", name: "Seguridad" },
          { key: "CFG", value: "CFG", name: "Configuración" },
          { key: "WKF", value: "WKF", name: "Workflow" }
        ]
      },
      errors: {},
      isEditing: false
    };

    this.changeSorting = sorting => this.setState({ sorting });
    this.changeEditingRowIds = editingRowIds => {
      this.setState({ editingRowIds, isEditing: true, errors: {} });
    };
    this.changeAddedRows = addedRows => {
      const temp = addedRows.map(row => {
        if (Object.keys(row).length) return row;
        else {
          const emptyItem = {
            name: "",
            description: "",
            channel: "",
            dateSince: undefined,
            icon: "",
            isActive: true,
            order: 1,
            level: "",
            module: "",
            routeLink: "",
            parentId: 0
          };

          const row = {
            ...emptyItem,
            ...addedRows[0]
          };
          return row;
        }
      });

      const errors = temp.length ? validate(temp[0]) : {};
      this.setState({ errors, addedRows: temp });
    };

    this.changeRowChanges = rowChanges => {
      if (!this.state.isEditing) return;

      const { rows } = this.props;
      const id = parseInt(Object.keys(rowChanges)[0], 10);
      const row = {
        ...rows[id],
        ...rowChanges[id]
      };
      const errors = validate(row);
      this.setState({ rowChanges, errors });
    };
    this.changeCurrentPage = currentPage => this.setState({ currentPage });
    this.changePageSize = pageSize => this.setState({ pageSize });
    this.commitChanges = ({ added, changed }) => {
      let { rows } = this.props;

      if (added) {
        const startingAddedId =
          rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
        rows = [
          ...rows,
          ...added.map((row, index) => ({
            id: startingAddedId + index,
            ...row
          }))
        ];
      }
      if (changed) {
        const id = parseInt(Object.keys(changed)[0], 10);
        const row = {
          ...rows[id],
          ...changed[id]
        };

        rows[id] = row;
      }

      let duplicateFlag = false;

      for (let i = 0; i < rows.length; i++) {
        let element = rows[i];
        const x = customFilter(rows, element);

        if (x.length > 1) {
          duplicateFlag = true;
          break;
        }
      }

      if (getDepth(rows) > maxDepth)
        this.props.showMessageAndHide(messages.msj2 + maxDepth);
      else if (duplicateFlag) this.props.showMessageAndHide(messages.msj3);
      else {
        if (added) {
          const record = rows[rows.length - 1];
          if (record.parentId === -1) record.parentId = 0;
          this.props.onAddRow(record);
        }

        if (changed) {
          const id = parseInt(Object.keys(changed)[0], 10);
          const row = {
            ...rows[id],
            ...changed[id]
          };
          this.setState({ isEditing: false });
          this.props.onEditRow({ payload: row, index: id });
        }
      }
    };

    this.changeColumnOrder = order => {
      this.setState({ columnOrder: order });
    };

    this.handleCloseSnackbar = (event, reason) => {
      this.setState({ open: false, message: "" });
    };
  }
  render() {
    const {
      columns,
      defaultColumnWidths,
      tableColumnExtensions,
      booleanColumns,
      dateColumns,
      editingRowIds,
      rowChanges,
      addedRows,
      levelColumns,
      numberColumns,
      treeColumn,
      parentColumns,
      stringColumns,
      moduleColumns,
      iconColumns,
      availableValues,
      errors,
      hiddenColumnNames
    } = this.state;

    const { rows } = this.props;
    const showCommandFlag = !editingRowIds.length && !addedRows.length;

    return (
      <Grid
        rows={rows}
        columns={columns.map(item => ({ ...item, error: errors[item.name] }))}
      >
        <StringTypeProvider for={stringColumns} />
        <ParentTypeProvider for={parentColumns} rows={rows} />
        <BooleanTypeProvider for={booleanColumns} />
        <DateTypeProvider for={dateColumns} />
        <LevelTypeProvider for={levelColumns} />
        <NumberTypeProvider for={numberColumns} />
        <IconTypeProvider for={iconColumns} />
        <SelectTypeProvider
          for={moduleColumns}
          availableValues={availableValues}
        />
        <TreeDataState />
        <EditingState
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={this.changeEditingRowIds}
          rowChanges={rowChanges}
          onRowChangesChange={this.changeRowChanges}
          addedRows={addedRows}
          onAddedRowsChange={this.changeAddedRows}
          onCommitChanges={this.commitChanges}
        />
        <CustomTreeData getChildRows={getChildRows} />
        <Table
          columnExtensions={tableColumnExtensions}
          messages={tableMessages}
        />
        <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
        <TableHeaderRow />
        <TableColumnVisibility hiddenColumnNames={hiddenColumnNames} />
        <TableTreeColumn for={treeColumn} />
        <TableEditRow />
        <TableEditColumn
          width={110}
          showAddCommand={showCommandFlag}
          showEditCommand={showCommandFlag}
          commandComponent={props => <Command {...props} errors={errors} />}
        />
        <Toolbar />
      </Grid>
    );
  }
}

export default GridMenu;
