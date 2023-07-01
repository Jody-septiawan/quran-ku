import * as React from "react";

import Box from "@mui/material/Box";

type Props = React.PropsWithChildren;

export function WrapperCard({ children }: Props) {
  return (
    <Box
      // borderRadius={5}
      bgcolor="#EDF1F4"
      padding={2}
      marginBottom={1}
      height="92vh"
      sx={{
        borderEndStartRadius: 20,
        borderEndEndRadius: 20,
      }}
    >
      {children}
    </Box>
  );
}
