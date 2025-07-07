// src/components/SwapButtons.tsx
import React from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import type { RootState } from "../store";

interface Props {
  onSwap: (seatName: string) => void;
}

export const SwapButtons: React.FC<Props> = ({ onSwap }) => {
  const seats = useSelector((state: RootState) => state.hud.seats);
  const user = useSelector((state: RootState) => state.hud.userAvatar);
  const mySeat = seats.find((s) => s.sitter?.key === user?.key);

  return (
    <Stack direction="row" spacing={2} sx={{ my: 2 }}>
      {seats
        .filter((s) => s.name !== mySeat?.name)
        .map((s) => (
          <Button key={s.id} variant="contained" onClick={() => onSwap(s.name)}>
            Swap to {s.name}
          </Button>
        ))}
    </Stack>
  );
};
