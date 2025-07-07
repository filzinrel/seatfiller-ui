// src/services/useHudCommandService.tsx
import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SfCode, PayloadPrefix } from "../constants";

function encodeMessage(code: number, prefix: string, list: string[]) {
  const payload = `[${list.map(encodeURIComponent).join(",")}]`;
  return `${code}|${prefix}|${payload}`;
}

export function useHudCommandService() {
  const navigate = useNavigate();
  const location = useLocation();

  const sendCommand = useCallback(
    (msg: string) => {
      const params = new URLSearchParams(location.search);
      const existing = params.get("dataOut");
      const updated = existing ? `${existing};${msg}` : msg;
      params.set("dataOut", updated);
      // Using replace so that URL isn't cluttered in history
      navigate({ search: params.toString() }, { replace: true });
    },
    [location.search, navigate]
  );

  const requestPose = useCallback(
    (poseName: string) => {
      const msg = encodeMessage(SfCode.HUD_POSE_REQUEST, PayloadPrefix.POSES, [
        poseName,
      ]);
      sendCommand(msg);
    },
    [sendCommand]
  );

  const requestSwapSeat = useCallback(
    (seatName: string) => {
      const msg = encodeMessage(SfCode.REQUEST_SWAP_SEAT, PayloadPrefix.NAMES, [
        seatName,
      ]);
      sendCommand(msg);
    },
    [sendCommand]
  );

  const updateOffset = useCallback(
    (avatarKey: string, pos: string, rot: string) => {
      const msg = encodeMessage(SfCode.OFFSET_UPDATE, PayloadPrefix.POS, [
        avatarKey,
        pos,
        rot,
      ]);
      sendCommand(msg);
    },
    [sendCommand]
  );

  return {
    requestPose,
    requestSwapSeat,
    updateOffset,
    // Add more command handlers using SfCode and PayloadPrefix as needed
  };
}
