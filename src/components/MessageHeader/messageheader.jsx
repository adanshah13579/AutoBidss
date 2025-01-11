import { Box, IconButton } from "@mui/material";
import { Avatar, Typography } from "@mui/material";

import { ArrowForwardIos, Forum, Menu } from "@mui/icons-material";
import { chatData2 } from "../../Screens/Message/dummy";

export function Header({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#EFF2FF",
          p: 1.5,
          borderRadius: 1,
        }}
      >
        <IconButton
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          sx={{ display: { sm: "none", zIndex: 9999 } }}
        >
          <Forum />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg"
            sx={{ mr: 1 }}
          />
          <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "20px" }}>
            Jane Smith
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          p: 1.5,
          borderRadius: 1,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Avatar
            src={chatData2[0]?.carpic}
            sx={{ mr: 1, borderRadius: 2, height: 50, width: 50 }}
          />
          <Box display="flex" flexDirection="column" t={2}>
            <Typography variant="h9" fontWeight="bold" fontFamily={"Outfit"}>
              Honda Civic
            </Typography>
            <Typography variant="body7" fontFamily={"Outfit"}>
              Highest Bid on this car is $35
            </Typography>
          </Box>
        </Box>
        <ArrowForwardIos />
      </Box>
    </>
  );
}
