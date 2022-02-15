import React, { useEffect, useState, useMemo } from "react";
import { getAccessToken } from "../services/localStorage/localStorage.service";

const useAuth = function () {
  const token = getAccessToken();

  const auth = useMemo(() => {
    if (!token) {
      return false;
    } else {
      return true;
    }
  }, [token]);

  return auth;
};

export default useAuth;
