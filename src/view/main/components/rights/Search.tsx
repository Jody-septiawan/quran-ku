import * as React from "react";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import { useQuranStore } from "@/state";

export function Search() {
  const [inputValue, setInputValue] = React.useState("");

  const { setSearch } = useQuranStore();

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearch(inputValue);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [inputValue, setSearch]);

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 8px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        borderRadius: 4,
        boxShadow: "0px 0px 10px #fff",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, fontFamily: "Poppins" }}
        placeholder="Search by name or meaning"
        inputProps={{ "aria-label": "search surah" }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
