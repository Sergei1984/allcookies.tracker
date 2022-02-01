import React from "react";
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

  return (
    <DashboardLayout>
      <PageTitle title="Продукты" />
      <CustomTable
        getPageData={getAllProducts}
        total={products.total || 0}
        isAdditions={true}
        data={products.data}
        loading={appStore.status === "running"}
        headData={["Продукт"]}
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
                  {formatToTableValue(row.title)}
                </div>
              </CustomTableCell>
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
