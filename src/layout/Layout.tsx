import Head from "next/head";
import * as React from "react";

import QuranIcon from "@/assets/image/quran.png";

type Props = React.PropsWithChildren<{
  title?: string;
}>;

export const Layout = ({ children, title }: Props) => {
  const webName = "Quran-ku";
  const pageTitle = title ? `${title} | ${webName}` : webName;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" type="image/x-icon" href={QuranIcon.src} />
      </Head>
      {children}
    </>
  );
};
