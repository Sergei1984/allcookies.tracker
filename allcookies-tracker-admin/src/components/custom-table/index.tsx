import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import { formatToTableValue, formatValueToDate } from "../../utils";
// ICONS
import CustomPagination from "../pagination/pagination";
import TableDotsPopover from "../popover";
import CustomCheckbox from "../custom-checkbox";

import PaginationBox from "../pagination/pagination-box";
import { TablePointsSkeleton } from "../skeletons";
import CustomTableHead from "./custom-table-head";
import CustomTableToolbar from "./custom-table-toolbar";
import NestedTableOptionsList from "../more-options";
import CustomTableCell from "./custom-table-cell";
import CustomTableRow from "./custom-table-row";

type Order = "asc" | "desc";

interface CustomTableProps {
  loading: boolean;
  page: number;
  total: number;
  limit: number;
  data: Array<any>;
  headData: Array<string>;

  getPageData: (skip: number, take: number) => void;
  changePage: (page: number) => void;
}

const CustomTable = ({
  loading,
  data,
  total,
  page,
  limit,
  changePage,
  getPageData,
  headData,
}: CustomTableProps): JSX.Element => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    changePage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // setRowsPerPage(parseInt(event.target.value, 10));
    changePage(1);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const hasData = React.useMemo(() => {
    if (loading) {
      return false;
    }
    if (!loading) {
      if (data?.length > 0) {
        return true;
      }
      return false;
    }
  }, [loading, data]);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * limit - data.length) : 0;

  React.useEffect(() => {
    getPageData((page - 1) * limit, limit);
    return () => {};
  }, [page]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <CustomTableToolbar numSelected={selected.length} />
        <TableContainer sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 320 }} aria-labelledby="tableTitle">
            <CustomTableHead
              numSelected={selected.length}
              order={order}
              onSelectAllClick={handleSelectAllClick}
              rowCount={data.length}
              headData={headData}
            />
            <TableBody>
              {!hasData ? (
                <TablePointsSkeleton count={limit} />
              ) : (
                data?.map((row: any, index) => {
                  const isItemSelected = isSelected(row.title);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <CustomTableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <CustomTableCell padding="checkbox">
                        <CustomCheckbox
                          color="primary"
                          onClick={(event) => handleClick(event, row.title)}
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </CustomTableCell>
                      <CustomTableCell component="th" align="left" scope="row">
                        {formatToTableValue(row.title)}
                      </CustomTableCell>
                      <CustomTableCell align="left">
                        {formatToTableValue(row.description)}
                      </CustomTableCell>
                      <CustomTableCell align="center">
                        {formatToTableValue(row.address)}
                      </CustomTableCell>
                      <CustomTableCell align="center">
                        {formatValueToDate(row.created_at)}
                      </CustomTableCell>
                      <CustomTableCell align="center">
                        {formatValueToDate(row.modified_at)}
                      </CustomTableCell>
                      <CustomTableCell align="right">
                        <TableDotsPopover>
                          <NestedTableOptionsList
                            title={"Доп операции: " + row.id}
                            item={row}
                          />
                        </TableDotsPopover>
                      </CustomTableCell>
                    </CustomTableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <PaginationBox>
        <CustomPagination
          page={page}
          count={Math.ceil(total / limit)}
          disabled={loading}
          onChange={handleChangePage}
        />
      </PaginationBox>
    </Box>
  );
};

export default CustomTable;
