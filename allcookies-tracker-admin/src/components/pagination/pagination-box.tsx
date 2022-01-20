import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const PaginationBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
}));

export default PaginationBox;
