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
import { getUserThunk } from '../store/users/thunk/get-user-thunk';
import moment, { Moment } from 'moment';
import { IUsersActivityData } from '../store/users-activity/types';
import { RootStore } from '../store/rootStore';
import { getCurrentDate, getDate } from '../utils';

interface InvoiceContainerProps {}

const InvoiceContainer = ({}: InvoiceContainerProps): JSX.Element => {
  const { userId, date }: any = useParams();
  const location = useLocation();

  const dispatch = useDispatch();

  const appStore = useSelector(getAppStoreSelector);
  const { user } = useSelector((state: RootStore) => state.userStore);
  const { data } = useSelector((state: RootStore) => state.usersActivityStore);
  const [userActivity, setUserActivity] = useState<IUsersActivityData[]>([]);
  const [id, setId] = useState();
  const [selectedDate, setSelectedDate] = useState<string | null>();

  const loading = appStore.status === 'running';

  useEffect(() => {
    console.log(userActivity);
  }, [userActivity]);

  useEffect(() => {
    if (data.length && id) {
      setUserActivity(
        data.filter((item) => String(item.created.id) === String(id))
      );
    }
  }, [data, id]);

  useEffect(() => {
    if (userId) {
      setId(userId);
    }
    if (date) {
      setSelectedDate(date);
    }
  }, [userId, date]);

  useEffect(() => {
    if (selectedDate) {
      const date = selectedDate
        ? getDate(selectedDate, 'YYYY-MM-DD')
        : getCurrentDate('YYYY-MM-DD');
      dispatch(getUsersActivityThunk(date));
    }
    if (id) {
      dispatch(getUserThunk(id));
    }
  }, [selectedDate, id, dispatch]);

  return (
    <>
      <IconLabelButton path={InvoicesRoute} text='Накладная' />
      <Box className='invoice'>
        {loading && 'Загрузка...'}
        {!loading && (
          <InvoiceTable
            userActivity={userActivity}
            creator={
              userActivity?.length
                ? userActivity[0].created
                : user
                ? user
                : { name: 'ИМЯ' }
            }
            date={moment(selectedDate ? selectedDate : new Date()).format(
              'DD MMM YYYY'
            )}
          />
        )}
      </Box>
    </>
  );
};

export default InvoiceContainer;
