import React, { useState, useEffect } from "react";
import "../assets/styles/scss/dropdown.scss";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const data = [
  { id: "asdasdasd", label: "Istanbul, TR (AHL)" },
  { id: "asd3424324", label: "Paris, FR (CDG)" },
];

const Dropdown = () => {
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (id: any) => {
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedItem
          ? items.find((item: any) => item.id === selectedItem)?.label
          : "Select"}

        <ArrowBackIosIcon
          className={`icon ${isOpen && "open"}`}
          sx={{ fontSize: "14px", transition: "all 200ms ease-out" }}
        />
      </div>
      <div className={`dropdown-body ${isOpen && "open"}`}>
        {items.map((item: any) => (
          <div
            className="dropdown-item"
            onClick={(e: any) => handleItemClick(e.target.id)}
            id={item.id}
          >
            <span
              className={`dropdown-item-dot ${
                item.id == selectedItem && "selected"
              }`}
            >
              •
            </span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
