import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { CardAudioControl } from "./CardAudioControl";

interface AudioFull {
  [key: string]: string;
}

interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: AudioFull;
}

interface Props {
  data: Surah;
}

export function CardItem({ data }: Props) {
  const [enableControl, setEnableControl] = React.useState(false);

  const onClickCard = () => {
    setEnableControl(!enableControl);
  };

  return (
    <Box
      borderRadius={2}
      bgcolor="#FDFDFD"
      padding={1.5}
      onClick={onClickCard}
      sx={{
        cursor: "pointer",
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
      {enableControl && <CardAudioControl url={data.audioFull["01"]} />}
    </Box>
  );
}
