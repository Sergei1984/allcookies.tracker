import React from 'react';
import '../assets/styles/scss/add-selling-point-form.scss';

import { useDispatch, useSelector } from 'react-redux';
import { selectSellingPointsStore } from '../store/selling-points/selectors';
import { getAppStoreSelector } from '../store/app/selectors';
import { SellingPointsState } from '../store/selling-points/types';

import * as yup from 'yup';
import { InvoicesRoute } from '../routes/urls';
import Box from '@mui/material/Box';
import IconLabelButton from '../components/button-back';
import InvoiceTable from '../components/invoice-table';

interface InvoiceContainerProps {}

const InvoiceContainer = ({}: InvoiceContainerProps): JSX.Element => {
  const dispatch = useDispatch();

  const data: SellingPointsState = useSelector(selectSellingPointsStore);

  const appStore = useSelector(getAppStoreSelector);

  const invoiceFake = {
    activity_type: 'point_check',
    created: {
      id: 335,
      login: 'test-last@gmail.com',
      name: 'Test Last',
      at: '2022-02-11T12:58:47.591027Z',
    },
    id: 346,
    location: { lat: 50.036982860470395, lon: 36.21739517703472 },
    products: [
      {
        order_quantity: 0,
        product: {
          id: 5,
          image_url: 'https://allcookies.in.ua/data/products/7.png',
          title: 'Печенье «Барвинок»',
        },
        remaining_quantity: 3,
      },
      {
        order_quantity: 0,
        product: {
          id: 2,
          image_url: 'https://allcookies.in.ua/data/pechevas-sgushh.jpg',
          title: 'Печенье "Печевасик со Сгущённым молоком"',
        },
        remaining_quantity: 4,
      },
    ],
  };

  return (
    <>
      <IconLabelButton path={InvoicesRoute} text='Накладная' />
      <Box className='invoice'>
        <InvoiceTable invoice={invoiceFake} />
      </Box>
    </>
  );
};

export default InvoiceContainer;
