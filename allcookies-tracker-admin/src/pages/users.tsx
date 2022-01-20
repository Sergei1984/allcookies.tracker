import React from "react";
import UserPageTable from "../components/user-page-table";
import DashboardLayout from "../layouts/dashboard";

const UsersPage = (): JSX.Element => {
  return (
    <DashboardLayout>
      <h3>Пользователи</h3>
      <UserPageTable />
    </DashboardLayout>
  );
};

export default UsersPage;