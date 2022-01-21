import React from "react";
import Skeleton from "@mui/material/Skeleton";

import { TableRow, TableCell } from "@mui/material";

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
          <TableRow key={index} hover role="checkbox" tabIndex={-1}>
            <TableCell padding="checkbox">
              <Skeleton variant="text" />
            </TableCell>
            <TableCell component="th" align="left" scope="row">
              <Skeleton variant="text" />
            </TableCell>
            <TableCell align="left">
              <Skeleton variant="text" />
            </TableCell>
            <TableCell align="center">
              <Skeleton variant="text" />
            </TableCell>
            <TableCell align="center">
              <Skeleton variant="text" />
            </TableCell>
            <TableCell align="center">
              <Skeleton variant="text" />
            </TableCell>
            <TableCell align="right">
              <Skeleton variant="text" />
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

export default TablePointsSkeleton;
