import Pagination from "@mui/material/Pagination";
import React from "react";

const AppPagination = ({ data, count, currentindex, handlePageChange }) => {
  return (
    <div className="pagination">
      <Pagination
        color="secondary"
        count={Math.ceil(data?.length / count)}
        page={currentindex}
        onChange={handlePageChange}
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
