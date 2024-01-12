import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";

const CustomSideNav = () => {
  const drawerWidth = 240;
  const [selectedItem, setSelectedItem] = useState(null);

  const selectedAndHoverStyle = {
    backgroundColor: "#D9E8F6",
    borderRadius: "24px",
    justifyContent: "flex-start",
    alignItems: "center",
    display: "inline-flex",
    width: "100%",
    padding: "8px 16px",
  };

  // Function to handle item selection
  const handleSelect = (item) => {
    setSelectedItem(item);
  };
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List
           sx={{
            // selected and (selected + hover) states
            '&& .Mui-selected, && .Mui-selected:hover': {
              bgcolor: "#D9E8F6",
              borderRadius:"24px",
              '&, & .MuiListItemIcon-root': {
                color: "#D9E8F6",
              },
            },
            // hover states
            '& .MuiListItemButton-root:hover': {
              bgcolor: "#D9E8F6",
              '&, & .MuiListItemIcon-root': {
                color: "#D9E8F6",
              },
            },
          }}
        >
          {["Dashboard", "Business", "Certifications", "Loans", "Help"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => handleSelect(text)}
                  sx={selectedItem === text ? selectedAndHoverStyle : {}}
                >
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      style: {
                        color: "var(--Primary-primary-darker, #162E51)",
                        fontFamily: "Source Sans Pro",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "normal",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default CustomSideNav;
