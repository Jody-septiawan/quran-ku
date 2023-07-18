import * as React from "react";

import Box from "@mui/material/Box";

type Props = React.PropsWithChildren;

export function CardCenterItem({ children }: Props) {
  return (
    <Box
      height="90vh"
      alignItems="center"
      justifyContent="center"
      display="flex"
    >
      {children}
    </Box>
  );
}
