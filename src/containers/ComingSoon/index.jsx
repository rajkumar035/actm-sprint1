import React from "react";
import comingsoon from "../../assets/images/coming.jpg";

const ComingSoon = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw" }}>
      <img alt="comingsoon" src={comingsoon} style={{ height: "250px", width: "max-content" }} />
    </div>
  );
};

export default ComingSoon;
