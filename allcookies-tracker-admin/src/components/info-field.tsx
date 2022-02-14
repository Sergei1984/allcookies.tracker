import React, { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { deleteProductThunk } from "../store/products/thunk/deleteProductThunk";
import { editProductThunk } from "../store/products/thunk/editProductThunk";
import { TextField, Box, IconButton } from "@mui/material";

interface InfoFieldProps {
  value?: string | number;
  defaultValue: string | number;
  onUpdate?: (value: any) => void;
  label?: string;
  id?: string;
}

const InfoField = ({
  value,
  defaultValue,
  onUpdate,
  label,
  id,
}: InfoFieldProps): JSX.Element => {
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState(defaultValue || "");

  const handleCancel = () => {
    setEditMode(false);
    setEditValue(defaultValue);
  };
  const handleChange = (event: any) => {
    setEditValue(event.target.value);
  };
  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSubmit = () => {
    setEditMode(false);
    if (!onUpdate) {
      setEditValue(defaultValue);
    }
    if (onUpdate) {
      onUpdate(editValue);
    }
  };

  React.useEffect(() => {
    if (defaultValue) {
      setEditValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <Box sx={{ margin: "20px", padding: "10px" }}>
      <label htmlFor="name">{label}</label>
      <br />
      <TextField
        id={id ? id : `standart-${defaultValue}`}
        variant="standard"
        value={editValue}
        onChange={handleChange}
        disabled={!editMode}
      />

      {editMode && (
        <IconButton aria-label="delete" onClick={handleCancel}>
          <DoDisturbIcon sx={{ color: "red" }} />
        </IconButton>
      )}
      {editMode && (
        <IconButton aria-label="done" onClick={handleSubmit}>
          <DoneIcon sx={{ color: "green" }} />
        </IconButton>
      )}
      {!editMode && (
        <IconButton aria-label="edit" onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default InfoField;
