import Pagination from "@mui/material/Pagination";
import React from "react";

const AppPagination = () => {
  return (
    <div className="pagination">
      <Pagination
        color="secondary"
        count={10}
        sx={{
          ul: {
            "& .MuiPaginationItem-root": {
              color: "#8CAD78",
              background: "transparent",
              borderColor: "#8CAD78",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              color: "#fff",
              background: "#8CAD78",
            },
          },
        }}
      />
    </div>
  );
};

export default AppPagination;
