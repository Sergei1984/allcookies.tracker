import React from "react";
import DashboardLayout from "../layouts/dashboard";

interface UsersPageProps {}

const UsersPage = ({}: UsersPageProps): JSX.Element => {
  return (
    <DashboardLayout>
      <h3>Users page</h3>
    </DashboardLayout>
  );
};

export default UsersPage;
