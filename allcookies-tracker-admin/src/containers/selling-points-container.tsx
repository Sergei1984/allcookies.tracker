import React from "react";

import SellingPointsTable from "../components/sellings-points-table";
import PageTitle from "../components/page-title";

interface SellingPointsContainerProps {}

const SellingPointsContainer =
  ({}: SellingPointsContainerProps): JSX.Element => {
    return (
      <>
        <PageTitle title="Магазины" />
        <SellingPointsTable />
      </>
    );
  };

export default SellingPointsContainer;
