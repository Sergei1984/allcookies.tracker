import {Field, Form, Formik} from "formik";
import React from "react";
import * as yup from 'yup';
import classes from "../assets/scss/login.module.scss";

const defaultUser = {
	firstName:'',
	lastName:'',
	email:'',
	password:''
}

const loginSchema = yup.object().shape({
	firstName: yup.string().required(''),
	lastName: yup.string().required(''),
	email: yup.string().email('некорректный email').required(''),
	password: yup.string().min(6).max(15)
})

const AddUser = () => {
	const handleLogin = (values:any): void => {
		console.log('gfdfs')
	}

	return (
		<div >
			<h1>Добавление пользователя</h1>
			<Formik
				initialValues={defaultUser}
				validationSchema={loginSchema}
				onSubmit={handleLogin}
				>
				{({errors, touched}) => (
					<Form>
						<label className={classes.firstName} htmlFor="firstName">Имя</label>
						<Field placeholder="Введите имя" />

						<label className={classes.lastName} htmlFor="lastName">Фамилия</label>
						<Field placeholder="Введите фамилию" />

						<label className={classes.email} htmlFor="login">Email</label>
						<Field name="login" className={errors.email && touched.email ? classes.inputFieldError : classes.inputField}
									 placeholder="Введите Email"/>
						{errors.email && touched.email ? (
							<p className={classes.errorEmail}>{errors.email}</p>
						) : null}

						<label className={classes.password} htmlFor="password">Пароль</label>
						<Field
									 className={errors.password && touched.password ? classes.inputFieldError : classes.inputField}
									 name="password" placeholder="Введите пароль"/>
						{errors.password && touched.password ? (
							<p className={classes.errorEmail}>некорректный пароль</p>
						) : null}

						<button className={classes.button} type="submit">Зарегистрировать</button>


					</Form>

				)}


			</Formik>
		</div>
	)
}