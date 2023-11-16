import { Box, CircularProgress } from "@mui/material";
import React from "react";
import "./index.css";

const Loader = () => {
  return (
    <Box component={"div"} bgcolor={"rgba(0, 0, 0, 0.3)"} className={"loader-container"}>
      <CircularProgress sx={{ color: `#8cad78 !important` }} />
    </Box>
  );
};

export default Loader;
