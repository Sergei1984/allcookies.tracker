import React, { useEffect } from "react";

import SellingPointsTable from "../components/selling-points-table/sellings-points-table";
import PageTitle from "../components/page-title";

import { getSellingPointsActionAsync } from "../store/selling-points/actions";
import { connect } from "react-redux";
import { RootStore } from "../store/rootStore";
import { SellingPointModel } from "../models/selling-point.model";
import AppModal from "../components/app-modal";

interface SellingPointsContainerProps {
  loading: boolean;
  getSellingPoints: () => void;
  data: Array<SellingPointModel> | [];
}

const SellingPointsContainer = ({
  getSellingPoints,
  loading,
  data,
}: SellingPointsContainerProps): JSX.Element => {
  const [isOpenModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    getSellingPoints();
  }, [getSellingPoints]);
  return (
    <>
      <PageTitle title="Магазины" />
      <SellingPointsTable
        data={data}
        loading={loading}
        handleOpenModal={handleOpenModal}
      />
      <AppModal title="Modal" open={isOpenModal} handleClose={handleCloseModal}>
        Modal
      </AppModal>
    </>
  );
};
const mapStateToProps = (state: RootStore) => ({
  loading: state.sellingPointsStore.status === "running",
  data: state.sellingPointsStore.data,
});

const mapDispatchToProps = {
  getSellingPoints: getSellingPointsActionAsync,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellingPointsContainer);
