import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";

// ICONS
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    color: "#767676",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "red",
  },
  "&.Mui-selected": {
    backgroundColor: "#DFEBF2",
  },
}));

// export default function SellingPointsTable() {
//   const [order, setOrder] = React.useState<any>("asc");
//   const [orderBy, setOrderBy] = React.useState<keyof any>("calories");
//   const [selected, setSelected] = React.useState<readonly string[]>([]);
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const handleRequestSort = (
//     event: React.MouseEvent<unknown>,
//     property: keyof any
//   ) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.checked) {
//       const newSelecteds = rows.map((n) => n.title);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected: readonly string[] = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const isSelected = (name: string) => selected.indexOf(name) !== -1;

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell> Inputs and filters</StyledTableCell>
//           </TableRow>
//           <TableRow sx={{ backgroundColor: "transparent" }}>
//             <StyledTableCell align="left" padding="checkbox">
//               <Checkbox
//                 color="primary"
//                 indeterminate={numSelected > 0 && numSelected < rowCount}
//                 checked={rowCount > 0 && numSelected === rowCount}
//                 onChange={onSelectAllClick}
//                 inputProps={{
//                   "aria-label": "select all desserts",
//                 }}
//               />
//             </StyledTableCell>
//             <StyledTableCell
//               sx={{ backgroundColor: "transparent" }}
//               align="left"
//             >
//               Магазин
//             </StyledTableCell>
//             <StyledTableCell align="right">Адрес</StyledTableCell>
//             <StyledTableCell align="right">Время работы</StyledTableCell>
//             <StyledTableCell align="center">Доп.</StyledTableCell>
//           </TableRow>
//           <TableRow>
//             <StyledTableCell align="left">Add customer</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row, index) => {
//             const isItemSelected = isSelected(row.title);
//             const labelId = `enhanced-table-checkbox-${index}`;
//             return (
//               <StyledTableRow
//                 key={row.id}
//                 onClick={(event) => handleClick(event, row.title)}
//                 role="checkbox"
//                 aria-checked={isItemSelected}
//                 tabIndex={-1}
//                 selected={isItemSelected}
//               >
//                 <StyledTableCell
//                   padding="checkbox"
//                   component="th"
//                   align="left"
//                   scope="row"
//                 >
//                   <Checkbox
//                     color="primary"
//                     checked={isItemSelected}
//                     inputProps={{
//                       "aria-labelledby": labelId,
//                     }}
//                   />
//                 </StyledTableCell>
//                 <StyledTableCell component="th" align="left" scope="row">
//                   {row.title}
//                 </StyledTableCell>
//                 <StyledTableCell align="left">{row.address}</StyledTableCell>
//                 <StyledTableCell align="center">
//                   {row.created_at}
//                 </StyledTableCell>
//                 <StyledTableCell align="center">
//                   <IconButton
//                     color="inherit"
//                     aria-label="open drawer"
//                     onClick={() => {
//                       console.log("Открыто доп. панель");
//                     }}
//                     edge="start"
//                   >
//                     <MoreHorizIcon sx={{ color: "#B9B9B9" }} />
//                   </IconButton>
//                 </StyledTableCell>
//               </StyledTableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

const rows = [
  {
    id: 1,
    title: "Nikolsky",
    description: null,
    address: "Pushkinska 2a",
    location: {
      lat: 36.235157,
      lon: 49.991973,
    },
    is_disabled: false,
    created_by: 1,
    created_at: "2021-12-19T20:36:52.045932Z",
    modified_by: 1,
    modified_at: "2021-12-19T20:36:52.045932Z",
    deleted_by: null,
    deleted_at: null,
  },
  {
    id: 2,
    title: "Central Market",
    description: null,
    address: "Lopan 331",
    location: {
      lat: 36.222724,
      lon: 49.994169,
    },
    is_disabled: false,
    created_by: 1,
    created_at: "2021-12-19T20:38:44.385597Z",
    modified_by: 1,
    modified_at: "2021-12-19T20:38:44.385597Z",
    deleted_by: null,
    deleted_at: null,
  },
  {
    id: 3,
    title: "Test point4",
    description: "Test desc",
    address: "Loc 1 asdsd",
    location: {
      lat: 20.0,
      lon: 20.0,
    },
    is_disabled: false,
    created_by: 1,
    created_at: "2021-12-19T21:28:35.294519Z",
    modified_by: 1,
    modified_at: "2021-12-20T22:02:01.187378Z",
    deleted_by: 1,
    deleted_at: "2021-12-21T18:22:55.826039Z",
  },
  {
    id: 4,
    title: "Test point2",
    description: null,
    address: null,
    location: null,
    is_disabled: false,
    created_by: 1,
    created_at: "2021-12-20T21:59:37.156062Z",
    modified_by: 1,
    modified_at: "2021-12-20T21:59:37.156062Z",
    deleted_by: null,
    deleted_at: null,
  },
  {
    id: 7,
    title: "Барабашово",
    description: null,
    address: null,
    location: {
      lat: 12.0,
      lon: 34.0,
    },
    is_disabled: false,
    created_by: 1,
    created_at: "2021-12-23T20:00:20.929520Z",
    modified_by: 1,
    modified_at: "2021-12-23T20:13:02.485826Z",
    deleted_by: null,
    deleted_at: null,
  },
  {
    id: 15,
    title: "Lat 44 Lon 55",
    description: null,
    address: null,
    location: {
      lat: 44.0,
      lon: 55.0,
    },
    is_disabled: false,
    created_by: 1,
    created_at: "2021-12-24T22:25:54.318911Z",
    modified_by: 1,
    modified_at: "2021-12-24T22:25:54.318911Z",
    deleted_by: null,
    deleted_at: null,
  },
  {
    id: 16,
    title: "ASD",
    description: null,
    address: null,
    location: null,
    is_disabled: false,
    created_by: 1,
    created_at: "2021-12-25T12:08:40.360230Z",
    modified_by: 1,
    modified_at: "2021-12-25T12:08:40.360230Z",
    deleted_by: null,
    deleted_at: null,
  },
  {
    id: 6,
    title: "ЧП Никольский Инк Магазин",
    description: null,
    address: null,
    location: {
      lat: 36.235887,
      lon: 49.991414,
    },
    is_disabled: false,
    created_by: 1,
    created_at: "2021-12-21T18:22:13.733349Z",
    modified_by: 1,
    modified_at: "2021-12-21T18:22:13.733349Z",
    deleted_by: null,
    deleted_at: null,
  },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Магазин",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Адрес",
  },
  {
    id: "times",
    numeric: true,
    disablePadding: false,
    label: "Время работы",
  },
  {
    id: "buttons",
    numeric: true,
    disablePadding: false,
    label: "Доп.",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>Inputs and filters</TableRow>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all points",
            }}
          />
        </TableCell>
        <TableCell sx={{ backgroundColor: "transparent" }} align="left">
          Магазин
        </TableCell>
        <TableCell align="right">Адрес</TableCell>
        <TableCell align="right">Время работы</TableCell>
        <TableCell align="center">Доп.</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="left">Add customer</TableCell>
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

function SellingPointsTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.title);
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

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {rows.map((row: any, index) => {
                const isItemSelected = isSelected(row.title);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <StyledTableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onClick={(event) => handleClick(event, row.title)}
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.title}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.address}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.created_at}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => {
                          console.log("Открыто доп. панель");
                        }}
                        edge="start"
                      >
                        <MoreHorizIcon sx={{ color: "#B9B9B9" }} />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
              {emptyRows > 0 && (
                <StyledTableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <StyledTableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default SellingPointsTable;
