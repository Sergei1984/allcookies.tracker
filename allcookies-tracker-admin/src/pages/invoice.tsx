import React from 'react';
import DashboardLayout from '../layouts/dashboard';

import InvoiceContainer from '../containers/invoice.container';

interface InvoicePageProps {}

const InvoicePage = ({}: InvoicePageProps): JSX.Element => {
  return (
    <DashboardLayout>
      <InvoiceContainer />
    </DashboardLayout>
  );
};

export default InvoicePage;
