// src/components/HeaderBar.tsx
import React from "react";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import type { RootState } from "../store";

export const HeaderBar: React.FC = () => {
  const user = useSelector((state: RootState) => state.hud.userAvatar);
  const initials = user
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "?";

  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>{initials}</Avatar>
        <Typography variant="h6">
          {user ? user.name : "Unknown User"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
