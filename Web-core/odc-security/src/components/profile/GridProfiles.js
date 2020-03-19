import React from "react";
import { connect } from "react-redux";
import {
  SelectionState,
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
  FilteringState,
  IntegratedFiltering
} from "@devexpress/dx-react-grid";

import { BooleanTypeProvider, DateTypeProvider } from "odc-common";

import {
  pagingPanelMessages,
  tableMessages,
  filterRowMessages
} from "odc-common";

import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
  PagingPanel,
  TableFilterRow,
  TableColumnResizing
} from "@devexpress/dx-react-grid-material-ui";

class GridProfiles extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: "profileCode", title: "Código Perfil" },
        { name: "name", title: "Nombre" },
        { name: "channel", title: "Canal" },
        { name: "dateValidity", title: "Fecha Desde" },
        { name: "isGeneral", title: "Es General" },
        { name: "isActive", title: "Activo" }
      ],
      columnWidths: [
        { columnName: "profileCode", width: 150 },
        { columnName: "name", width: 250 },
        { columnName: "channel", width: 150 },
        { columnName: "dateValidity", width: 150 },
        { columnName: "isGeneral", width: 150 },
        { columnName: "isActive", width: 150 }
      ],
      currentPage: 0,
      pageSize: 10,
      pageSizes: [5, 10, 15],
      filters: [],
      booleanColumns: ["isGeneral", "isActive"],
      dateColumns: ["dateValidity"]
    };
    this.changeCurrentPage = currentPage => this.setState({ currentPage });
    this.changePageSize = pageSize => this.setState({ pageSize });
    this.changeFilters = filters => this.setState({ filters });
    this.changeColumnWidths = columnWidths => {
      this.setState({ columnWidths });
    };
  }
  render() {
    const { selection, changeSelection, rows } = this.props;
    const {
      columns,
      pageSize,
      pageSizes,
      currentPage,
      defaultSorting,
      filters,
      columnWidths,
      booleanColumns,
      dateColumns
    } = this.state;
    return (
      <Grid rows={rows} columns={columns}>
        <BooleanTypeProvider for={booleanColumns} />
        <DateTypeProvider for={dateColumns} />
        <FilteringState
          filters={filters}
          onFiltersChange={this.changeFilters}
        />
        <IntegratedFiltering />

        <SortingState defaultSorting={defaultSorting} />
        <IntegratedSorting />
        <SelectionState
          selection={selection}
          onSelectionChange={changeSelection}
        />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={this.changeCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={this.changePageSize}
        />
        <IntegratedPaging />
        <Table messages={tableMessages} />
        <TableColumnResizing
          columnWidths={columnWidths}
          onColumnWidthsChange={this.changeColumnWidths}
        />
        <TableHeaderRow showSortingControls />
        <TableFilterRow messages={filterRowMessages} />
        <PagingPanel pageSizes={pageSizes} messages={pagingPanelMessages} />
        <TableSelection
          selectByRowClick
          highlightRow
          showSelectionColumn={false}
        />
      </Grid>
    );
  }
}

const mapStateToProps = ({ security }) => {
  const { rows } = security.profile;
  return { rows };
};

GridProfiles = connect(
  mapStateToProps,
  {}
)(GridProfiles);

export default GridProfiles;
