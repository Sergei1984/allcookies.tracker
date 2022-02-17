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

interface InvoiceContainerProps {}

const InvoiceContainer = ({}: InvoiceContainerProps): JSX.Element => {
  const dispatch = useDispatch();

  const data: SellingPointsState = useSelector(selectSellingPointsStore);

  const appStore = useSelector(getAppStoreSelector);

  return (
    <>
      <IconLabelButton path={InvoicesRoute} text='Накладная' />
      <Box className='invoice'></Box>
    </>
  );
};

export default InvoiceContainer;
