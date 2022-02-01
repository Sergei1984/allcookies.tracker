import React from "react";
import Box from "@mui/material/Box";
import NestedTableOptionsList from "../more-options";
// ICONS
import CustomizedInput from "../custom-input";
import TableDotsPopover from "../popover";
import Dropdown from "../dropdown";

type Order = "asc" | "desc";

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleSearchClick: (value: string) => void;
  handleChangeLimit: (values: ListType) => void;
  onChangeSort: (sortValue: string) => void;
  limit: number;
  sortBy?: string;
  sortByList?: Array<any>;
}

type ListType = {
  id: string | number;
  value: string | number;
  label: string;
};

const CustomTableToolbar = (props: EnhancedTableToolbarProps): JSX.Element => {
  const {
    numSelected,
    handleSearchClick,
    handleChangeLimit,
    limit,
    sortBy,
    sortByList,
    onChangeSort,
  } = props;
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
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          padding: "10px",
        }}
      >
        <Box>
          <Dropdown
            title="Все магазины"
            list={[
              { id: "1", value: "АТБ", label: "АТБ" },
              { id: "2", value: "СИЛЬПО", label: "СИЛЬПО" },
              { id: "3", value: "РОСТ", label: "РОСТ" },
            ]}
            onChange={(value: any) => {
              console.log("on change value: ", value);
            }}
          />
        </Box>
        <Box>
          <Dropdown
            title={"Сортировать по"}
            list={sortByList}
            selected={sortBy}
            onChange={(value: any) => {
              onChangeSort(String(value));
            }}
          />
        </Box>
        <Box>
          <Dropdown
            title="Кол-во"
            list={[
              { id: "1", value: 5, label: "5" },
              { id: "2", value: 10, label: "10" },
              { id: "3", value: 15, label: "15" },
              { id: "4", value: 25, label: "25" },
              { id: "5", value: 50, label: "50" },
            ]}
            selected={limit}
            onChange={(value: any) => {
              handleChangeLimit(value);
            }}
          />
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
