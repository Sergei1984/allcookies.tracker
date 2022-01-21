import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import * as React from 'react';
import {NavLink} from "react-router-dom";
import {AddUserRoute} from "../routes/urls";
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "../store/rootStore";
import {getAllUserThunk} from "../store/users/thunk/getAllUserThunk";


const columns: GridColDef[] = [
	{field: "user", headerName: "Пользователи", width: 400},
	{field: "worked", headerName: "Рабочее время", width: 400},
	{field: "market", headerName: "Магазины", width: 400},
	{field: "email", headerName: "email", width: 400},
]



//const rows = [
// 	{
// 		id: 1,
// 		user: "Андрей Переулов",
// 		worked: "Работал: Вс 12:01 - 18:43",
// 		market: "Рост",
// 		email: "afgjnarfgij@gmail.com",
// 	},
// 	{
// 		id: 2,
// 		user: "Не Андрей Переулов",
// 		worked: "Работал: Вс 12:01 - 18:43",
// 		market: "Рост",
// 		email: "afgjnarfgij@gmail.com",
// 	},
// 	{
// 		id: 3,
// 		user: "точно не Андрей Переулов",
// 		worked: "Работал: Вс 12:01 - 18:43",
// 		market: "Рост",
// 		email: "afgjnarfgij@gmail.com",
// 	},
// 	{
// 		id: 4,
// 		user: "может быть Андрей Переулов",
// 		worked: "Работал: Вс 12:01 - 18:43",
// 		market: "Рост",
// 		email: "afgjnarfgij@gmail.com",
// 	},
// 	{
// 		id: 5,
// 		user: "или не Андрей Переулов",
// 		worked: "Работал: Вс 12:01 - 18:43",
// 		market: "Рост",
// 		email: "afgjnarfgij@gmail.com",
// 	},
// 	{
// 		id: 5,
// 		user: "или не Андрей Переулов",
// 		worked: "Работал: Вс 12:01 - 18:43",
// 		market: "Рост",
// 		email: "afgjnarfgij@gmail.com",
// 	},
// 	{
// 		id: 5,
// 		user: "или не Андрей Переулов",
// 		worked: "Работал: Вс 12:01 - 18:43",
// 		market: "Рост",
// 		email: "afgjnarfgij@gmail.com",
// 	},
// 	{
// 		id: 5,
// 		user: "или не Андрей Переулов",
// 		worked: "Работал: Вс 12:01 - 18:43",
// 		market: "Рост",
// 		email: "afgjnarfgij@gmail.com",
// 	},
// 	{
// 		id: 5,
// 		user: "или не Андрей Переулов",
// 		worked: "Работал: Вс 12:01 - 18:43",
// 		market: "Рост",
// 		email: "afgjnarfgij@gmail.com",
// 	},
// ];



export default function UserPageTable() {
	const dispatch = useDispatch();
	const users = useSelector((state: RootStore) => state.userStore.users)

	React.useEffect(() => {
		(async () => {
			await dispatch(getAllUserThunk())
		})()
	}, [])


	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 90 },
		{
			field: 'name',
			headerName: 'Vitaly',
			width: 150,
			editable: false,
		},
		{
			field: 'login',
			headerName: 'Login',
			width: 150,
			editable: false,
		},
		{
			field: 'is_blocked',
			headerName: 'Blocked',
			type: 'number',
			width: 110,
			editable: false,
		}
	];

	console.log(users)

	return (
			<div style={{height: '80%', width: '100%'}}>
				<NavLink to={AddUserRoute}>Добавление пользователя</NavLink>
				<DataGrid
					rows={users.flatMap(item => item.name !== 'Vitaly' ? item : [])}
					columns={columns}
					pageSize={5}
					rowsPerPageOptions={[5]}
					checkboxSelection
				/>
		</div>
	);
}

