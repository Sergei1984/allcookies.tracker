import React, { useEffect } from "react";

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
import { RootStore } from "../store/rootStore";
import Profile from '../components/profile';
import useFilters from "../hooks/useFilters";

interface ProfileContainerProps {}

const ProfileContainer = ({}: ProfileContainerProps): JSX.Element => {
  const dispatch = useDispatch();

  const data: SellingPointsState = useSelector(selectSellingPointsStore);
  const appStore = useSelector((state: RootStore) => state.appStore);

  const getPoints = (skip: number, take: number, search?: string) => {
    dispatch(getSellingPointsThunk({ skip: skip, take: take, search: search }));
  };

  const { filters, addOrRemoveFilter } = useFilters();

  return (
    <>
      <PageTitle title="Профиль" />
      <Profile />
    </>
  );
};

export default ProfileContainer;
