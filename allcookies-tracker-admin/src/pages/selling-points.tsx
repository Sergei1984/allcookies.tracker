import React from "react";
import DashboardLayout from "../layouts/dashboard";

import SellingPointsTable from "../components/sellings-points-table";

interface SellingPointsPageProps {}

const SellingPointsPage = ({}: SellingPointsPageProps): JSX.Element => {
  return (
    <DashboardLayout>
      <h3>SellingPoints page</h3>
      <SellingPointsTable />
    </DashboardLayout>
  );
};

export default SellingPointsPage;
