import { useDispatch, useSelector } from "react-redux";
import { setDecrementAction, setIncrementAction } from "../../store/count/actions";
import { selectCount } from "../../store/count/selectors";
import classes from "./dashboard.module.scss";
import React from "react";

const Dashboard: React.FC = () => {

	const dispatch = useDispatch();
	const count = useSelector(selectCount);

	const handleIncrement = () => {
		dispatch(setIncrementAction(1));
	};

	const handleDecrement = () => {
		dispatch(setDecrementAction(1));
	};
	return (<div className={classes.wrapper}>
		<div className="App">s
			<p>Dashboard</p>
			<p>{count}</p>
			<button onClick={handleDecrement}>-</button>
			<button onClick={handleIncrement}>+</button>
		</div>
	</div>);
};

export default Dashboard;
