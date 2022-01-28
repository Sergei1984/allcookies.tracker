import React, { useState, useEffect } from "react";
import "../assets/styles/scss/dropdown.scss";

import CheckIcon from "@mui/icons-material/Check";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

type ListType = {
  id: string | number;
  value: string | number;
  label: string;
};

interface DropdownProps {
  title?: string;
  list?: ListType[];
  defaultValue?: string | number;
  onChange?: (value: ListType | null) => void;
}

const Dropdown = ({
  title,
  list = [] as ListType[],
  defaultValue,
  onChange,
}: DropdownProps): JSX.Element => {
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | number | null>(
    null
  );
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (idx: number, id: string) => {
    setSelectedIndex(idx);
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
  };

  useEffect(() => {
    if (defaultValue && list.length > 0) {
      const defValue: ListType | any = list?.find(
        (item: ListType, idx: number) => {
          if (String(item.value) === String(defaultValue)) {
            return { index: idx, ...item };
          }
        }
      );
      if (defValue) {
        console.log(defValue);
        setSelectedItem(defValue.id);
        setSelectedIndex(defValue.index);
      }
    }
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(list[selectedIndex]);
      setSelectedItem(list[selectedIndex]?.id);
    }
  }, [selectedIndex, selectedItem, onChange]);

  return (
    <div className="dropdown">
      <div
        className="dropdown-header"
        onClick={toggleDropdown}
        style={{ wordWrap: "break-word" }}
      >
        <span className="header-text">
          {selectedItem
            ? list[selectedIndex]?.label
            : title
            ? title
            : "Выбрать"}
        </span>
        <span className={`icon ${isOpen && "open"}`}>
          <KeyboardArrowUpIcon />
        </span>
      </div>
      <div className={`dropdown-body ${isOpen && "open"}`}>
        {list?.map((item: any, idx: number) => (
          <div
            key={item.id}
            className="dropdown-item"
            onClick={(e: any) => handleItemClick(idx, e.target.id)}
            id={item.id}
          >
            <span
              className={`dropdown-item-dot ${
                item.id == selectedItem && "selected"
              }`}
            >
              <CheckIcon />
            </span>
            {String(item.label)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
