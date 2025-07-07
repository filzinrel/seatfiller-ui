// src/components/SeatGrid.tsx
import React from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid"; // Grid2 API
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { EMPTY_OCCUPANT } from "../constants";
import type { RootState } from "../store";

export const SeatGrid: React.FC = () => {
  const seats = useSelector((state: RootState) => state.hud.seats);

  return (
    <Grid container spacing={2}>
      {seats.map((s) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={s.id}>
          <Card>
            <CardHeader
              avatar={
                <Avatar>
                  {s.sitter?.name
                    ? s.sitter.name.charAt(0)
                    : EMPTY_OCCUPANT.charAt(0)}
                </Avatar>
              }
              title={s.name}
              subheader={s.sitter ? s.sitter.name : "Empty"}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Pose: {s.pose ?? "None"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
