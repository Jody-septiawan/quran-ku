import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { useQuranStore } from "@/state/useQuranStore";

import { Center } from "./components";
import { CardAudioControl, CenterHeader } from "./components/centers";

export function Main() {
  const { surahDetail } = useQuranStore();

  return (
    <Box position="relative">
      <Grid container height="100vh" bgcolor="#264B3C" paddingX={2}>
        <Grid item md={2} lg={3}></Grid>
        <Grid item xs={12} md={8} lg={6} display="flex" direction="column">
          <CenterHeader />
          <Center />
        </Grid>
        <Grid item md={2} lg={3}></Grid>
      </Grid>
      {surahDetail && <CardAudioControl />}
    </Box>
  );
}
