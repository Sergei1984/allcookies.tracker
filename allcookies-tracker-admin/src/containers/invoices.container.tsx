import React, { useEffect, useState } from 'react';

import PageTitle from '../components/page-title';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../components/custom-table';
import CustomTableCell from '../components/custom-table/custom-table-cell';
import { formatToTableValue } from '../utils';
import { InvoiceRoute } from '../routes/urls';
import { RootStore } from '../store/rootStore';

import { getAppStoreSelector } from '../store/app/selectors';
import { getAllUserThunk } from '../store/users/thunk/getAllUserThunk';
import moment, { Moment } from 'moment';

interface InvoicesContainerProps {}

const InvoicesContainer = ({}: InvoicesContainerProps): JSX.Element => {
  const dispatch = useDispatch();

  const { data, total } = useSelector((state: RootStore) => state.userStore);

  const appStore = useSelector(getAppStoreSelector);

  const getUsers = (skip: number, take: number, search?: string) => {
    dispatch(getAllUserThunk(skip, take, search));
  };

  const [selectedDate, setSelectedDate] = useState<Moment | null>(moment());

  return (
    <>
      <PageTitle title='Накладные' />
      <CustomTable
        getPageData={getUsers}
        total={total || 0}
        data={data}
        isAdditions={false}
        hasCollapseRow
        loading={appStore.status === 'running'}
        headData={['Пользователь', 'Накладная', 'Email', ' ']}
        renderRow={(row: any) => {
          return (
            <>
              <CustomTableCell component='th' align='left' scope='row'>
                {formatToTableValue(row.name)}
              </CustomTableCell>
              <CustomTableCell component='th' align='left' scope='row'>
                <Link
                  to={InvoiceRoute.format(row.id)}
                  style={{ color: '#42A6A6' }}
                  color='#42A6A6'
                >
                  Накладная
                </Link>
              </CustomTableCell>
              <CustomTableCell align='center'>
                {formatToTableValue(row.login)}
              </CustomTableCell>
            </>
          );
        }}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </>
  );
};

export default InvoicesContainer;
