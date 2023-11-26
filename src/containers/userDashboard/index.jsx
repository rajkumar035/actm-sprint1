import React from "react";
import comingsoon from "../../assets/images/coming.webp";
import "./index.css";

const UserDashboard = () => {
  return (
    <div className="userDashboard">
      <img alt="comingsoon" src={comingsoon} height={"250px"} width={"250px"} loading="lazy" />
    </div>
  );
};

export default UserDashboard;
