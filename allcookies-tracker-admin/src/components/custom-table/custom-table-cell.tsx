import React from "react";

import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  padding: "5px 0px",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    color: "#767676",
  },
}));

export default CustomTableCell;
