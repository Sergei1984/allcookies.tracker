import React from "react";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&.MuiTableRow-root:hover": {
    backgroundColor: "#E6F9F9",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&.Mui-selected": {
    backgroundColor: "#E6F9F9",
    borderLeft: 0,
    borderRight: 0,
  },
}));

export default CustomTableRow;
