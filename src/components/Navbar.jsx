import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {

  const location = useLocation();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { label: "Gallery", path: "/" },
    { label: "Upload Video", path: "/upload" }
  ];

  return (

    <AppBar
      position="sticky"
      elevation={4}
      sx={{
        background:
          "linear-gradient(90deg,#141e30,#243b55)"
      }}
    >

      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >

        {/* Logo */}

        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            letterSpacing: 1
          }}
        >
          🎬 VideoHub
        </Typography>

        {/* Desktop Menu */}

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2
          }}
        >

          <Button
            component={Link}
            to="/"
            sx={{
              color: "white",
              fontWeight: "bold",
              borderBottom:
                location.pathname === "/"
                  ? "2px solid white"
                  : "none",
              borderRadius: 0,
              "&:hover": {
                background: "rgba(255,255,255,0.1)"
              }
            }}
          >
            Gallery
          </Button>

          <Button
            component={Link}
            to="/upload"
            variant="contained"
            sx={{
              background: "#ff4b2b",
              borderRadius: "20px",
              padding: "6px 18px",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                background: "#ff3a1a"
              }
            }}
          >
            Upload Video
          </Button>

        </Box>

        {/* Mobile Hamburger */}

        <IconButton
          sx={{
            display: { xs: "block", md: "none" },
            color: "white"
          }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>

      </Toolbar>

      {/* Mobile Drawer */}

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
      >

        <Box
          sx={{
            width: 250
          }}
        >

          <List>

            {menuItems.map((item) => (

              <ListItem key={item.label} disablePadding>

                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={toggleDrawer}
                >

                  <ListItemText
                    primary={item.label}
                  />

                </ListItemButton>

              </ListItem>

            ))}

          </List>

        </Box>

      </Drawer>

    </AppBar>

  );
}