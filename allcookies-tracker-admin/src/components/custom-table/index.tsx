import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

// ICONS
import CustomPagination from "../pagination/pagination";
import TableDotsPopover from "../popover";
import CustomCheckbox from "../custom-checkbox";

import PaginationBox from "../pagination/pagination-box";
import { TableSkeleton } from "../skeletons";
import CustomTableHead from "./custom-table-head";
import CustomTableToolbar from "./custom-table-toolbar";
import NestedTableOptionsList from "../more-options";
import CustomTableCell from "./custom-table-cell";
import CustomTableRow from "./custom-table-row";
import {
  Collapse,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

type Order = "asc" | "desc";

interface CustomTableProps {
  loading: boolean;
  total: number;
  data: Array<any>;
  headData: Array<string>;
  getPageData: (skip: number, take: number, search?: string) => void;
  renderRow: (row: any) => React.ReactNode;
  IconClickPath: string;
  Icon: any;
  IconText: string;
  isAdditions?: boolean;
}

const CustomTable = ({
  loading,
  data,
  total,
  getPageData,
  headData,
  renderRow,
  IconClickPath,
  Icon,
  IconText,
  isAdditions,
}: CustomTableProps): JSX.Element => {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(5);
  const [order, setOrder] = React.useState<Order>("asc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [searchString, setSearch] = React.useState("");

  console.log(isAdditions);
  const handleSearchClick = (value: string) => {
    setSearch(value);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => String(n.id));
      console.log(newSelecteds);
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
    setPage(newPage);
  };

  const handleChangeLimit = (value: any) => {
    setLimit(Number(value));
    setPage(1);
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

  const [open, setOpen] = React.useState<any>({});

  function renderItems(rows: any) {
    return rows?.map((row: any, index: number) => {
      const isItemSelected = isSelected(String(row.id));
      const labelId = `enhanced-table-checkbox-${index}`;
      return (
        <Fragment key={row.id}>
          <CustomTableRow
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            selected={isItemSelected}
          >
            <CustomTableCell padding="checkbox">
              <CustomCheckbox
                color="primary"
                onClick={(event) => handleClick(event, String(row.id))}
                checked={isItemSelected}
                inputProps={{
                  "aria-labelledby": labelId,
                }}
              />
            </CustomTableCell>
            {renderRow(row)}

            {!isAdditions ? (
              <CustomTableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() =>
                    setOpen((prev: any) => ({
                      ...prev,
                      [row.id]: !prev[row.id],
                    }))
                  }
                >
                  {open[row.id] ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              </CustomTableCell>
            ) : null}
            {isAdditions ? (
              <CustomTableCell align="center">
                <TableDotsPopover>
                  <NestedTableOptionsList
                    title={"Доп операции: " + row.id}
                    item={row}
                  />
                </TableDotsPopover>
              </CustomTableCell>
            ) : null}
          </CustomTableRow>
          <CustomTableRow>
            <CustomTableCell
              style={{ paddingBottom: 0, paddingTop: 0, background: "#EFFAFA" }}
              colSpan={12}
            >
              <Collapse in={open[row.id]} timeout="auto" unmountOnExit>
                {open[row.id] && (
                  <div>
                    <p>Hello</p>
                  </div>
                )}
              </Collapse>
            </CustomTableCell>
          </CustomTableRow>
        </Fragment>
      );
    });
  }

  React.useEffect(() => {
    getPageData((page - 1) * limit, limit, searchString);
    return () => {};
  }, [page, searchString, limit]);

  return (
    <Box>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <CustomTableToolbar
          numSelected={selected.length}
          handleSearchClick={handleSearchClick}
          handleChangeLimit={handleChangeLimit}
          limit={limit}
        />
        <TableContainer sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 320 }} aria-labelledby="tableTitle">
            <CustomTableHead
              numSelected={selected.length}
              order={order}
              onSelectAllClick={handleSelectAllClick}
              rowCount={data.length}
              headData={headData}
              IconClickPath={IconClickPath}
              Icon={Icon}
              IconText={IconText}
              isAdditions={isAdditions}
            />
            <TableBody>
              {!hasData ? (
                <TableSkeleton
                  rowCount={limit}
                  colCount={headData.length + 2}
                />
              ) : (
                renderItems(data)
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
