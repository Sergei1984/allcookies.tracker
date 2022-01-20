import React from "react";

import SellingPointsTable from "../components/selling-points-table/sellings-points-table";
import PageTitle from "../components/page-title";

import {
  getSellingPointsThunk,
  changePageThunk,
} from "../store/selling-points/thunk";
import { useDispatch, useSelector } from "react-redux";
import AppModal from "../components/app-modal";
import { selectSellingPointsStore } from "../store/selling-points/selectors";
import { SellingPointsState } from "../store/selling-points/types";

interface SellingPointsContainerProps {}

const SellingPointsContainer =
  ({}: SellingPointsContainerProps): JSX.Element => {
    const [isOpenModal, setOpenModal] = React.useState(false);

    const dispatch = useDispatch();

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const data: SellingPointsState = useSelector(selectSellingPointsStore);

    const getPoints = (skip: number, take: number) => {
      dispatch(getSellingPointsThunk({ skip: skip, take: take }));
    };
    const changePage = (page: number) => {
      dispatch(changePageThunk(page));
    };

    return (
      <>
        <PageTitle title="Магазины" />
        <SellingPointsTable
          getPoints={getPoints}
          page={data.page}
          limit={data.limit}
          total={data.total || 0}
          data={data.data}
          loading={data.status === "running"}
          changePage={changePage}
          handleOpenModal={handleOpenModal}
        />
        <AppModal
          title="Modal"
          open={isOpenModal}
          handleClose={handleCloseModal}
        >
          Modal
        </AppModal>
      </>
    );
  };

export default SellingPointsContainer;
