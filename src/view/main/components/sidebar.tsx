import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import Image from "next/image";

import QuranIcon from "@/assets/image/quran-2.png";

export function Sidebar() {
  return (
    <Box
      border="1px solid red"
      borderRadius={5}
      height="97vh"
      bgcolor="#FDFDFD"
    >
      {/* <Box
        bgcolor="#00AB66"
        borderRadius="50%"
        width="100%"
        height={100}
        // padding={50}
      >
        <Image
          {...QuranIcon}
          alt="quran-icon"
          width={100}
          height={70}
          style={{ width: "100%" }}
        />
      </Box> */}
    </Box>
  );
}
