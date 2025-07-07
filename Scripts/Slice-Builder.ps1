# Run this from seatfiller-ui/Scripts

# 1. Ensure directories exist
if (-not (Test-Path -Path "../src/store")) {
    New-Item -ItemType Directory -Path "../src/store" -Force | Out-Null
}
if (-not (Test-Path -Path "../src/features/hud")) {
    New-Item -ItemType Directory -Path "../src/features/hud" -Force | Out-Null
}

# 2. Create the hudSlice.ts with initial state and reducers
@"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Seat, Pose, Menu, Avatar } from '../models/types';

interface HudState {
  seats: Seat[];
  poses: Pose[];
  menus: Menu[];
}

const initialState: HudState = {
  seats: [],
  poses: [],
  menus: []
};

const hudSlice = createSlice({
  name: 'hud',
  initialState,
  reducers: {
    setSeats(state, action: PayloadAction<Seat[]>) {
      state.seats = action.payload;
    },
    setPoses(state, action: PayloadAction<Pose[]>) {
      state.poses = action.payload;
    },
    setMenus(state, action: PayloadAction<Menu[]>) {
      state.menus = action.payload;
    },
    updateSeatSitter(state, action: PayloadAction<{ seatId: string; sitter?: Avatar }>) {
      const seat = state.seats.find(s => s.id === action.payload.seatId);
      if (seat) {
        seat.sitter = action.payload.sitter;
      }
    }
  }
});

export const {
  setSeats,
  setPoses,
  setMenus,
  updateSeatSitter
} = hudSlice.actions;

export default hudSlice.reducer;
"@ | Out-File -Encoding utf8 "../src/features/hud/hudSlice.ts"

# 3. Create the Redux store configuration
@"
import { configureStore } from '@reduxjs/toolkit';
import hudReducer from '../features/hud/hudSlice';

export const store = configureStore({
  reducer: {
    hud: hudReducer
  }
});

// Types for useDispatch and useSelector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
"@ | Out-File -Encoding utf8 "../src/store/index.ts"
