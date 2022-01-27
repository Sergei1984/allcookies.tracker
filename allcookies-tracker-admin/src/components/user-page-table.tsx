import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {AddUserRoute} from "../routes/urls";
import {RootStore} from "../store/rootStore";
import {getAllUserThunk} from "../store/users/thunk/getAllUserThunk";
import {formatToTableValue} from "../utils";
import CustomTable from "./custom-table";
import CustomTableCell from "./custom-table/custom-table-cell";
import {SellingPointsState} from "../store/selling-points/types";
import {selectSellingPointsStore} from "../store/selling-points/selectors";

export default function UserPageTable() {
	const dispatch = useDispatch();
	const users = useSelector((state: RootStore) => state.userStore.users)

	React.useEffect(() => {
		(async () => {
			await dispatch(getAllUserThunk(1,10))
		})()
	}, [])
	const data: SellingPointsState = useSelector(selectSellingPointsStore);

	const getPoints = (skip: number, take: number) => {
		dispatch(getAllUserThunk(skip, take ));
	};

	return (
		<>
			<NavLink to={AddUserRoute}>Добавление пользователя</NavLink>
			<CustomTable
				getPageData={getPoints}
				total={data.total || 0}
				data={users}
				loading={data.status === "running"}
				headData={[
					"Пользователь",
					"Рабочее время",
					"Магазины",
					"Email",
				]}
				renderHead={() => {
					return <></>;
				}}
				renderRow={(row: any) => {
					return (
						<>
							<CustomTableCell component="th" align="left" scope="row">
								{formatToTableValue(row.name)}
							</CustomTableCell>
							<CustomTableCell align="center">
								{formatToTableValue(row.skip)}
							</CustomTableCell>
							<CustomTableCell align="center">
								{formatToTableValue(row.skip)}
							</CustomTableCell>
							<CustomTableCell align="center">
								{formatToTableValue(row.login)}
							</CustomTableCell>
						</>
					);
				}}
			/>
			</>
	);
}