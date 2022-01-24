import React from "react";

import PageTitle from "../components/page-title";

import {
  getSellingPointsThunk,
  changePageThunk,
} from "../store/selling-points/thunk";
import { useDispatch, useSelector } from "react-redux";
import { selectSellingPointsStore } from "../store/selling-points/selectors";
import { SellingPointsState } from "../store/selling-points/types";
import CustomTable from "../components/custom-table";

const tableHead = [
  "Магазин",
  "Описание",
  "Адрес",
  "Добавлен",
  "Изменен",
  "Доп.",
];

interface SellingPointsContainerProps {}

const SellingPointsContainer =
  ({}: SellingPointsContainerProps): JSX.Element => {
    const dispatch = useDispatch();

    const data: SellingPointsState = useSelector(selectSellingPointsStore);

    const getPoints = (skip: number, take: number) => {
      dispatch(getSellingPointsThunk({ skip: skip, take: take }));
    };
    const changePage = (page: number) => {
      dispatch(changePageThunk(page));
    };

    return (
      <>
        <PageTitle title="Магазины" />
        <CustomTable
          getPageData={getPoints}
          page={data.page}
          limit={data.limit}
          total={data.total || 0}
          data={data.data}
          loading={data.status === "running"}
          changePage={changePage}
          headData={tableHead}
        />
      </>
    );
  };

export default SellingPointsContainer;
