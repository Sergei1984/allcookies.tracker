import React from 'react';
import DashboardLayout from '../layouts/dashboard';

import AddSellingPointContainer from '../containers/add-selling-point-container';

interface AddSellingPointPageProps {}

const AddSellingPointPage = ({}: AddSellingPointPageProps): JSX.Element => {
  return (
    <DashboardLayout>
      <AddSellingPointContainer />
    </DashboardLayout>
  );
};

export default AddSellingPointPage;
