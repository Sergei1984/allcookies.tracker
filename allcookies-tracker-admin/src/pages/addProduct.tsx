import React from "react";
import "../assets/styles/scss/add-selling-point-form.scss";

import { addSellingPointThunk } from "../store/selling-points/thunk";
import { useDispatch, useSelector } from "react-redux";
import { selectSellingPointsStore } from "../store/selling-points/selectors";
import { getAppStoreSelector } from "../store/app/selectors";
import { SellingPointsState } from "../store/selling-points/types";

import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { ProductsRoute } from "../routes/urls";
import Box from "@mui/material/Box";
import IconLabelButton from "../components/button-back";
import DashboardLayout from "../layouts/dashboard";
import { createProductThunk } from "../store/products/thunk/createProductThunk";

const defaultProduct = {
  productName: "",
  urlPhoto: "",
  is_disabled: false,
};

const productSchema = yup.object().shape({
  productName: yup.string().required("Заполните это поле"),
  urlPhoto: yup.string().required("Заполните это поле"),
  is_disabled: yup.boolean().required().default(false),
});

const AddProductPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const appStore = useSelector(getAppStoreSelector);

  const handleAddProduct = async (values: any) => {
    await dispatch(createProductThunk(values));
  };

  return (
    <>
      <DashboardLayout>
        <IconLabelButton path={ProductsRoute} text="Добавление продукта" />
        <Box className="add-selling-point-form">
          <Formik
            initialValues={defaultProduct}
            validationSchema={productSchema}
            onSubmit={handleAddProduct}
          >
            {({ errors, touched }) => (
              <Form>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      marginRight: "18px",
                    }}
                  >
                    <label htmlFor="productName" className="input-label">
                      Продукт
                    </label>
                    <Field name="productName" className="input-field" />
                    <p
                      className={`error ${
                        errors?.productName && touched.productName ? "show" : ""
                      }`}
                    >
                      {errors?.productName ? errors.productName : " "}
                    </p>
                  </Box>
                  <Box>
                    <label htmlFor="urlPhoto" className="input-label">
                      URL-фото
                    </label>
                    <Field name="urlPhoto" className="input-field" />
                    <p
                      className={`error ${
                        errors?.urlPhoto && touched.urlPhoto ? "show" : ""
                      }`}
                    >
                      {errors?.urlPhoto ? errors?.urlPhoto : " "}
                    </p>
                  </Box>
                </Box>

                <button
                  type="submit"
                  disabled={appStore.status === "running"}
                  className="input-button"
                >
                  Добавить
                </button>
              </Form>
            )}
          </Formik>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default AddProductPage;
