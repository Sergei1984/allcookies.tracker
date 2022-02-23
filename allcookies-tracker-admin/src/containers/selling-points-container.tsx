import React, { useEffect } from "react";

import PageTitle from "../components/page-title";

import { IconButton } from "@mui/material";

import {
  getSellingPointsThunk,
  deleteSellingPointThunk,
  displaySellingPointThunk,
  editSellingPointThunk,
} from "../store/selling-points/thunk";
import { useDispatch, useSelector } from "react-redux";
import { selectSellingPointsStore } from "../store/selling-points/selectors";
import { SellingPointsState } from "../store/selling-points/types";
import CustomTable from "../components/custom-table";
import CustomTableCell from "../components/custom-table/custom-table-cell";
import { formatToTableValue, formatValueToDate } from "../utils";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { AddSellingPointRoute } from "../routes/urls";
import { RootStore } from "../store/rootStore";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

import DoDisturbIcon from "@mui/icons-material/DoDisturb";

import { TextField } from "@mui/material";

interface SellingPointsContainerProps {}

const SellingPointsContainer =
  ({}: SellingPointsContainerProps): JSX.Element => {
    const dispatch = useDispatch();

    const data: SellingPointsState = useSelector(selectSellingPointsStore);
    const appStore = useSelector((state: RootStore) => state.appStore);

    const getPoints = (skip: number, take: number, search?: string) => {
      dispatch(
        getSellingPointsThunk({ skip: skip, take: take, search: search })
      );
    };

    const [editableRowId, setEditableRowId] = React.useState<number | null>(
      null
    );
    const [editableRowTitle, setEditableRowTitle] = React.useState<string>("");
    const [editableRowDescription, setEditableRowDescription] =
      React.useState<string>("");

    const handleEditSellingPoint = (data: number | null) => {
      setEditableRowId(data);
      if (
        editableRowId !== null &&
        (editableRowTitle !== "" || editableRowDescription !== "")
      ) {
        dispatch(
          editSellingPointThunk(editableRowId, {
            title: editableRowTitle,
            description: editableRowDescription,
          })
        );
      }
    };
    const handleChangeShowHidePoint = (id: number, is_disabled: boolean) => {
      dispatch(displaySellingPointThunk(id, !is_disabled));
    };
    const handleDeleteSellingPoint = (id: number) => {
      dispatch(deleteSellingPointThunk({ id: id }));
    };
    const handleCancel = () => {
      setEditableRowId(null);
    };
    const handleChangePointName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditableRowTitle(e.target.value);
    };
    const handleChangePointDescription = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setEditableRowDescription(e.target.value);
    };

    return (
      <>
        <PageTitle title="Магазины" />
        <CustomTable
          getPageData={getPoints}
          total={data.total || 0}
          isAdditions={true}
          data={data.data}
          loading={appStore.status === "running"}
          headData={[
            "Магазин",
            "Описание",
            "Адрес",
            "Добавлен",
            "Изменен",
            " ",
          ]}
          changeVisibilityItem={handleChangeShowHidePoint}
          deleteItem={handleDeleteSellingPoint}
          renderRow={(row: any) => {
            return (
              <>
                <CustomTableCell component="th" align="left" scope="row" className={row.deleted_by && 'disabled'}>
                  {editableRowId && editableRowId === row.id ? (
                    <TextField
                      id={String(row.id)}
                      variant="standard"
                      defaultValue={row.title}
                      onChange={handleChangePointName}
                    />
                  ) : (
                    formatToTableValue(row.title)
                  )}
                </CustomTableCell>
                <CustomTableCell align="left" className={row.deleted_by && 'disabled'}>
                  {editableRowId && editableRowId === row.id ? (
                    <TextField
                      id={String(row.id) + row.description}
                      variant="standard"
                      defaultValue={row.description ?? ""}
                      onChange={handleChangePointDescription}
                    />
                  ) : (
                    formatToTableValue(row.description)
                  )}
                  {/* {formatToTableValue(row.description)} */}
                </CustomTableCell>
                <CustomTableCell align="center" className={row.deleted_by && 'disabled'}>
                  {formatToTableValue(row.address)}
                </CustomTableCell>
                <CustomTableCell align="center" className={row.deleted_by && 'disabled'}>
                  {formatValueToDate(row.created_at)}
                </CustomTableCell>
                <CustomTableCell align="center" className={row.deleted_by && 'disabled'}>
                  {formatValueToDate(row.modified_at)}
                </CustomTableCell>
                <CustomTableCell>
                  {editableRowId && editableRowId === row.id ? (
                    <>
                      <IconButton aria-label="cancel" onClick={handleCancel}>
                        <DoDisturbIcon />
                      </IconButton>
                      <IconButton
                        aria-label="save"
                        onClick={() => handleEditSellingPoint(null)}
                      >
                        <DoneIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditSellingPoint(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </CustomTableCell>
              </>
            );
          }}
          IconClickPath={AddSellingPointRoute}
          Icon={AddBusinessIcon}
          IconText={"Добавить магазин"}
        />
      </>
    );
  };

export default SellingPointsContainer;
