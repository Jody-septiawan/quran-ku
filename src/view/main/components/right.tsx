import * as React from "react";

import Stack from "@mui/material/Stack";

import { MediaPlayer, Search } from "./rights";

import { useQuranStore } from "@/state/useQuranStore";

export function Right() {
  const { surahDetail } = useQuranStore();

  return (
    <Stack position="sticky" top={10} gap={2}>
      <Search />
      {surahDetail && <MediaPlayer />}
    </Stack>
  );
}
