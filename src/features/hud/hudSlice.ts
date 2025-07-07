import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Seat, Pose, Menu, Avatar } from "../../models/types";

interface HudState {
  userAvatar?: Avatar;
  seats: Seat[];
  poses: Pose[];
  menus: Menu[];
}

const initialState: HudState = {
  userAvatar: undefined,
  seats: [],
  poses: [],
  menus: [],
};

const hudSlice = createSlice({
  name: "hud",
  initialState,
  reducers: {
    setUserAvatar(state, action: PayloadAction<Avatar>) {
      state.userAvatar = action.payload;
    },
    setSeats(state, action: PayloadAction<Seat[]>) {
      state.seats = action.payload;
    },
    setPoses(state, action: PayloadAction<Pose[]>) {
      state.poses = action.payload;
    },
    setMenus(state, action: PayloadAction<Menu[]>) {
      state.menus = action.payload;
    },
    updateSeatSitter(
      state,
      action: PayloadAction<{ seatId: string; sitter?: Avatar }>
    ) {
      const seat = state.seats.find((s) => s.id === action.payload.seatId);
      if (seat) {
        seat.sitter = action.payload.sitter;
      }
    },
  },
});

export const { setUserAvatar, setSeats, setPoses, setMenus, updateSeatSitter } =
  hudSlice.actions;

export default hudSlice.reducer;