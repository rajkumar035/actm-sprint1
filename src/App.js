import React from 'react';
import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { useGoogleAuth } from './contexts/GoogleAuthContext';
import { Box, Container, LinearProgress, Toolbar } from '@mui/material';

//mathiko rasa
import AdminWebinars from './containers/adminWebinars';
import AdminEvents from './containers/adminEvents';
import AdminProjects from './containers/adminProjects';
import UserDashboard from './containers/userDashboard';

const Home = React.lazy(() => import('./containers/home'));
const Story = React.lazy(() => import('./containers/about'));
const Offers = React.lazy(() => import('./containers/offers'));
const Mission = React.lazy(() => import('./containers/mission'));
const Webinars = React.lazy(() => import('./containers/webinars'));
const Events = React.lazy(() => import('./containers/events'));
const AdminDashboard = React.lazy(() => import('./containers/adminDashboard'));
const AdminHeader = React.lazy(() => import('./containers/adminHeader'));

const SuspenseLoader = () => {
  return (
    <div className='suspenseLoader'>
      <LinearProgress sx={{ height: '8px' }} color='primary' />
    </div>
  );
};
export const AdminMails = [
  'vasanthvdev@gmail.com',
  'vasanthnaveen2011@gmail.com',
];
export const PrivateRoute = ({ children, userType }) => {
  const { currentUser, googleSignOut } = useGoogleAuth();
  const [adminEmails] = useState(AdminMails);
  console.log(userType);
  if (userType === 'admin') {
    return currentUser && adminEmails.includes(currentUser.email)
      ? children
      : googleSignOut() && <Navigate to='/' />;
  } else {
    return currentUser && !adminEmails.includes(currentUser.email)
      ? children
      : googleSignOut() && <Navigate to='/' />;
  }
};

function App() {
  return (
    <React.Suspense fallback={<SuspenseLoader />}>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Home />
              <Story />
              <Offers />
              <Mission />
              <Webinars />
              <Events />
            </>
          }
        />
        <Route
          path='/admin/*'
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
                      <PrivateRoute userType='admin'>
                        <AdminDashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route path='/webinars' element={<AdminWebinars />} />
                  <Route path='/events' element={<AdminEvents />} />
                  <Route path='/projects' element={<AdminProjects />} />
                </Routes>
              </Box>
            </Container>
          }
        />
        <Route
          path='/user/*'
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
                      <PrivateRoute userType='user'>
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
    </React.Suspense>
  );
}
export default App;
