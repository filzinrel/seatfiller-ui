// src/App.tsx
import { HeaderBar } from "./components/HeaderBar";
import { PoseMenu } from "./components/PoseMenu";
import { SwapButtons } from "./components/SwapButtons";
import { SeatGrid } from "./components/SeatGrid";
import { useHudDataService } from "./services/useHudDataService";
import { useHudCommandService } from "./services/useHudCommandService";

export default function App() {
  useHudDataService();
  const { requestPose, requestSwapSeat } = useHudCommandService();

  return (
    <>
      <HeaderBar />
      <PoseMenu onPoseSelect={requestPose} onMenuSelect={requestPose} />
      <SwapButtons onSwap={requestSwapSeat} />
      <SeatGrid />
    </>
  );
}
