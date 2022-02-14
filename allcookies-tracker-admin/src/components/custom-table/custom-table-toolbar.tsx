import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import NestedTableOptionsList from "../more-options";
// ICONS
import CustomizedInput from "../custom-input";
import TableDotsPopover from "../popover";
import Dropdown from "../dropdown";
import {useLocation} from "react-router-dom";
import {UsersRoute} from "../../routes/urls";
import Datepicker from "../datepicker";
import moment, {Moment} from "moment";

type Order = "asc" | "desc";

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleSearchClick: (value: string) => void;
  handleChangeLimit: (values: ListType) => void;
  limit: number;
  selectedDate?: Moment | null;
  setSelectedDate?: Dispatch<SetStateAction<Moment | null>>;
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
    selectedDate,
    setSelectedDate
  } = props;
  const [searchString, setSearch] = React.useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false)

  const router = useLocation()
  const isUserPage = router.pathname === UsersRoute

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
      flexWrap={"wrap"}
      padding={"10px"}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        padding={"10px"}
        flexWrap={"wrap"}
      >
        <CustomizedInput
          value={searchString}
          onChange={handleChangeSearch}
          onClick={onClick}
        />
      </Box>
      { isUserPage && setSelectedDate &&
        <Box sx={{
          ml: 'auto',
        }}>
          <Datepicker selectedDate={selectedDate ? selectedDate : moment()} setSelectedDate={setSelectedDate}/>
        </Box>
      }

      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          padding: "10px",
        }}
      >
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
