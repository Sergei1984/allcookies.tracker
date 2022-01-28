import React, { useState, useEffect } from "react";
import "../assets/styles/scss/dropdown.scss";

import CheckIcon from "@mui/icons-material/Check";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const data = [
  { id: "asdasdasd", label: "Пушкинская asdasdasda" },
  { id: "asd3424324", label: "Районная" },
  { id: "a3sd3424324", label: "Петровасильевка" },
  { id: "asd34424324", label: "Тактильная" },
  { id: "asd34s24324", label: "Парижская 44" },
];

interface DropdownProps {
  title?: string;
}

const Dropdown = ({ title }: DropdownProps): JSX.Element => {
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (id: any) => {
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
  };

  return (
    <div className="dropdown">
      <div
        className="dropdown-header"
        onClick={toggleDropdown}
        style={{ wordWrap: "break-word" }}
      >
        <span className="header-text">
          {selectedItem
            ? items.find((item: any) => item.id === selectedItem)?.label
            : title
            ? title
            : "Выбрать"}
        </span>
        <span className={`icon ${isOpen && "open"}`}>
          <KeyboardArrowUpIcon />
        </span>
      </div>
      <div className={`dropdown-body ${isOpen && "open"}`}>
        {items.map((item: any) => (
          <div
            key={item.id}
            className="dropdown-item"
            onClick={(e: any) => handleItemClick(e.target.id)}
            id={item.id}
          >
            <span
              className={`dropdown-item-dot ${
                item.id == selectedItem && "selected"
              }`}
            >
              <CheckIcon />
            </span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
