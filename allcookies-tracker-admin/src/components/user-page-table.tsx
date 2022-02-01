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

export default function UserPageTable() {
  const dispatch = useDispatch();

  const { data, total } = useSelector((state: RootStore) => state.userStore);

  const appStore = useSelector(getAppStoreSelector);

  const getPoints = (skip: number, take: number, search?: string) => {
    dispatch(getAllUserThunk(skip, take, search));
  };

  const [open, setOpen] = React.useState(false);

  return (
    <CustomTable
      getPageData={getPoints}
      total={total || 0}
      data={data}
      isAdditions={false}
      hasCollapseRow
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
