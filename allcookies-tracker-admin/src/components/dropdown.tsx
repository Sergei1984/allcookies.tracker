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
  selected?: string | number;
  onChange?: (value: any) => void;
}

const Dropdown = ({
  title,
  list = [] as ListType[],
  selected,
  onChange,
}: DropdownProps): JSX.Element => {
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | number | null>(
    null
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (idx: number, id: string) => {
    selectedItem === id
      ? selectItemAndIndex(idx, id, false)
      : selectItemAndIndex(idx, id, true);

    toggleDropdown();
    if (onChange) {
      onChange(list[idx].value);
    }
  };

  const isSelected =
    !!selectedItem &&
    ((selectedIndex !== null && selectedIndex === 0) || selectedIndex !== null);
  const isSelectedText = isSelected
    ? list[selectedIndex]?.label
    : title
    ? title
    : "Выбрать";
  const selectItemAndIndex = (idx: number, id: string, flag: boolean) => {
    if (flag) {
      setSelectedItem(id);
      setSelectedIndex(idx);
    } else {
      setSelectedItem(null);
      setSelectedIndex(null);
    }
  };

  useEffect(() => {
    if (selected) {
      list?.forEach((item, index) => {
        if (selected === item.value) {
          setSelectedIndex(index);
          setSelectedItem(item.id);
        }
      });
    }
  }, []);

  return (
    <div className="dropdown">
      <div
        className="dropdown-header"
        onClick={toggleDropdown}
        style={{ wordWrap: "break-word" }}
      >
        <span className="header-text">{isSelectedText}</span>
        <span className={`icon ${isOpen && "open"}`}>
          <KeyboardArrowUpIcon />
        </span>
      </div>
      <div className={`dropdown-body ${isOpen && "open"}`}>
        {list?.map((item: any, idx: number) => (
          <div
            key={item.id}
            className="dropdown-item"
            onClick={(e: any) => handleItemClick(idx, item.id)}
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
