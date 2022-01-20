import React from "react";
import Skeleton from "@mui/material/Skeleton";

import StyledTableCell from "../styled-table-cell";
import StyledTableRow from "../styled-table-row";

interface TablePointsSkeletonProps {
  count?: number;
}

const TablePointsSkeleton = ({
  count,
}: TablePointsSkeletonProps): JSX.Element => {
  const countArray = new Array(count ? count : 1).fill(0);
  return (
    <>
      {countArray?.map((item, index) => {
        return (
          <StyledTableRow key={index} hover role="checkbox" tabIndex={-1}>
            <StyledTableCell padding="checkbox">
              <Skeleton variant="text" />
            </StyledTableCell>
            <StyledTableCell component="th" align="left" scope="row">
              <Skeleton variant="text" />
            </StyledTableCell>
            <StyledTableCell align="left">
              <Skeleton variant="text" />
            </StyledTableCell>
            <StyledTableCell align="center">
              <Skeleton variant="text" />
            </StyledTableCell>
            <StyledTableCell align="center">
              <Skeleton variant="text" />
            </StyledTableCell>
            <StyledTableCell align="center">
              <Skeleton variant="text" />
            </StyledTableCell>
            <StyledTableCell align="right">
              <Skeleton variant="text" />
            </StyledTableCell>
          </StyledTableRow>
        );
      })}
    </>
  );
};

export default TablePointsSkeleton;
