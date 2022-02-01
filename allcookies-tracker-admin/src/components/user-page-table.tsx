import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AddUserRoute } from "../routes/urls";
import { RootStore } from "../store/rootStore";
import { getAllUserThunk } from "../store/users/thunk/getAllUserThunk";
import { formatToTableValue } from "../utils";
import CustomTable from "./custom-table";
import CustomTableCell from "./custom-table/custom-table-cell";
import { SellingPointsState } from "../store/selling-points/types";
import { selectSellingPointsStore } from "../store/selling-points/selectors";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { getAppStoreSelector } from "../store/app/selectors";

export default function UserPageTable() {
  const dispatch = useDispatch();

  const { users, total } = useSelector((state: RootStore) => state.userStore);

  const appStore = useSelector(getAppStoreSelector);

  const getPoints = (skip: number, take: number) => {
    dispatch(getAllUserThunk(skip, take));
  };

  const [open, setOpen] = React.useState(false);

  return (
    <CustomTable
      getPageData={getPoints}
      total={total || 0}
      data={users}
      isAdditions={false}
      loading={appStore.status === "running"}
      headData={["Пользователь", "Рабочее время", "Магазины", "Email", ""]}
      renderRow={(row: any) => {
        return (
          <>
            <CustomTableCell component="th" align="left" scope="row">
              {formatToTableValue(row.name)}
            </CustomTableCell>
            <CustomTableCell align="center">
              {formatToTableValue(row.skip)}
            </CustomTableCell>
            <CustomTableCell align="center">
              {formatToTableValue(row.skip)}
            </CustomTableCell>
            <CustomTableCell align="center">
              {formatToTableValue(row.login)}
            </CustomTableCell>
          </>
        );
      }}
      IconClickPath={AddUserRoute}
      Icon={PersonAddAltIcon}
      IconText={"Добавить пользователя"}
    />
  );
}
