import React from "react";
import DashboardLayout from "../layouts/dashboard";
import UserPageTable from "../components/user-page-table";

const UsersPage = (): JSX.Element => {
  return (
    <DashboardLayout>
      <h3>Users page</h3>
      <UserPageTable />
    </DashboardLayout>
  );
};

export default UsersPage;
