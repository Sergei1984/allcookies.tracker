import React from 'react';

import InvoicesContainer from '../containers/invoices.container';
import DashboardLayout from '../layouts/dashboard';

interface InvoicesPageProps {}

const InvoicesPage = ({}: InvoicesPageProps): JSX.Element => {
  return (
    <DashboardLayout>
      <InvoicesContainer />
    </DashboardLayout>
  );
};

export default InvoicesPage;
