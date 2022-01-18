import React from "react";
import {useDispatch} from "react-redux";
import {setDecrementAction, setIncrementAction} from "../../store/count/actions";
import classes from "./dashboard.module.scss";

const Dashboard: React.FC = () => {


	return (<div className={classes.wrapper}>
		<div className="App">
			<div className={classes.logo}>
				<p>LOGO</p>
			</div>
			<div className={classes.leftBar}>
			<p>Продукты</p>
			<p>Магазины</p>
			<p>Пользователи</p>
			<p>Настройки</p>
			<p>User</p>
			</div>

		</div>
	</div>);
};

export default Dashboard;
