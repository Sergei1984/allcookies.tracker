import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddUserRoute } from "../routes/urls";
import { RootStore } from "../store/rootStore";
import { getAllUserThunk } from "../store/users/thunk/getAllUserThunk";
import { formatToTableValue } from "../utils";
import CustomTable from "./custom-table";
import CustomTableCell from "./custom-table/custom-table-cell";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { getAppStoreSelector } from "../store/app/selectors";
import {useEffect, useState} from "react";
import moment, {Moment} from "moment";

export default function UserPageTable() {
  const dispatch = useDispatch();

  const { data, total } = useSelector((state: RootStore) => state.userStore);

  const appStore = useSelector(getAppStoreSelector);

  const getUsers = (skip: number, take: number, search?: string) => {
    dispatch(getAllUserThunk(skip, take, search));
  };

  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState<Moment | null>(moment());

  return (
    <CustomTable
      getPageData={getUsers}
      total={total || 0}
      data={data}
      isAdditions={false}
      hasCollapseRow
      loading={appStore.status === "running"}
      headData={["Пользователь", "Email", ""]}
      renderRow={(row: any) => {
        return (
          <>
            <CustomTableCell component="th" align="left" scope="row">
              {formatToTableValue(row.name)}
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
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
    />
  );
}
