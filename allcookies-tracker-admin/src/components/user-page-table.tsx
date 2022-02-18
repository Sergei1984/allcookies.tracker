import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddUserRoute } from "../routes/urls";
import { RootStore } from "../store/rootStore";
import { getAllUserThunk } from "../store/users/thunk/getAllUserThunk";
import { formatToTableValue } from "../utils";
import CustomTable from "./custom-table";
import CustomTableCell from "./custom-table/custom-table-cell";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { getAppStoreSelector } from "../store/app/selectors";
import { useState } from "react";
import moment, { Moment } from "moment";
import { IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { deleteUserThunk } from "../store/users/thunk/deleteUserThunk";
import { editUserThunk } from "../store/users/thunk/editUserThunk";

export default function UserPageTable() {
    const dispatch = useDispatch();

    const { data, total } = useSelector((state: RootStore) => state.userStore);

    const appStore = useSelector(getAppStoreSelector);

    const getUsers = (skip: number, take: number, search?: string) => {
        dispatch(getAllUserThunk(skip, take, search));
    };

    const [selectedDate, setSelectedDate] = useState<Moment | null>(moment());

    const handleDeleteProduct = async (id: number) => {
        dispatch(deleteUserThunk(id));
    };

    const [editableRowId, setEditableRowId] = useState<number | null>(null);
    const [editableRowTitle, setEditableRowTitle] = useState<string>("");

    const handleEditProduct = (data: number | null) => {
        setEditableRowId(data);
        if (editableRowId !== null && editableRowTitle !== "") {
            dispatch(editUserThunk(editableRowId, editableRowTitle));
        }
    };

    const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditableRowTitle(e.target.value);
    };

    return (
        <CustomTable
            getPageData={getUsers}
            total={total || 0}
            data={data}
            isAdditions={false}
            hasCollapseRow={false}
            loading={appStore.status === "running"}
            headData={["Пользователь", "Email", "", "", ""]}
            renderRow={(row: any) => {
                return (
                    <>
                        <CustomTableCell component="th" align="left" scope="row">
                            {editableRowId && editableRowId === row.id ? (
                                <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    defaultValue={row.name}
                                    onChange={handleChangeUserName}
                                />
                            ) : (
                                formatToTableValue(row.name)
                            )}
                        </CustomTableCell>

                        <CustomTableCell align="center">{formatToTableValue(row.login)}</CustomTableCell>
                        <CustomTableCell onClick={() => handleDeleteProduct(row.id)}>
                            <IconButton aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </CustomTableCell>
                        {editableRowId && editableRowId === row.id ? (
                            <CustomTableCell onClick={() => handleEditProduct(null)}>
                                <IconButton aria-label="done">
                                    <DoneIcon />
                                </IconButton>
                            </CustomTableCell>
                        ) : (
                            <CustomTableCell onClick={() => handleEditProduct(row.id)}>
                                <IconButton aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                            </CustomTableCell>
                        )}
                    </>
                );
            }}
            IconClickPath={AddUserRoute}
            Icon={PersonAddAltIcon}
            IconText={"Добавить пользователя"}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
        />
    );
}
