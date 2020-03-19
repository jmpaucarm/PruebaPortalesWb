import React from "react";
import { connect } from "react-redux";
import {
  SortingState,
  EditingState,
  PagingState,
  SummaryState,
  IntegratedPaging,
  IntegratedSorting,
  IntegratedSummary
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
  DragDropProvider,
  TableColumnReordering,
  TableFixedColumns,
  TableSummaryRow
} from "@devexpress/dx-react-grid-material-ui";
import Paper from "@material-ui/core/Paper";

import {
  BooleanTypeProvider,
  DateTypeProvider,
  SelectTypeProvider,
  IntlMessages,
  NoDataRow,
  Cell,
  Command,
  EditCell,
  getRowId
} from "odc-common";

import {
  pagingPanelMessages,
  tableMessages,
  checkDuplicates
} from "odc-common";
import { showMessageAndHide } from "odc-common";

import { messages } from "./GridUserProfilesConstants";
import { validate } from "./GridUserProfilesValidate";

class GridUserProfiles extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          name: "idProfile",
          title: <IntlMessages id="user.profile.idprofile" />
        },
        {
          name: "idOffice",
          title: <IntlMessages id="user.profile.idoffice" />
        },
        {
          name: "dateFrom",
          title: <IntlMessages id="user.profile.datefrom" />
        },
        {
          name: "dateUntil",
          title: <IntlMessages id="user.profile.dateuntil" />
        },
        { name: "isActive", title: <IntlMessages id="user.profile.isactive" /> }
      ],
      tableColumnExtensions: [
        { columnName: "idProfile", width: 180 },
        { columnName: "idOffice", width: 180 },
        { columnName: "dateFrom", width: 200 },
        { columnName: "dateUntil", width: 200 },
        { columnName: "isActive", width: 100 }
      ],
      rows: [],
      availableValues: [],
      offices: [],
      sorting: [],
      editingRowIds: [],
      addedRows: [],
      rowChanges: {},
      currentPage: 0,
      pageSize: 5,
      pageSizes: [5, 10, 0],
      columnOrder: [
        "idUserProfile",
        "idProfile",
        "idOffice",
        "isActive",
        "dateFrom",
        "dateUntil"
      ],
      currencyColumns: [],
      percentColumns: [],
      dateColumns: ["dateFrom", "dateUntil"],
      selectColumns: ["idProfile", "idOffice"],
      booleanColumns: ["isActive"],
      leftFixedColumns: [TableEditColumn.COLUMN_TYPE],
      totalSummaryItems: [],
      errors: {},
      isEditing: false
    };

    this.changeSorting = sorting => this.setState({ sorting });
    this.changeAddedRows = addedRows => {
      const temp = addedRows.map(row => {
        if (Object.keys(row).length) return row;
        else {
          const { availableValues } = this.state;
          const idProfile = availableValues.idProfile[0]
            ? availableValues.idProfile[0].key
            : 0;
          const idOffice = availableValues.idOffice[0]
            ? availableValues.idOffice[0].key
            : 0;

          const emptyItem = {
            idUserProfile: 0,
            idProfile: idProfile,
            idOffice: idOffice,
            dateFrom: undefined,
            dateUntil: undefined,
            isActive: true
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
    this.changeEditingRowIds = editingRowIds => {
      this.setState({ editingRowIds, isEditing: true, errors: {} });
    };
    this.changeRowChanges = rowChanges => {
      const { rows, isEditing } = this.state;

      if (!isEditing) return;

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
      let { rows } = this.state;
      const { handleChangeRows, showMessageAndHide } = this.props;

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
        rows = rows.map(row =>
          changed[row.id] ? { ...row, ...changed[row.id] } : row
        );
      }

      if (checkDuplicates(rows.map(row => row.idProfile + "-" + row.idOffice)))
        showMessageAndHide(messages.msj1);
      else {
        this.setState({ rows });
        this.setState({ isEditing: false });
        handleChangeRows(rows);
      }
    };

    this.changeColumnOrder = order => {
      this.setState({ columnOrder: order });
    };
  }

  componentDidMount = () => {
    const { offices, allProfiles, userProfiles } = this.props;
    let i = 0;
    let regs = userProfiles.map(item => {
      return {
        ...item,
        id: i++
      };
    });

    const availableValues = {
      idProfile: allProfiles.map(item => {
        return {
          key: item.idProfile,
          value: item.idProfile,
          name: item.name
        };
      }),
      idOffice: offices.map(item => {
        return { key: item.idOffice, value: item.idOffice, name: item.name };
      })
    };
    this.setState({
      rows: regs,
      offices,
      availableValues
    });
  };

  render() {
    const {
      rows,
      columns,
      tableColumnExtensions,
      sorting,
      editingRowIds,
      addedRows,
      rowChanges,
      currentPage,
      pageSize,
      pageSizes,
      columnOrder,
      dateColumns,
      selectColumns,
      leftFixedColumns,
      totalSummaryItems,
      booleanColumns,
      availableValues,
      errors
    } = this.state;

    const showCommandFlag = !editingRowIds.length && !addedRows.length;

    return (
      <Paper>
        <Grid
          rows={rows}
          columns={columns.map(item => ({ ...item, error: errors[item.name] }))}
          getRowId={getRowId}
        >
          <BooleanTypeProvider for={booleanColumns} />
          <DateTypeProvider for={dateColumns} />
          <SelectTypeProvider
            for={selectColumns}
            availableValues={availableValues}
          />

          <SortingState
            sorting={sorting}
            onSortingChange={this.changeSorting}
          />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={this.changeCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={this.changePageSize}
          />
          <EditingState
            editingRowIds={editingRowIds}
            onEditingRowIdsChange={this.changeEditingRowIds}
            rowChanges={rowChanges}
            onRowChangesChange={this.changeRowChanges}
            addedRows={addedRows}
            onAddedRowsChange={this.changeAddedRows}
            onCommitChanges={this.commitChanges}
          />
          <SummaryState totalItems={totalSummaryItems} />

          <IntegratedSorting />
          <IntegratedPaging />
          <IntegratedSummary />

          <DragDropProvider />

          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={Cell}
            messages={tableMessages}
            noDataRowComponent={NoDataRow}
          />
          <TableColumnReordering
            order={columnOrder}
            onOrderChange={this.changeColumnOrder}
          />
          <TableHeaderRow showSortingControls />
          <TableEditRow cellComponent={EditCell} />
          <TableEditColumn
            width={130}
            showAddCommand={showCommandFlag}
            showEditCommand={showCommandFlag}
            commandComponent={props => <Command {...props} errors={errors} />}
          />
          <TableSummaryRow />
          <TableFixedColumns leftColumns={leftFixedColumns} />
          <PagingPanel pageSizes={pageSizes} messages={pagingPanelMessages} />
        </Grid>
      </Paper>
    );
  }
}

GridUserProfiles = connect(
  null,
  { showMessageAndHide }
)(GridUserProfiles);
export default GridUserProfiles;
