import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// import { useQuranStore } from "@/state/useQuranStore";

import { Center, Right, Left } from "./components";
import { CardAudioControl, CenterHeader } from "./components/centers";

export function Main() {
  // const { surahDetail } = useQuranStore();

  return (
    <Box
      className="scrollbar-hide"
      position="relative"
      bgcolor="#264B3C"
      minHeight="101.6vh"
      paddingX={1}
    >
      <Grid container spacing={2}>
        <Grid item md={1} lg={1}></Grid>
        <Grid item md={1} lg={2}>
          <Left />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          lg={6}
          display="flex"
          sx={{ flexDirection: "column" }}
        >
          <CenterHeader />
          <Center />
        </Grid>
        <Grid item md={1} lg={2}>
          <Right />
        </Grid>
        <Grid item md={1} lg={1}></Grid>
      </Grid>
      {/* {surahDetail && <CardAudioControl />} */}
    </Box>
  );
}
