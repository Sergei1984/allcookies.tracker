import React, { useEffect } from "react";

import PageTitle from "../components/page-title";

import { useDispatch, useSelector } from "react-redux";
import { selectSellingPointsStore } from "../store/selling-points/selectors";
import { SellingPointsState } from "../store/selling-points/types";
import CustomTable from "../components/custom-table";
import CustomTableCell from "../components/custom-table/custom-table-cell";
import { formatToTableValue, formatValueToDate } from "../utils";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { AddSellingPointRoute } from "../routes/urls";
import { RootStore } from "../store/rootStore";
import Profile from "../components/profile";
import useFilters from "../hooks/useFilters";
import { getProfileThunk } from "../store/profile/thunk/get-profile";
import { getProfileStore } from "../store/profile/selectors";
import { ProfileState } from "../store/profile/types";

interface ProfileContainerProps {}

const ProfileContainer = ({}: ProfileContainerProps): JSX.Element => {
  const dispatch = useDispatch();

  const data: ProfileState = useSelector(getProfileStore);
  const { status, error } = useSelector((state: RootStore) => state.appStore);

  const getProfileData = () => {
    dispatch(getProfileThunk());
  };

  const { filters, addOrRemoveFilter } = useFilters();

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <>
      <PageTitle title="Профиль" />
      <Profile data={data} loading={status === "running"} />
    </>
  );
};

export default ProfileContainer;
