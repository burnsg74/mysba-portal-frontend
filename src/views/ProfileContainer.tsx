import React from "react";
import MaterialHeader from "../components/Header/MaterialHeader";
import CustomSideNav from "../components/SideNav/MaterialSideNav";
import {
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const headingFont = createTheme({
  typography: {
    fontFamily: ["Cormorant", "serif"].join(","),
  },
});

const ProfileContainer = () => {
  return (
    <div className="flex flex-col h-screen bg-white-100">
      <MaterialHeader />
      <div className="flex flex-1 overflow-hidden">
        <CustomSideNav />
        <main className="flex-1 p-6 overflow-auto border-r border-l border-light-grey-border">
          <Box
            sx={{
              width: "100%",
              height: "100%",
              padding: "40px",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: "24px",
              display: "flex",
              zIndex: (theme) => theme.zIndex.appBar - 1,
            }}
          >
            <Paper
              elevation={0}
              style={{ paddingTop: "40px", margin: 0, flexGrow: 1 }}
            >
              <ThemeProvider theme={headingFont}>
                <Typography
                  style={{
                    color: "#002E6D",
                    fontSize: "36px",
                    fontWeight: 600,
                    wordWrap: "break-word",
                    paddingBottom: "24px",
                  }}
                >
                  Cindy Smith
                </Typography>
              </ThemeProvider>
              <Typography
                style={{
                  color: "#162E51",
                  fontSize: "20px",
                  fontFamily: "Public Sans",
                  fontWeight: 400,
                  lineHeight: "24px",
                  wordWrap: "break-word",
                  marginTop: "15px",
                  paddingBottom: "16px",
                }}
              >
                Contact Information
              </Typography>
              <Typography
                style={{
                  color: "#162E51",
                  fontSize: "18px",
                  fontFamily: "Source Sans 3",
                  fontWeight: 600,
                  lineHeight: "22px",
                  wordWrap: "break-word",
                  marginTop: "10px",
                }}
              >
                Email
              </Typography>
              <Typography
                style={{
                  color: "#162E51",
                  fontSize: "16px",
                  fontFamily: "Public Sans",
                  fontWeight: 400,
                  lineHeight: "18px",
                  wordWrap: "break-word",
                  marginTop: "10px",
                  paddingBottom: "16px",
                }}
              >
                Cindysmith@spoonandharvest.com
              </Typography>
              <Typography
                style={{
                  color: "#162E51",
                  fontSize: "18px",
                  fontFamily: "Source Sans 3",
                  fontWeight: 600,
                  lineHeight: "22px",
                  wordWrap: "break-word",
                  marginTop: "10px",
                  paddingTop: "16px",
                }}
              >
                First Name
              </Typography>
              <Typography
                style={{
                  color: "#162E51",
                  fontSize: "16px",
                  fontFamily: "Public Sans",
                  fontWeight: 400,
                  lineHeight: "18px",
                  wordWrap: "break-word",
                  marginTop: "10px",
                  paddingBottom: "16px",
                }}
              >
                Cindy
              </Typography>
              <Typography
                style={{
                  color: "#162E51",
                  fontSize: "18px",
                  fontFamily: "Source Sans 3",
                  fontWeight: 600,
                  lineHeight: "22px",
                  wordWrap: "break-word",
                  marginTop: "10px",
                  paddingTop: "16px",
                }}
              >
                Last Name
              </Typography>
              <Typography
                style={{
                  color: "#162E51",
                  fontSize: "16px",
                  fontFamily: "Public Sans",
                  fontWeight: 400,
                  lineHeight: "18px",
                  wordWrap: "break-word",
                  marginTop: "10px",
                  paddingBottom: "16px",
                }}
              >
                Smith
              </Typography>
              <Box
                sx={{
                  height: "316px",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: "16px",
                  display: "flex",
                }}
              >
                <FormControlLabel
                  control={<Checkbox name="notify" />}
                  label="Notify me about updates regarding my SBA account and upcoming events"
                  style={{
                    color: "black",
                    fontSize: "15px",
                    fontFamily: "Public Sans",
                    fontWeight: 400,
                    wordWrap: "break-word",
                    marginTop: "10px",
                  }}
                />
              </Box>
            </Paper>
          </Box>
        </main>
      </div>
    </div>
  );
};

export default ProfileContainer;
