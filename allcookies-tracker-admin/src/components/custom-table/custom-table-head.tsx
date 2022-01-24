import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
// ICONS
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import CustomCheckbox from "../custom-checkbox";
import { AddSellingPointRoute } from "../../routes/urls";

type Order = "asc" | "desc";

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  rowCount: number;
  headData: Array<string>;
}

const CustomTableHead = (props: EnhancedTableProps): JSX.Element => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(AddSellingPointRoute);
  };

  const { onSelectAllClick, order, numSelected, rowCount, headData } = props;

  return (
    <TableHead>
      <TableRow
        style={{ backgroundColor: "#EFF0F6", boxShadow: "0px 1px 0px #DADBE4" }}
      >
        <TableCell
          padding="checkbox"
          style={{
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "140%",
            letterSpacing: "-0.3px",
            color: "#767676",
          }}
        >
          <CustomCheckbox
            style={{ color: "#67cfcf" }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all points",
            }}
          />
        </TableCell>
        {headData?.map((item, index) => {
          return (
            <TableCell key={index} align="center">
              {item}
            </TableCell>
          );
        })}
        {/* <TableCell align="left">Магазин</TableCell>
        <TableCell align="left">Описание</TableCell>
        <TableCell align="center">Адрес</TableCell>
        <TableCell align="center">Добавлен</TableCell>
        <TableCell align="center">Изменен</TableCell>
        <TableCell align="right">Доп.</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell colSpan={7}>
          <Button
            sx={{
              color: "#767676",
              fontSize: "14px",
              textTransform: "capitalize",
              letterSpacing: "-0.3px",
              lineHeight: "140%",
              fontWeight: 500,
            }}
            onClick={handleBackClick}
          >
            <AddBusinessIcon sx={{ color: "#42A6A6", ml: 2, mr: 1 }} />
            Добавить магазин
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;
