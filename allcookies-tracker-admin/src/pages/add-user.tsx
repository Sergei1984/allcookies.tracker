import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import classes from "../assets/styles/scss/addUser.module.scss";
import DashboardLayout from "../layouts/dashboard";
import { UsersRoute } from "../routes/urls";
import { createUserThunk } from "../store/users/thunk/createUserThunk";
import IconLabelButton from "../components/button-back";

const defaultUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const loginSchema = yup.object().shape({
  firstName: yup.string().required(""),
  lastName: yup.string().required(""),
  email: yup.string().email("некорректный email").required(""),
  password: yup.string().min(6).max(15),
});

const AddUser = () => {
  const dispatch = useDispatch();
  const handleUser = (values: any) => {
    const data = {
      name: values.firstName + " " + values.lastName,
      login: values.email,
      password: values.password,
      is_blocked: false,
    };
    dispatch(createUserThunk(data));
  };
  return (
    <DashboardLayout>
      <div>
        <IconLabelButton path={UsersRoute} text="Добавление пользователя" />
        <Formik
          initialValues={defaultUser}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            handleUser(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className={classes.fromAddUser}>
              <div className={classes.value}>
                <div className={classes.firstName}>
                  <label htmlFor="firstName">Имя</label>
                  <Field name="firstName" placeholder="Введите имя" />

                  <label className={classes.lastname} htmlFor="lastName">
                    Фамилия
                  </label>
                  <Field name="lastName" placeholder="Введите фамилию" />
                </div>
                <div className={classes.email}>
                  <label htmlFor="email">Email</label>
                  <Field
                    name="email"
                    className={
                      errors.email && touched.email
                        ? classes.inputFieldError
                        : classes.inputField
                    }
                    placeholder="Введите Email"
                  />
                  {errors.email && touched.email ? (
                    <p className={classes.errorEmail}>{errors.email}</p>
                  ) : null}

                  <label htmlFor="password">Пароль</label>
                  <Field
                    className={
                      errors.password && touched.password
                        ? classes.inputFieldError
                        : classes.inputField
                    }
                    name="password"
                    placeholder="Введите пароль"
                  />
                  {errors.password && touched.password ? (
                    <p className={classes.errorEmail}>некорректный пароль</p>
                  ) : null}
                </div>
              </div>
              <button className={classes.button} type="submit">
                Зарегистрировать
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </DashboardLayout>
  );
};

export default AddUser;
