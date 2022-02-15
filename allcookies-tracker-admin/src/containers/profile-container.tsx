import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import PageTitle from "../components/page-title";
import Profile from "../components/profile";

import { RootStore } from "../store/rootStore";
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
