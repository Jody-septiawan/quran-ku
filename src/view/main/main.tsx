import * as React from "react";
import Grid from "@mui/material/Grid";

import { Center } from "./components";

export function Main() {
  const dep = React.useMemo(
    () => [
      { title: "NextJs", link: "https://nextjs.org/" },
      { title: "Material UI", link: "https://mui.com/" },
      { title: "Zustand", link: "https://zustand-demo.pmnd.rs/" },
    ],
    []
  );

  return (
    <Grid container height="100vh" bgcolor="#264B3C" paddingX={2}>
      <Grid item md={2} lg={3}></Grid>
      <Grid item md={8} lg={6}>
        <Center />
      </Grid>
      <Grid item md={2} lg={3}></Grid>
    </Grid>
  );
}
