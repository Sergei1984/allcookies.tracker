import React from "react";
import Skeleton from "@mui/material/Skeleton";

import { TableRow, TableCell } from "@mui/material";

interface TablePointsSkeletonProps {
  rowCount: number;
  colCount: number;
}

const TableSkeleton = ({
  rowCount,
  colCount,
}: TablePointsSkeletonProps): JSX.Element => {
  const rows = new Array(rowCount).fill(0);
  const cols = new Array(colCount).fill(0);
  return (
    <>
      {rows?.map((item, idx1) => {
        return (
          <TableRow key={idx1} hover role="checkbox" tabIndex={-1}>
            {cols?.map((item, idx2) => {
              return (
                <TableCell key={idx2} padding="checkbox">
                  <Skeleton variant="text" height="40px" />
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </>
  );
};

export default TableSkeleton;
