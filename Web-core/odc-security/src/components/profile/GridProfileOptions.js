import React from "react";
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

import { BooleanTypeProvider, SelectTypeProvider } from "odc-common";

import {
  NoDataRow,
  Cell,
  Command,
  EditCell,
  getRowId,
  pagingPanelMessages,
  tableMessages,
  checkDuplicates
} from "odc-common";
import { messages } from "./GridProfileOptionsConstants";

class GridProfileOptions extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          name: "idOption",
          title: "Opción"
        },
        {
          name: "isFavorite",
          title: "Favorito"
        },
        {
          name: "isActive",
          title: "Activo"
        }
      ],
      tableColumnExtensions: [
        { columnName: "idOption", width: 250 },
        { columnName: "isFavorite", width: 120 },
        { columnName: "isActive", width: 120 }
      ],
      rows: [],
      sorting: [],
      editingRowIds: [],
      addedRows: [],
      rowChanges: {},
      currentPage: 0,
      pageSize: 5,
      pageSizes: [5, 10, 0],
      booleanColumns: ["isFavorite", "isActive"],
      selectColumns: ["idOption"],
      leftFixedColumns: [TableEditColumn.COLUMN_TYPE],
      totalSummaryItems: [],
      availableValues: [],
      editingStateColumnExtensions: [
        { columnName: "type", editingEnabled: false }
      ]
    };

    this.changeSorting = sorting => this.setState({ sorting });
    this.changeEditingRowIds = editingRowIds =>
      this.setState({ editingRowIds });
    this.changeAddedRows = addedRows => {
      const { idProfile } = this.props;
      const { availableValues } = this.state;
      const idOption = availableValues.idOption[0]
        ? availableValues.idOption[0].key
        : 0;

      this.setState({
        addedRows: addedRows.map(row =>
          Object.keys(row).length
            ? row
            : {
                idMenu: 0,
                idOption: idOption,
                idProfile: idProfile,
                isActive: true,
                isFavorite: false
              }
        )
      });
    };

    this.changeRowChanges = rowChanges => this.setState({ rowChanges });
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

      if (checkDuplicates(rows.map(row => row.idOption)))
        showMessageAndHide(messages.msj1);
      else {
        this.setState({ rows });
        handleChangeRows(rows);
      }
    };
    this.changeColumnOrder = order => {
      this.setState({ columnOrder: order });
    };
  }

  componentDidMount = () => {
    const { rows, options } = this.props;
    let i = 0;
    const regs = rows.map(option => {
      return {
        id: i++,
        ...option
      };
    });
    const availableValues = {
      idOption: options.map(item => {
        return {
          key: item.idOption,
          value: item.idOption,
          name: item.view
        };
      })
    };
    this.setState({
      rows: regs,
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
      leftFixedColumns,
      totalSummaryItems,
      booleanColumns,
      selectColumns,
      availableValues,
      editingStateColumnExtensions
    } = this.state;

    const showCommandFlag = !editingRowIds.length && !addedRows.length;

    return (
      <Paper>
        <Grid rows={rows} columns={columns} getRowId={getRowId}>
          <BooleanTypeProvider for={booleanColumns} />
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
            columnExtensions={editingStateColumnExtensions}
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
            commandComponent={Command}
          />
          <TableSummaryRow />
          <TableFixedColumns leftColumns={leftFixedColumns} />
          <PagingPanel pageSizes={pageSizes} messages={pagingPanelMessages} />
        </Grid>
      </Paper>
    );
  }
}

export default GridProfileOptions;
