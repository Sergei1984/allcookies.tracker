import {Field, Form, Formik} from "formik";
import React from "react";
import {useDispatch} from "react-redux";
import * as yup from 'yup';
import {authThunk} from "../../store/auth/thunk/authThunk"
import {ILogin} from '../../store/auth/types'
import classes from "./login.module.scss";


const loginSchema = yup.object().shape({
	login: yup.string().email('некорректный email').required(''),
	password: yup.string().min(6).max(15)
})


const defaultLogin = {
	login: '',
	password: '',
	rememberMe: false
}

const Login: React.FC = () => {
	const dispatch = useDispatch();



	const handleLogin = (values: ILogin): void => {
		dispatch(authThunk(values));
	}

	return (<div className={classes.wrapper}>
		<div className={classes.hello}>
			<h1>Добро пожаловать!</h1>
			<p>Войдите в свой аккаунт чтобы продолжить</p>
		</div>
		<Formik
			initialValues={defaultLogin}
			validationSchema={loginSchema}
			onSubmit={handleLogin}
		>

			{({errors, touched}) => (
				<Form className={classes.form}>
					<label className={classes.email} htmlFor="login">Email</label>
					<Field name="login" className={errors.login && touched.login ? classes.inputFieldError : classes.inputField}
								 placeholder="Введите ваш Email"/>
					{errors.login && touched.login ? (
						<p className={classes.errorEmail}>{errors.login}</p>
					) : null}

					<label className={classes.password} htmlFor="password">Пароль</label>
					<Field type="password"
								 className={errors.password && touched.password ? classes.inputFieldError : classes.inputField}
								 name="password" placeholder="Введите ваш пароль"/>
					{errors.password && touched.password ? (
						<p className={classes.errorEmail}>некорректный пароль</p>
					) : null}

					<label htmlFor="rememberMe" className={classes.rememberMe}>Запомнить меня</label>
					<Field type="checkbox" className={classes.inputField} name="checked" value="rememberMe">

					</Field>
					<button className={classes.button} type="submit">Войти</button>
				</Form>
			)}
		</Formik>
	</div>);
}

export default Login;
