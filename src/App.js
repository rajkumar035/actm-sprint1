import React from "react";
import { Route, Routes } from "react-router-dom";
import { LinearProgress } from "@mui/material";
const Home = React.lazy(() => import("./containers/home"));
const Story = React.lazy(() => import("./containers/about"));
const Offers = React.lazy(() => import("./containers/offers"));
const Mission = React.lazy(() => import("./containers/mission"));
const Webinars = React.lazy(() => import("./containers/webinars"));
const Events = React.lazy(() => import("./containers/events"));

const SuspenseLoader = () => {
  return (
    <div className="suspenseLoader">
      <LinearProgress sx={{ height: "8px" }} color="primary" />
    </div>
  );
};

function App() {
  return (
    <React.Suspense fallback={<SuspenseLoader />}>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/about" element={<Story />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/missions" element={<Mission />} />
        <Route path="/webinars" element={<Webinars />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
