import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useQuranStore } from "@/state/useQuranStore";

import { CardItem, WrapperCard, CardCenterItem } from "./centers";

export function Center() {
  const { surah, surahDetail, loading } = useQuranStore();

  return (
    <WrapperCard>
      {loading && (
        <CardCenterItem>
          <Typography>Loading...</Typography>
        </CardCenterItem>
      )}
      {!loading && surah.length === 0 && (
        <CardCenterItem>
          <Typography>Data Empty</Typography>
        </CardCenterItem>
      )}
      {!loading && surah.length > 0 && (
        <Box overflow="auto" height="88vh" className="scrollbar-hide">
          <Grid container spacing={1}>
            {surah.map((item, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <CardItem data={item} />
              </Grid>
            ))}
            {surahDetail && (
              <Grid item xs={12} sm={6} lg={4}>
                <Box height={50}></Box>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </WrapperCard>
  );
}
