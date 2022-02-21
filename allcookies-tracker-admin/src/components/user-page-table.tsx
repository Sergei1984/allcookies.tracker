import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AddUserRoute} from "../routes/urls";
import {RootStore} from "../store/rootStore";
import {getAllUserThunk} from "../store/users/thunk/getAllUserThunk";
import {formatToTableValue} from "../utils";
import CustomTable from "./custom-table";
import CustomTableCell from "./custom-table/custom-table-cell";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {getAppStoreSelector} from "../store/app/selectors";
import {useState} from "react";
import moment, {Moment} from "moment";
import {IconButton, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import {deleteUserThunk} from "../store/users/thunk/deleteUserThunk";
import {editUserThunk} from "../store/users/thunk/editUserThunk";
import AppModal from "./app-modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function UserPageTable() {
  const dispatch = useDispatch();

  const {data, total} = useSelector((state: RootStore) => state.userStore);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [deletingUserData, setDeletingUserData] = useState<{ id: number, name: string } | undefined>()

  const appStore = useSelector(getAppStoreSelector);

  const getUsers = (skip: number, take: number, search?: string) => {
    dispatch(getAllUserThunk(skip, take, search));
  };

  const [selectedDate, setSelectedDate] = useState<Moment | null>(moment());

  const handleConfirmDeleteUser = (id: number, name: string) => {
    setIsDeleteModalOpen(true)
    setDeletingUserData({id, name})
  };

  const handleDeleteProduct = async () => {
    if (deletingUserData) {
      dispatch(deleteUserThunk(deletingUserData.id));
      setIsDeleteModalOpen(false)
    }
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
      <>
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
                    <CustomTableCell onClick={() => handleConfirmDeleteUser(row.id, row.name)}>
                      <IconButton aria-label="delete">
                        <DeleteIcon/>
                      </IconButton>
                    </CustomTableCell>
                    {editableRowId && editableRowId === row.id ? (
                        <CustomTableCell onClick={() => handleEditProduct(null)}>
                          <IconButton aria-label="done">
                            <DoneIcon/>
                          </IconButton>
                        </CustomTableCell>
                    ) : (
                        <CustomTableCell onClick={() => handleEditProduct(row.id)}>
                          <IconButton aria-label="edit">
                            <EditIcon/>
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
        <AppModal
            open={isDeleteModalOpen}
            handleClose={() => setIsDeleteModalOpen(false)}
        >
          <Box sx={{mb: 2}}>
            Вы действительно хотите удалить пользователя {deletingUserData && deletingUserData.name}?
          </Box>
          <Button
              sx={{
                width: 'calc(50% - 10px)',
                mr: '20px',
                backgroundColor: '#42A6A6',
                "&:hover": {
                  background: "#42A6A6",
                },
              }}
              variant="contained"
              onClick={handleDeleteProduct}
          >
            Да
          </Button>
          <Button
              sx={{
                width: 'calc(50% - 10px)',
                border: '1px solid #42a6a6',
                color: '#42a6a6',
                "&:hover": {
                  border: '1px solid #42a6a6',
                },
              }}
              variant="outlined"
              onClick={() => setIsDeleteModalOpen(false)}
          >
            Нет
          </Button>
        </AppModal>
      </>
  );
}
