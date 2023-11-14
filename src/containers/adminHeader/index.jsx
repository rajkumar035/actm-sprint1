import React, { useState, Fragment } from 'react';
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  IconButton,
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useGoogleAuth } from '../../contexts/GoogleAuthContext';

const drawerWidth = 240;

const AppHeaderAdminData = [
  {
    headerMenuItems: [
      {
        text: 'Dashboard',
        icon: '',
        path: '/admin/',
      },
      {
        text: 'Events',
        icon: '',
        path: '/admin/events',
      },

      {
        text: 'Webinars',
        icon: '',
        path: '/admin/webinars',
      },
      {
        text: 'Projects',
        icon: '',
        path: '/admin/projects',
      },
      {
        text: 'Visit Site',
        icon: '',
        path: '/',
      },
    ],
  },
];

const AppHeaderUserData = [
  {
    headerMenuItems: [
      {
        text: 'Dashboard',
        icon: '',
        path: '/user/',
      },
      {
        text: 'Visit Site',
        icon: '',
        path: '/',
      },
    ],
  },
];

const useStyles = () => {
  const theme = useTheme();

  return {
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      visibility: 'visible', // 'show' should be 'visible'
      [theme.breakpoints.up('md')]: {
        visibility: 'hidden',
        display: 'none',
      },
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: 'flex',
    },
    respTitle: {
      flexGrow: 1,
      [theme.breakpoints.up('md')]: {
        flexGrow: 0,
      },
    },
    routerLink: {
      textDecoration: 'none',
      color: 'inherit',
    },
  };
};

const AdminHeader = () => {
  const classes = useStyles();

  const [headerMenuOpen, setheaderMenuOpen] = useState(false);

  const [avatarMenuAnchorEl, setAvatarMenuAnchorEl] = useState(null);
  const open = Boolean(avatarMenuAnchorEl);
  const avatarMenuClick = (event) => {
    setAvatarMenuAnchorEl(event.currentTarget);
  };
  const avatarMenuClose = () => {
    setAvatarMenuAnchorEl(null);
  };
  const { googleSignOut, currentUser } = useGoogleAuth();

  const handleLogout = () => {
    googleSignOut();
  };
  return (
    <div>
      <Drawer
        variant='permanent'
        anchor='left'
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
        classes={{ paper: classes.drawerPaper }}
        className={classes.drawer}>
        <Toolbar />
        <List>
          {currentUser.userType === 'admin'
            ? AppHeaderAdminData.map((item) =>
                item.headerMenuItems.map((item, index) => (
                  <Link
                    to={item.path}
                    className={classes.routerLink}
                    key={index}>
                    <ListItem button>
                      {item.icon}
                      <ListItemText primary={item.text} sx={{ ml: 3 }} />
                    </ListItem>
                  </Link>
                ))
              )
            : AppHeaderUserData.map((item) =>
                item.headerMenuItems.map((item, index) => (
                  <Link
                    to={item.path}
                    className={classes.routerLink}
                    key={index}>
                    <ListItem button>
                      {item.icon}
                      <ListItemText primary={item.text} sx={{ ml: 3 }} />
                    </ListItem>
                  </Link>
                ))
              )}
        </List>
      </Drawer>
      <AppBar
        position='fixed'
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 3, display: { xs: 'block', md: 'none' } }}
            className={classes.sectionMobile}
            onClick={() => setheaderMenuOpen(!headerMenuOpen)}>
            <MenuIcon />
          </IconButton>
          <Box
            style={{ flexGrow: 1 }}
            className={classes.sectionDesktop}
            sx={{ mr: 3, display: { xs: 'none', md: 'block' } }}>
            {currentUser.userType === 'admin'
              ? AppHeaderAdminData.map((item) =>
                  item.headerMenuItems.map((item, index) => (
                    <Link
                      to={item.path}
                      className={classes.routerLink}
                      key={index}>
                      <Button
                        startIcon={item.icon}
                        sx={{ mr: 3, color: 'white' }}>
                        {item.text}
                      </Button>
                    </Link>
                  ))
                )
              : AppHeaderUserData.map((item) =>
                  item.headerMenuItems.map((item, index) => (
                    <Link
                      to={item.path}
                      className={classes.routerLink}
                      key={index}>
                      <Button
                        startIcon={item.icon}
                        sx={{ mr: 3, color: 'white' }}>
                        {item.text}
                      </Button>
                    </Link>
                  ))
                )}
          </Box>
          <Fragment>
            <Link to='/' className={classes.routerLink}>
              <Typography
                variant='h6'
                sx={{ mr: 3, color: 'white' }}
                className={classes.respTitle}>
                {currentUser && currentUser.displayName}
              </Typography>
            </Link>
            <Box>
              <IconButton sx={{ p: 0 }} onClick={avatarMenuClick}>
                <Avatar
                  alt={currentUser && currentUser.displayName}
                  src={currentUser && currentUser.photoURL}
                />
              </IconButton>
            </Box>
            <Menu
              anchorEl={avatarMenuAnchorEl}
              open={open}
              onClose={avatarMenuClose}
              onClick={avatarMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
              <Link
                to='/'
                className={classes.routerLink}
                onClick={handleLogout}>
                <MenuItem>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Link>
            </Menu>
          </Fragment>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AdminHeader;
