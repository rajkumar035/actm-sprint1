import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import left from "../../assets/svg/leftArrow.svg";
import right from "../../assets/svg/rightArrow.svg";
import { useGoogleAuth } from "../../contexts/GoogleAuthContext";
import { Avatar, Typography } from "@mui/material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function AdminSideBar({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const AppHeaderAdminData = [
    {
      headerMenuItems: [
        {
          text: "Dashboard",
          path: "/admin/",
        },
        {
          text: "Events",
          path: "/admin/events",
        },
        {
          text: "Webinars",
          path: "/admin/webinars",
        },
        {
          text: "Projects",
          path: "/admin/projects",
        },
        {
          text: "Visit Site",
          path: "/",
        },
      ],
    },
  ];

  const AppHeaderUserData = [
    {
      headerMenuItems: [
        {
          text: "Dashboard",
          path: "/user/",
        },
        {
          text: "Visit Site",
          path: "/",
        },
      ],
    },
  ];

  const { currentUser } = useGoogleAuth();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2, ...(open && { display: "none" }) }}>
            <MenuIcon />
          </IconButton>
          <Box display={"flex"} alignItems={"center"} gap={"20px"}>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt={currentUser && currentUser?.displayName} src={currentUser && currentUser?.photoURL} />
            </IconButton>
            <Link to="/">
              <Typography variant="h6" sx={{ mr: 3, color: "white" }}>
                {currentUser && currentUser?.displayName}
              </Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>{theme.direction === "ltr" ? <img alt="left" style={{ height: "30px", width: "30px" }} src={left} /> : <img alt="right" style={{ height: "30px", width: "30px" }} src={right} />}</IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {currentUser?.userType === "admin"
            ? AppHeaderAdminData.map((item) =>
                item.headerMenuItems.map((item, index) => (
                  <Link to={item.path} key={index}>
                    <ListItem>
                      <ListItemText primary={item.text} sx={{ ml: 3 }} />
                    </ListItem>
                  </Link>
                ))
              )
            : AppHeaderUserData.map((item) =>
                item.headerMenuItems.map((item, index) => (
                  <Link to={item.path} key={index}>
                    <ListItem>
                      <ListItemText primary={item.text} sx={{ ml: 3 }} />
                    </ListItem>
                  </Link>
                ))
              )}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
