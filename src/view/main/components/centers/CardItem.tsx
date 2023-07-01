import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useQuranStore } from "@/state/useQuranStore";
import type { Surah } from "@/types";

interface Props {
  data: Surah;
}

export function CardItem({ data }: Props) {
  const { surahDetail, setSurahDetail } = useQuranStore();

  const onClickCard = () => {
    setSurahDetail(data);
  };

  const activeCard = React.useMemo(() => {
    if (!surahDetail) return {};

    if (data.nomor === surahDetail.nomor) {
      return {
        border: "5px solid #48bf91",
      };
    } else {
      return {};
    }
  }, [data.nomor, surahDetail]);

  return (
    <Box
      borderRadius={2}
      bgcolor="#FDFDFD"
      padding={1.5}
      onClick={onClickCard}
      sx={{
        cursor: "pointer",
        border: "5px solid white",
        ...activeCard,
        "&:hover": {
          border: "5px solid #ccdbdc",
        },
      }}
    >
      <Box>
        {data.nomor}. {data.namaLatin}
      </Box>
      <Box>
        <Typography variant="h4" textAlign="end">
          {data.nama}
        </Typography>
        <Box
          textAlign="end"
          sx={{
            fontSize: "0.8rem",
            color: "#6E6E6E",
          }}
        >
          {data.arti}
        </Box>
      </Box>
    </Box>
  );
}
