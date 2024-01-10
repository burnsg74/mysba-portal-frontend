import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { SelectChangeEvent } from "@mui/material";
import Fab from "@mui/material/Fab";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import SBALogo from "../../assets/logo.png";

const MaterialHeader: React.FC = () => {
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: "none",
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid",
          borderColor: "#DCDEE0",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Box component="img" src={SBALogo} />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Select
              value={language}
              onChange={handleLanguageChange}
              sx={{
                mr: 1,
                bgcolor: "white",
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
              }}
              size="small"
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Español</MenuItem>
              <MenuItem value="de">Deutsch</MenuItem>
            </Select>
            <Fab
              sx={{
                bgcolor: "white",
                border: 1,
                boxShadow: "none",
                borderColor: "#DCDEE0",
                minWidth: "unset",
                padding: "6px",
                "&:hover": {
                  bgcolor: "white",
                },
              }}
              variant="extended"
              aria-label="Profile"
            >
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                sx={{
                  marginRight: "8px",
                }}
              >
                <MenuIcon sx={{ color: "#162E51" }} />{" "}
              </IconButton>
              <Box
                sx={{
                  bgcolor: "#007DBC",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  component="span"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  C
                </Typography>
              </Box>
            </Fab>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MaterialHeader;
