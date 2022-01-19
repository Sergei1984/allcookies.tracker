import React from "react";
import DashboardLayout from "../layouts/dashboard";

import SellingPointsContainer from "../containers/selling-points-container";

interface SellingPointsPageProps {}

const SellingPointsPage = ({}: SellingPointsPageProps): JSX.Element => {
  return (
    <DashboardLayout>
      <SellingPointsContainer />
    </DashboardLayout>
  );
};

export default SellingPointsPage;
