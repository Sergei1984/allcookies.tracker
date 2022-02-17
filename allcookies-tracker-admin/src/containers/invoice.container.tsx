import React, { useEffect, useState } from 'react';
import '../assets/styles/scss/add-selling-point-form.scss';

import { useLocation, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { selectSellingPointsStore } from '../store/selling-points/selectors';
import { getAppStoreSelector } from '../store/app/selectors';
import { SellingPointsState } from '../store/selling-points/types';
import LocalStorageService from '../services/localStorage/localStorage.service';

import * as yup from 'yup';
import { InvoicesRoute } from '../routes/urls';
import Box from '@mui/material/Box';
import IconLabelButton from '../components/button-back';
import InvoiceTable from '../components/invoice-table';
import { getUsersActivityThunk } from '../store/users-activity/thunk/getUsersActivityThunk';
import moment, { Moment } from 'moment';
import { IUsersActivityData } from '../store/users-activity/types';
import { RootStore } from '../store/rootStore';
import { getCurrentDate, getDate } from '../utils';

interface InvoiceContainerProps {}

const InvoiceContainer = ({}: InvoiceContainerProps): JSX.Element => {
  const params = useParams();
  const location = useLocation();

  const dispatch = useDispatch();

  //   const data: SellingPointsState = useSelector(selectSellingPointsStore);

  const appStore = useSelector(getAppStoreSelector);

  const { data } = useSelector((state: RootStore) => state.usersActivityStore);
  const [userActivity, setUserActivity] = useState<IUsersActivityData[]>([]);
  const [id, setId] = useState();
  const [selectedDate, setSelectedDate] = useState<Moment | null>(moment());

  const lastInvoice: any = LocalStorageService.getLastInvoice();

  //   useEffect(() => {
  //     dispatch(getUsersActivityThunk(selectedDate));
  //   }, [selectedDate, dispatch]);

  //   useEffect(() => {
  //     if (data.length && id) {
  //       setUserActivity(data.filter((item) => item.created.id === id));
  //     }
  //   }, [data, id]);

  useEffect(() => {
    if (selectedDate) {
      const date = selectedDate
        ? getDate(selectedDate, 'YYYY-MM-DD')
        : getCurrentDate('YYYY-MM-DD');
      dispatch(getUsersActivityThunk(date));
    }
  }, [selectedDate, id, dispatch]);

  //   useEffect(() => {
  //     setUserActivity(
  //       data.filter((item) => {
  //         item.created.id === lastInvoice.id;
  //       })
  //     );
  //   }, [data, id]);

  useEffect(() => {
    if (lastInvoice) {
      setSelectedDate(lastInvoice.date);
      setId(lastInvoice.id);
    }
  }, [lastInvoice]);
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
