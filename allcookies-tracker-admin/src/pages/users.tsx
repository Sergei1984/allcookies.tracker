import React from "react";
import PageTitle from "../components/page-title";
import UserPageTable from "../components/user-page-table";
import DashboardLayout from "../layouts/dashboard";

const UsersPage = (): JSX.Element => {
  return (
    <DashboardLayout>
      <PageTitle title="Пользователи" />
      <UserPageTable />
    </DashboardLayout>
  );
};

export default UsersPage;
