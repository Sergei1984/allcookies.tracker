import React from "react";
import Box from "@mui/material/Box";
import NestedTableOptionsList from "../more-options";
// ICONS
import CustomizedInput from "../custom-input";
import { CustomizedTableSelect } from "../table-select";
import TableDotsPopover from "../popover";

type Order = "asc" | "desc";

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleSearchClick: (value: string) => void;
}

const CustomTableToolbar = (props: EnhancedTableToolbarProps): JSX.Element => {
  const { numSelected, handleSearchClick } = props;
  const [searchString, setSearch] = React.useState("");

  const handleChangeSearch = (event: any) => {
    setSearch(event.target.value);
  };

  const onClick = () => {
    handleSearchClick(searchString);
  };

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
        <CustomizedInput
          value={searchString}
          onChange={handleChangeSearch}
          onClick={onClick}
        />
        {/* <Paper
          component="form"
          sx={{
            p: "2px 15px 2px 16px",
            display: "flex",
            alignItems: "center",
            background: "#EFF0F6",
            borderRadius: "8px",
            width: "338px",
            boxShadow: 0,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Поиск"
            inputProps={{ "aria-label": "Поиск" }}
            value={searchString}
            onChange={handleChangeSearch}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={() => {
              handleSearch(searchString);
            }}
          >
            <SearchIcon style={{ color: "#42A6A6" }} />
          </IconButton>
        </Paper> */}
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

export default CustomTableToolbar;
