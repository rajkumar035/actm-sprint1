import React from "react";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useGoogleAuth } from "./contexts/GoogleAuthContext";
import { Box, Container, LinearProgress, Toolbar } from "@mui/material";

import AdminWebinars from "./containers/adminWebinars";
import AdminEvents from "./containers/adminEvents";
import AdminProjects from "./containers/adminProjects";
import UserDashboard from "./containers/userDashboard";
import CssAnimations from "./utils/animations";
import Header from "./components/Header";

const AdminDashboard = React.lazy(() => import("./containers/adminDashboard"));
const AdminHeader = React.lazy(() => import("./containers/adminHeader"));
const Home = React.lazy(() => import("./containers/home"));
const Story = React.lazy(() => import("./containers/about"));
const Events = React.lazy(() => import("./containers/events"));
const Webinars = React.lazy(() => import("./containers/webinars"));
const Projects = React.lazy(() => import("./containers/projects"));
const Offers = React.lazy(() => import("./containers/offers"));
const Mission = React.lazy(() => import("./containers/mission"));
const ComingSoon = React.lazy(() => import("./containers/ComingSoon"));

const SuspenseLoader = () => {
  return (
    <div className="suspenseLoader">
      <LinearProgress sx={{ height: "8px" }} color="primary" />
    </div>
  );
};
export const AdminMails = ["vasanthvdev@gmail.com", "vasanthnaveen2011@gmail.com", "rajkumardhandapani03@gmail.com"];
export const PrivateRoute = ({ children, userType }) => {
  const { currentUser, googleSignOut } = useGoogleAuth();
  const [adminEmails] = useState(AdminMails);
  if (userType === "admin") {
    return currentUser && adminEmails.includes(currentUser.email) ? children : googleSignOut() && <Navigate to="/" />;
  } else {
    return currentUser && !adminEmails.includes(currentUser.email) ? children : googleSignOut() && <Navigate to="/" />;
  }
};

function App() {
  window.addEventListener("mousemove", CssAnimations.customCursorOnMOuseMoveMethod);
  return (
    <React.Suspense fallback={<SuspenseLoader />}>
      <article>
        <span className="cursor" />
        <span className="cursor2" />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home id={"home"} />
                <Story id={"about"} />
                <Events id={"events"} />
                <Webinars id={"webinars"} />
                <Projects id={"projects"} />
                <Offers id={"offers"} />
                <Mission id={"missions"} />
              </>
            }
          />
          <Route path="/userregistration" element={<ComingSoon />} />
          <Route
            path="/admin/*"
            element={
              <Container disableGutters>
                <AdminHeader>
                  <Routes>
                    <Route
                      index
                      element={
                        <PrivateRoute userType="admin">
                          <AdminDashboard />
                        </PrivateRoute>
                      }
                    />
                    <Route path="/webinars" element={<AdminWebinars />} />
                    <Route path="/events" element={<AdminEvents />} />
                    <Route path="/projects" element={<AdminProjects />} />
                  </Routes>
                </AdminHeader>
              </Container>
            }
          />
          <Route
            path="/user/*"
            element={
              <Container disableGutters>
                <Box>
                  <Toolbar>
                    <AdminHeader />
                  </Toolbar>
                  <Routes>
                    <Route
                      index
                      element={
                        <PrivateRoute userType="user">
                          <UserDashboard />
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </Box>
              </Container>
            }
          />
        </Routes>
      </article>
    </React.Suspense>
  );
}
export default App;
