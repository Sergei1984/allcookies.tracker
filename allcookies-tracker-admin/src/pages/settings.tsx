import React from "react";
import DashboardLayout from "../layouts/dashboard";

interface SettingsPageProps {}

const SettingsPage = ({}: SettingsPageProps): JSX.Element => {
  return (
    <DashboardLayout>
      <h3>Settings page</h3>
    </DashboardLayout>
  );
};

export default SettingsPage;
