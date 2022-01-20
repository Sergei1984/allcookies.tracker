import {DataGrid, GridColDef} from '@mui/x-data-grid';
import * as React from 'react';
import {NavLink} from "react-router-dom";
import {AddUserRoute} from "../routes/urls";


const columns: GridColDef[] = [
	{field: "user", headerName: "Пользователи", width: 400},
	{field: "worked", headerName: "Рабочее время", width: 400},
	{field: "market", headerName: "Магазины", width: 400},
	{field: "email", headerName: "email", width: 400},
]

const rows = [
	{
		id: 1,
		user: "Андрей Переулов",
		worked: "Работал: Вс 12:01 - 18:43",
		market: "Рост",
		email: "afgjnarfgij@gmail.com",
	},
	{
		id: 2,
		user: "Не Андрей Переулов",
		worked: "Работал: Вс 12:01 - 18:43",
		market: "Рост",
		email: "afgjnarfgij@gmail.com",
	},
	{
		id: 3,
		user: "точно не Андрей Переулов",
		worked: "Работал: Вс 12:01 - 18:43",
		market: "Рост",
		email: "afgjnarfgij@gmail.com",
	},
	{
		id: 4,
		user: "может быть Андрей Переулов",
		worked: "Работал: Вс 12:01 - 18:43",
		market: "Рост",
		email: "afgjnarfgij@gmail.com",
	},
	{
		id: 5,
		user: "или не Андрей Переулов",
		worked: "Работал: Вс 12:01 - 18:43",
		market: "Рост",
		email: "afgjnarfgij@gmail.com",
	},
	{
		id: 5,
		user: "или не Андрей Переулов",
		worked: "Работал: Вс 12:01 - 18:43",
		market: "Рост",
		email: "afgjnarfgij@gmail.com",
	},
	{
		id: 5,
		user: "или не Андрей Переулов",
		worked: "Работал: Вс 12:01 - 18:43",
		market: "Рост",
		email: "afgjnarfgij@gmail.com",
	},
	{
		id: 5,
		user: "или не Андрей Переулов",
		worked: "Работал: Вс 12:01 - 18:43",
		market: "Рост",
		email: "afgjnarfgij@gmail.com",
	},
	{
		id: 5,
		user: "или не Андрей Переулов",
		worked: "Работал: Вс 12:01 - 18:43",
		market: "Рост",
		email: "afgjnarfgij@gmail.com",
	},
];

export default function UserPageTable() {

	return (
			<div style={{height: '80%', width: '100%'}}>
				<NavLink to={AddUserRoute}>Добавление пользователя</NavLink>
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={5}
					rowsPerPageOptions={[5]}
					checkboxSelection
				/>
		</div>
	);
}

