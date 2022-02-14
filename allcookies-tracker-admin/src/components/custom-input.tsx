import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

interface CustomizedInputProps extends InputBaseProps {
  onClick: () => void;
}

export default function CustomizedInput({
  onClick,
  ...props
}: CustomizedInputProps) {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  function onSubmit(event: any) {
    event.preventDefault();
    onClick();
  }

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 10px 2px 16px",
        display: "flex",
        alignItems: "center",
        background: "#EFF0F6",
        borderRadius: "8px",
        width: "338px",
        boxShadow: 0,
      }}
      onSubmit={onSubmit}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Поиск"
        inputProps={{ "aria-label": "Поиск" }}
        value={value}
        onChange={handleChange}
        {...props}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon style={{ color: "#42A6A6" }} />
      </IconButton>
    </Paper>
  );
}
