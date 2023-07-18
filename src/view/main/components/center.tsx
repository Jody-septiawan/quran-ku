import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useQuranStore } from "@/state/useQuranStore";

import { CardItem, WrapperCard, CardCenterItem } from "./centers";

export function Center() {
  const { surah, loading, search } = useQuranStore();

  const surahFiltered = React.useMemo(() => {
    if (surah.length === 0 || !surah) return [];

    if (search) {
      return surah.filter((item) => {
        const namaLatinLowerCase = item.namaLatin.toLowerCase();
        const namaLatinInclude = namaLatinLowerCase.includes(
          search.toLowerCase()
        );

        const artiLowerCase = item.arti.toLowerCase();
        const artiInclude = artiLowerCase.includes(search.toLowerCase());

        return namaLatinInclude || artiInclude;
      });
    }

    return surah;
  }, [search, surah]);

  return (
    <WrapperCard>
      {loading && (
        <CardCenterItem>
          <Typography>Loading...</Typography>
        </CardCenterItem>
      )}
      {!loading && surahFiltered.length === 0 && (
        <CardCenterItem>
          <Typography>Data Empty</Typography>
        </CardCenterItem>
      )}
      {!loading && surahFiltered.length > 0 && (
        <Box overflow="auto" className="scrollbar-hide" minHeight="90vh">
          <Grid container spacing={1}>
            {surahFiltered.map((item, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <CardItem data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </WrapperCard>
  );
}
