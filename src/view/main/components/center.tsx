import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { CardItem } from "./centers/CardItem";

export function Center() {
  const [datas, setDatas] = React.useState([]); // [] is the initial state value

  const getQuranDatas = async () => {
    try {
      const response = await fetch("https://equran.id/api/v2/surat");

      const resDatas = await response.json();

      setDatas(resDatas.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getQuranDatas();
  }, []);

  return (
    <Box borderRadius={5} bgcolor="#EDF1F4" padding={2} marginY={2}>
      <Box
        // borderRadius={5}
        bgcolor="#EDF1F4"
        overflow="auto"
        height="93vh"
        className="scrollbar-hide"
      >
        <Grid container spacing={2}>
          {datas.map((item, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <CardItem data={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
