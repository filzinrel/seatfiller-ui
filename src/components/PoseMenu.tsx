// src/components/PoseMenu.tsx
import React from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import type { RootState } from "../store";

interface Props {
  onPoseSelect: (pose: string) => void;
  onMenuSelect: (menu: string) => void;
}

export const PoseMenu: React.FC<Props> = ({ onPoseSelect, onMenuSelect }) => {
  const poses = useSelector((state: RootState) => state.hud.poses);
  const menus = useSelector((state: RootState) => state.hud.menus);

  return (
    <Box sx={{ my: 2 }}>
      <ButtonGroup variant="contained" sx={{ mr: 2 }}>
        {poses.map((p) => (
          <Button key={p.id} onClick={() => onPoseSelect(p.name)}>
            {p.name}
          </Button>
        ))}
      </ButtonGroup>
      {menus.map((m) => (
        <Button
          key={m.id}
          variant="outlined"
          onClick={() => onMenuSelect(m.title)}
          sx={{ ml: 1 }}
        >
          {m.title}
        </Button>
      ))}
    </Box>
  );
};
