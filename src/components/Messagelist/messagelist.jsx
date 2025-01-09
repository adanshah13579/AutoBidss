import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { chatMessageData } from "../../Screens/Message/DummyData";

export function MessageList() {
  return (
    <>
      <Box
  sx={{
    flexGrow: 1,
    overflowY: "auto",
    p: 2,
    backgroundColor: "#fff",
    borderRadius: 1,
    "&::-webkit-scrollbar": { display: "none" }, 
    scrollbarWidth: "none", 
  }}
>
        {chatMessageData.map((message, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Box sx={{ textAlign: "left", mb: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  display: "inline-block",
                  backgroundColor: "#f1f1f1",
                  p: 1,
                  borderRadius: "12px",
                }}
              >
                {message.senderMessage}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="body2"
                sx={{
                  display: "inline-block",
                  backgroundColor: "#2B59FF",
                  color: "#fff",
                  p: 1,
                  borderRadius: "12px",
                }}
              >
                {message.receiverMessage}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}
