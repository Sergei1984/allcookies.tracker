import React from "react";
import DashboardLayout from "../layouts/dashboard";

interface ProfilePageProps {}

const ProfilePage = ({}: ProfilePageProps): JSX.Element => {
  return (
    <DashboardLayout>
      <h3>Profile page</h3>
    </DashboardLayout>
  );
};

export default ProfilePage;
