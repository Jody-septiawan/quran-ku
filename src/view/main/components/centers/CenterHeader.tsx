import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function CenterHeader() {
  return (
    <Box
      height="5vh"
      padding={1}
      // borderRadius={3}
      marginTop={1}
      bgcolor="#DBF1EC"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        background:
          "linear-gradient(3deg, rgba(38,171,123,1) 0%, rgba(42,125,95,1) 100%)",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      <Typography
        color="white"
        sx={{
          fontWeight: "bold",
        }}
      >
        Quran-Ku
      </Typography>
    </Box>
  );
}
