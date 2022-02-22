import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../components/custom-table";
import CustomTableCell from "../components/custom-table/custom-table-cell";
import PageTitle from "../components/page-title";
import DashboardLayout from "../layouts/dashboard";
import { AddProductRoute } from "../routes/urls";
import { getAllProductsThunk } from "../store/products/thunk/getAllProductsThunk";
import { ProductState } from "../store/products/types";
import { RootStore } from "../store/rootStore";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { formatToTableValue } from "../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { deleteProductThunk } from "../store/products/thunk/deleteProductThunk";
import { editProductThunk } from "../store/products/thunk/editProductThunk";
import { TextField, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AppModal from "../components/app-modal";

interface ProductsPageProps {}

const ProductsPage = ({}: ProductsPageProps): JSX.Element => {
  const products: ProductState = useSelector(
    (store: RootStore) => store.productStore
  );
  const appStore = useSelector((state: RootStore) => state.appStore);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [deletingUserData, setDeletingUserData] = useState<{ id: number, name: string } | undefined>()

  const dispatch = useDispatch();
  const getAllProducts = async (
    skip: number,
    take: number,
    search?: string
  ) => {
    await dispatch(getAllProductsThunk({ skip, take, search }));
  };

  const handleConfirmDeleteProduct = (id: number, name: string) => {
    setIsDeleteModalOpen(true)
    setDeletingUserData({id, name})
  };

  const handleDeleteProduct = async () => {
    if(deletingUserData) {
      dispatch(deleteProductThunk(deletingUserData.id));
      setIsDeleteModalOpen(false)
    }
  };

  const [editableRowId, setEditableRowId] = useState<number | null>(null);
  const [editableRowTitle, setEditableRowTitle] = useState<string>("");

  const handleEditProduct = (data: number | null) => {
    setEditableRowId(data);
    if (editableRowId !== null && editableRowTitle !== "") {
      dispatch(editProductThunk(editableRowId, editableRowTitle));
    }
  };

  const handleChangeProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableRowTitle(e.target.value);
  };

  return (
    <DashboardLayout>
      <PageTitle title="Продукты" />
      <CustomTable
        getPageData={getAllProducts}
        total={products.total || 0}
        isAdditions={true}
        data={products.data.filter((item) => !item.deleted_by)}
        loading={appStore.status === "running"}
        headData={["Продукт", "", ""]}
        renderRow={(row: any) => {
          return (
            <>
              <CustomTableCell component="th" align="left">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={row.image_url}
                    alt="Image"
                    style={{
                      height: "50px",
                      width: "50px",
                      objectFit: "contain",
                      marginRight: "10px",
                    }}
                  />
                  {editableRowId && editableRowId === row.id ? (
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      defaultValue={row.title}
                      onChange={handleChangeProductName}
                    />
                  ) : (
                    formatToTableValue(row.title)
                  )}
                </div>
              </CustomTableCell>
              <CustomTableCell onClick={() => handleConfirmDeleteProduct(row.id, row.title)}>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </CustomTableCell>
              {editableRowId && editableRowId === row.id ? (
                <CustomTableCell onClick={() => handleEditProduct(null)}>
                  <IconButton aria-label="done">
                    <DoneIcon />
                  </IconButton>
                </CustomTableCell>
              ) : (
                <CustomTableCell onClick={() => handleEditProduct(row.id)}>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </CustomTableCell>
              )}
            </>
          );
        }}
        IconClickPath={AddProductRoute}
        Icon={AddBusinessIcon}
        IconText={"Добавить продукт"}
      />
      <AppModal
          open={isDeleteModalOpen}
          handleClose={() => setIsDeleteModalOpen(false)}
      >
        <Box sx={{mb: 2}}>
          Вы действительно хотите удалить продукт {deletingUserData && deletingUserData.name}?
        </Box>
        <Button
            sx={{
              width: 'calc(50% - 10px)',
              mr: '20px',
              backgroundColor: '#42A6A6',
              "&:hover": {
                background: "#42A6A6",
              },
            }}
            variant="contained"
            onClick={handleDeleteProduct}
        >
          Да
        </Button>
        <Button
            sx={{
              width: 'calc(50% - 10px)',
              border: '1px solid #42a6a6',
              color: '#42a6a6',
              "&:hover": {
                border: '1px solid #42a6a6',
              },
            }}
            variant="outlined"
            onClick={() => setIsDeleteModalOpen(false)}
        >
          Нет
        </Button>
      </AppModal>
    </DashboardLayout>
  );
};

export default ProductsPage;
