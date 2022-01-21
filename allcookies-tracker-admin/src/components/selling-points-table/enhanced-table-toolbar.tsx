import React from "react";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NestedTableOptionsList from "../more-options";
// ICONS
import CustomizedInput from "../custom-input";
import { CustomizedTableSelect } from "../table-select";
import TableDotsPopover from "../popover";

type Order = "asc" | "desc";

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  rowCount: number;
  handleOpenModal: () => void;
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (
  props: EnhancedTableToolbarProps
): JSX.Element => {
  const { numSelected } = props;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      sx={{
        padding: "10px",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          padding: "10px",
        }}
      >
        <CustomizedInput />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          padding: "10px",
        }}
      >
        <Box>
          <CustomizedTableSelect />
        </Box>
        <Box>
          <CustomizedTableSelect />
        </Box>
        <Box>
          <TableDotsPopover>
            <NestedTableOptionsList
              title={`Выбрано: ${numSelected}`}
              item={{ is_disabled: true }}
              multiple
            />
          </TableDotsPopover>
        </Box>
      </Box>
    </Box>
  );
};

export default EnhancedTableToolbar;
