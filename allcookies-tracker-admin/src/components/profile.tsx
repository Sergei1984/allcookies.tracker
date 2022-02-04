import React, { useEffect } from "react";
import { Box } from "@mui/material";

import InfoField from "./info-field";
import { ProfileModel } from "../store/profile/types";

//   "id": 1,
//   "email": "seregat1984@gmail.com",
//   "name": "Serhii",
//   "account_role": "admin",
//   "iss": "allcookies.tracker",
//   "sub": "seregat1984@gmail.com",
//   "exp": 1675324885

interface ProfileProps {
  loading: boolean;
  data: any;
}

const Profile = ({ data, loading }: ProfileProps): JSX.Element => {
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [email, setEmail] = React.useState("");

  useEffect(() => {
    if (data) {
      setEmail(data?.email);
      setName(data?.name);
    }
  }, [data]);

  return (
    <Box display={"flex"} flexWrap={"wrap"}>
      <Box
        sx={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "4px",
          margin: "20px",
        }}
      >
        <Box sx={{ width: "100%", height: "auto" }}>
          <InfoField defaultValue={name} onUpdate={setName} />
          <InfoField defaultValue={surname} onUpdate={setSurname} />
          <InfoField defaultValue={email} onUpdate={setEmail} />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
