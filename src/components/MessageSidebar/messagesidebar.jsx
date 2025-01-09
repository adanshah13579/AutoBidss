import { Box, TextField, InputAdornment } from "@mui/material";
import { Avatar, Badge, Typography } from "@mui/material";
import { useState } from "react";
import { Search } from "@mui/icons-material"; // Import Search icon
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { chatData2 } from "../../Screens/Message/dummy";
export function SidebarContent() {
  const [activeTab, setActiveTab] = useState("Buying");

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    return words.length > wordLimit
      ? `${words.slice(0, wordLimit).join(" ")}...`
      : text;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          overflowX: "auto",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {/* Sidebar Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            mb: 2,
            backgroundColor: "#eff2ff",
            p: 1.82,
            borderRadius: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Outfit",
              fontSize: "24px",
              fontWeight: 600,
              lineHeight: "36px",
              letterSpacing: "0.02em",
              textAlign: "left",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            Messages
          </Typography>
          <ExpandMoreIcon />
          <Badge badgeContent={24} color="primary" sx={{ marginLeft: "4%" }} />
        </Box>

        {/* Tabs */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            width: "90%",
            marginLeft: "20px",
          }}
        >
          {["Buying", "Selling"].map((tab) => (
            <Typography
              key={tab}
              variant="body1"
              sx={{
                cursor: "pointer",
                p: 1,
                textAlign: "center",
                borderBottom:
                  activeTab === tab
                    ? "2.5px solid #2B59FF"
                    : "1px solid #D9D9D9",
                fontWeight: activeTab === tab ? "bold" : "normal",
                position: "relative", // Add this to position the border
                width: "250px", // Set a fixed width for each tab
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Typography>
          ))}
        </Box>

        {/* Search Box */}
        <Box
          sx={{
            backgroundColor: "#F3F3F3",
            width: "90%",
            marginLeft: "20px",
            borderRadius: "12px",
          }}
        >
          <TextField
            placeholder="Search for Messages"
            variant="outlined"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 0,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "& fieldset": {
                  borderWidth: "0px",
                },
                "&:hover fieldset": {
                  borderWidth: "0px",
                },
                "&.Mui-focused fieldset": {
                  borderWidth: "0px",
                },
              },
            }}
          />
        </Box>

        {/* Chat List */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {chatData2?.map((chat, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1.5,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#EFF2FF" },
              }}
            >
              <Avatar
                src={chat.userPic}
                alt={chat.userName}
                sx={{ mr: 2, borderRadius: 2, width: "65px", height: "65px" }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    fontWeight="bold"
                    sx={{
                      fontFamily: "Outfit",
                      fontSize: "14px",
                      fontWeight: "bold",
                      lineHeight: "24px",
                      letterSpacing: "0.15px",
                    }}
                  >
                    {chat.userName}
                  </Typography>
                  <Typography variant="caption" color="#979797">
                    {chat.time}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" color="#979797">
                    {truncateText(chat.lastMessage, 6)}
                  </Typography>
                  {chat.unseenMessageCount > 0 && (
                    <Badge
                      badgeContent={chat.unseenMessageCount}
                      color="primary"
                      sx={{ marginRight: "10px" }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
