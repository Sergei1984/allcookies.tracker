import React from "react";
import "../assets/styles/scss/add-selling-point-form.scss";

import { addSellingPointThunk } from "../store/selling-points/thunk";
import { useDispatch, useSelector } from "react-redux";
import { selectSellingPointsStore } from "../store/selling-points/selectors";
import { SellingPointsState } from "../store/selling-points/types";

import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { SellingPointsRoute } from "../routes/urls";
import Box from "@mui/material/Box";
import IconLabelButton from "../components/button-back";

const defaultUser = {
  title: "",
  address: "",
  is_disabled: false,
};

const loginSchema = yup.object().shape({
  title: yup.string().required("Заполните это поле"),
  address: yup.string().required("Заполните это поле"),
  is_disabled: yup.boolean().required().default(false),
});

interface SellingPointsContainerProps {}

const AddSellingPointContainer =
  ({}: SellingPointsContainerProps): JSX.Element => {
    const dispatch = useDispatch();

    const data: SellingPointsState = useSelector(selectSellingPointsStore);

    const handleAddPoint = (values: any) => {
      dispatch(addSellingPointThunk(values));
    };

    return (
      <>
        <IconLabelButton path={SellingPointsRoute} text="Добавление магазина" />
        <Box className="add-selling-point-form">
          <Formik
            initialValues={defaultUser}
            validationSchema={loginSchema}
            onSubmit={handleAddPoint}
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
                    <label htmlFor="title" className="input-label">
                      Магазин
                    </label>
                    <Field name="title" className="input-field" />
                    <p
                      className={`error ${
                        errors?.title && touched.title ? "show" : ""
                      }`}
                    >
                      {errors?.title ? errors.title : " "}
                    </p>
                  </Box>
                  <Box>
                    <label htmlFor="address" className="input-label">
                      Адрес
                    </label>
                    <Field name="address" className="input-field" />
                    <p
                      className={`error ${
                        errors?.address && touched.address ? "show" : ""
                      }`}
                    >
                      {errors?.address ? errors?.address : " "}
                    </p>
                  </Box>
                </Box>

                <button
                  type="submit"
                  disabled={data.status === "running"}
                  className="input-button"
                >
                  Добавить
                </button>
              </Form>
            )}
          </Formik>
        </Box>
      </>
    );
  };

export default AddSellingPointContainer;
