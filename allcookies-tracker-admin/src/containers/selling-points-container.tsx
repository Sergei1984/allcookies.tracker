import React from "react";

import PageTitle from "../components/page-title";

import { getSellingPointsThunk } from "../store/selling-points/thunk";
import { useDispatch, useSelector } from "react-redux";
import { selectSellingPointsStore } from "../store/selling-points/selectors";
import { SellingPointsState } from "../store/selling-points/types";
import CustomTable from "../components/custom-table";
import CustomTableCell from "../components/custom-table/custom-table-cell";
import { formatToTableValue, formatValueToDate } from "../utils";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { AddSellingPointRoute } from "../routes/urls";

interface SellingPointsContainerProps {}

const SellingPointsContainer =
  ({}: SellingPointsContainerProps): JSX.Element => {
    const dispatch = useDispatch();

    const data: SellingPointsState = useSelector(selectSellingPointsStore);

    const getPoints = (skip: number, take: number, search?: string) => {
      dispatch(
        getSellingPointsThunk({ skip: skip, take: take, search: search })
      );
    };

    return (
      <>
        <PageTitle title="Магазины" />
        <CustomTable
          getPageData={getPoints}
          total={data.total || 0}
          isAdditions={true}
          data={data.data}
          loading={data.status === "running"}
          headData={["Магазин", "Описание", "Адрес", "Добавлен", "Изменен"]}
          renderRow={(row: any) => {
            return (
              <>
                <CustomTableCell component="th" align="left" scope="row">
                  {formatToTableValue(row.title)}
                </CustomTableCell>
                <CustomTableCell align="left">
                  {formatToTableValue(row.description)}
                </CustomTableCell>
                <CustomTableCell align="center">
                  {formatToTableValue(row.address)}
                </CustomTableCell>
                <CustomTableCell align="center">
                  {formatValueToDate(row.created_at)}
                </CustomTableCell>
                <CustomTableCell align="center">
                  {formatValueToDate(row.modified_at)}
                </CustomTableCell>
              </>
            );
          }}
          IconClickPath={AddSellingPointRoute}
          Icon={AddBusinessIcon}
          IconText={"Добавить магазин"}
        />
      </>
    );
  };

export default SellingPointsContainer;
