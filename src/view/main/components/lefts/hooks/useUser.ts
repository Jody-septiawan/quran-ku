import * as React from "react";

import { CredentialResponse } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import stc from "string-to-color";

import { useUserStore } from "@/state";
import { GoogleUserInfo } from "@/types";

export const useUser = () => {
  const { googleUserInfo, setGoogleUserInfo } = useUserStore();

  const handleLogin = React.useCallback(
    (credentialResponse: CredentialResponse) => {
      localStorage.setItem(
        "userCredential",
        credentialResponse.credential as string
      );
      const decoded = jwt_decode(credentialResponse.credential as string);
      setGoogleUserInfo(decoded as GoogleUserInfo);
    },
    [setGoogleUserInfo]
  );

  const handleLogout = React.useCallback(() => {
    localStorage.removeItem("userCredential");
    setGoogleUserInfo(null);
  }, [setGoogleUserInfo]);

  const textToColor = React.useMemo(() => {
    if (!googleUserInfo) return "#fff";

    return stc(
      googleUserInfo.name +
        googleUserInfo.given_name +
        googleUserInfo.family_name
    );
  }, [googleUserInfo]);

  return {
    googleUserInfo,
    handleLogin,
    handleLogout,
    textToColor,
  };
};
