import { Box } from "@mui/material";
import React from "react";

//   "id": 1,
//   "email": "seregat1984@gmail.com",
//   "name": "Serhii",
//   "account_role": "admin",
//   "iss": "allcookies.tracker",
//   "sub": "seregat1984@gmail.com",
//   "exp": 1675324885

interface ProfileProps {}

const Profile = ({}: ProfileProps): JSX.Element => {
  return (
    <Box display={"flex"} flexWrap={"wrap"}>
      <Box
        sx={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "4px",
          margin: "20px",
        }}
      >
        <Box sx={{ width: "300px", height: "100px" }}></Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "4px",
          margin: "20px",
        }}
      >
        <Box sx={{ width: "300px", height: "100px" }}></Box>
      </Box>
    </Box>
  );
};

export default Profile;
