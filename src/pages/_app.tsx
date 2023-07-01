import * as React from "react";

import "@fontsource/poppins";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { useQuranStore } from "@/state/useQuranStore";

export default function App({ Component, pageProps }: AppProps) {
  const { setSurah, setLoading } = useQuranStore();

  const getQuranDatas = async () => {
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
  };

  React.useEffect(() => {
    getQuranDatas();
  }, []);

  return <Component {...pageProps} />;
}
