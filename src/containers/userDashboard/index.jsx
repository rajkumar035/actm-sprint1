import React from "react";
import comingsoon from "../../assets/images/coming.jpg";

const UserDashboard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      <img alt="comingsoon" src={comingsoon} style={{ height: "250px", width: "max-content" }} />
    </div>
  );
};

export default UserDashboard;
