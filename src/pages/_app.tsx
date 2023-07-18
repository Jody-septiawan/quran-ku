import * as React from "react";

import "@fontsource/poppins";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import jwt_decode from "jwt-decode";

import { useQuranStore, useUserStore } from "@/state";
import { GoogleUserInfo } from "@/types";

export default function App({ Component, pageProps }: AppProps) {
  const { setSurah, setLoading } = useQuranStore();
  const { setGoogleUserInfo, googleUserInfo } = useUserStore();

  const getQuranDatas = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("https://equran.id/api/v2/surat");

      const resDatas = await response.json();

      setSurah(resDatas.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [setLoading, setSurah]);

  const decodeGoogleUserInfo = React.useCallback(() => {
    try {
      const credential = localStorage.getItem("userCredential");

      if (credential && !googleUserInfo) {
        const decoded = jwt_decode(credential as string);
        setGoogleUserInfo(decoded as GoogleUserInfo);
      }
    } catch (error) {
      console.log(error);
    }
  }, [googleUserInfo, setGoogleUserInfo]);

  React.useEffect(() => {
    getQuranDatas();
    decodeGoogleUserInfo();
  }, [decodeGoogleUserInfo, getQuranDatas]);

  return <Component {...pageProps} />;
}
