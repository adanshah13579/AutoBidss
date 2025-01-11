import Navbar from "../../components/Navbar/navbar";

import Footer from "../../components/Footer/Footer";
import React, { useState, useEffect } from "react";
import {
  Drawer,
  Grid,
  Box,
  TextField,
  IconButton,
  useMediaQuery,
  InputAdornment,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import SendIcon from "@mui/icons-material/Send";
import { SidebarContent } from "../../components/MessageSidebar/messagesidebar";
import { MessageList } from "../../components/Messagelist/messagelist";
import { Header } from "../../components/MessageHeader/messageheader";
import NavbarLoggedIn from "../../components/NavbarLoggedIn/navbarLoggedIn";

const MessagePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setIsSidebarOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };
  return (
    <>
      <NavbarLoggedIn />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Navbar */}

        {/* Middle Section */}
        <Box
          sx={{
            display: "flex",
            flex: 1,
            overflow: "hidden",
          }}
        >
          {/* Sidebar */}
          <Drawer
            variant={isMobile ? "temporary" : "persistent"}
            open={isSidebarOpen}
            onClose={handleDrawerClose}
            onTransitionEnd={handleDrawerTransitionEnd}
            sx={{
              width: { xs: 240, sm: 350 },
              height: "auto", // Make sure the height is not set to 100% or full page
              "& .MuiDrawer-paper": {
                width: { xs: 240, sm: 350 },
                boxSizing: "border-box",
                position: "relative", // Set position to relative instead of absolute
                top: 0, // Align it properly
                bottom: 0, // Align it properly
                zIndex: 0,
              },
            }}
          >
            <SidebarContent />
          </Drawer>

          {/* Main Content */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <Header
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              handleDrawerToggle={handleDrawerToggle}
            />

            {/* Message List */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                backgroundColor: "#f5f5f5",
              }}
            >
              <MessageList />
            </Box>

            {/* Input Box */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#fff",
                p: 1.5,
                borderRadius: 1,
                position: "sticky",
                bottom: 0,
                zIndex: 2,
                width: "100%",
              }}
            >
              <TextField
                placeholder="Type a message..."
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: "20px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                  },
                  width: "97.5%",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton color="primary" sx={{ color: "#615EF0" }}>
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Footer */}
      </Box>
      <Footer />
    </>
  );
};

export default MessagePage;
