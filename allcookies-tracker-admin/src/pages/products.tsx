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
import { TextField } from "@mui/material";

interface ProductsPageProps {}

const ProductsPage = ({}: ProductsPageProps): JSX.Element => {
  const products: ProductState = useSelector(
    (store: RootStore) => store.productStore
  );
  const appStore = useSelector((state: RootStore) => state.appStore);

  const dispatch = useDispatch();
  const getAllProducts = async (
    skip: number,
    take: number,
    search?: string
  ) => {
    await dispatch(getAllProductsThunk({ skip, take, search }));
  };

  const handleDeleteProduct = async (id: number) => {
    dispatch(deleteProductThunk(id));
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

  console.log("asdasddsa", products);
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
              <CustomTableCell onClick={() => handleDeleteProduct(row.id)}>
                <DeleteIcon />
              </CustomTableCell>
              {editableRowId && editableRowId === row.id ? (
                <CustomTableCell onClick={() => handleEditProduct(null)}>
                  <DoneIcon />
                </CustomTableCell>
              ) : (
                <CustomTableCell onClick={() => handleEditProduct(row.id)}>
                  <EditIcon />
                </CustomTableCell>
              )}
            </>
          );
        }}
        IconClickPath={AddProductRoute}
        Icon={AddBusinessIcon}
        IconText={"Добавить продукт"}
      />
    </DashboardLayout>
  );
};

export default ProductsPage;
