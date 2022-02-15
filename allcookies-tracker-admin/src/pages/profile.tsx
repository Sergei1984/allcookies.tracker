import React from "react";
import DashboardLayout from "../layouts/dashboard";
import ProfileContainer from "../containers/profile-container";

interface ProfilePageProps {}

const ProfilePage = ({}: ProfilePageProps): JSX.Element => {
  return (
    <DashboardLayout>
      <ProfileContainer />
    </DashboardLayout>
  );
};

export default ProfilePage;
