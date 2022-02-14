import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

const BackBoxLabel = styled(Box)(() => ({
    marginTop: "15px",
  marginBottom: "29px",
  "&:hover": {
    cursor: "pointer",
  },
}));

interface IconLabelButtonProps {
  path: string;
  text: string;
}

const IconLabelButton = ({ path, text }: IconLabelButtonProps) => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <BackBoxLabel
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
      onClick={handleClick}
    >
      <ArrowBackIosIcon
        sx={{ fontSize: "14px", color: "#171717", marginRight: "17px" }}
      />

      <Typography
        variant="h4"
        component="p"
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
          lineHeight: "34px",
          color: "#171717",
        }}
      >
        {text}
      </Typography>
    </BackBoxLabel>
  );
};

export default IconLabelButton;
