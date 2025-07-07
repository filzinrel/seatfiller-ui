// src/services/useHudDataService.tsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSeats, setPoses, setUserAvatar } from "../features/hud/hudSlice";
import type { Seat, Pose, Avatar } from "../models/types";
import { SfCode, PayloadPrefix, EMPTY_OCCUPANT } from "../constants";

function parseMessage(msg: string): {
  code: number;
  prefix: string;
  list: string[];
} {
  const [codeStr, ...rest] = msg.split("|");
  const code = Number(codeStr);
  const [prefix, payload] = rest;
  const list: string[] =
    payload
      ?.slice(1, -1)
      .split(",")
      .map((s) => decodeURIComponent(s))
      .map((s) => s.replace(/\+/g, " ")) || [];
  return { code, prefix, list };
}

export function useHudDataService() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const rawData = params.get("dataIn");
    if (!rawData) return;

    const decoded = decodeURIComponent(rawData);
    const msgs = decoded.split(";");
    const seatNames: string[] = [];
    const occupants: string[] = [];
    const seatPoses: string[] = [];
    const poseNames: string[] = [];
    let userAvatar: Avatar | undefined;

    msgs.forEach((msg) => {
      const { code, prefix, list } = parseMessage(msg);
      if (code !== SfCode.HUD_STATE_RESPONSE) return;

      switch (prefix) {
        case PayloadPrefix.NAMES:
          seatNames.push(...list);
          break;
        case PayloadPrefix.OCCUPANTS:
          occupants.push(...list);
          break;
        case PayloadPrefix.POSES:
          // This may be global poses or per-seat poses
          if (
            list.length === seatNames.length ||
            list.length === seatNames.length + 1
          ) {
            seatPoses.push(...list);
          } else {
            poseNames.push(...list);
          }
          break;
        case PayloadPrefix.USER:
          if (list.length >= 3) {
            const [key, name, gender] = list;
            userAvatar = {
              key,
              name,
              gender: gender as Avatar["gender"],
              rotOffset: { x: 0, y: 0, z: 0 },
              posOffset: { x: 0, y: 0, z: 0 },
            };
          }
          break;
      }
    });

    const seats: Seat[] = seatNames.map((name, i) => {
      const occ = occupants[i];
      const sitter: Avatar | undefined =
        occ && occ !== EMPTY_OCCUPANT
          ? {
              key: occ,
              name: occ === userAvatar?.key ? userAvatar.name : "", // ◀️ match name
              gender: "other",
              rotOffset: { x: 0, y: 0, z: 0 },
              posOffset: { x: 0, y: 0, z: 0 },
            }
          : undefined;
      const pose = seatPoses[i];
      return { id: String(i), name, sitter, pose };
    });

    const poses: Pose[] = poseNames.map((name, i) => ({ id: String(i), name }));

    dispatch(setSeats(seats));
    dispatch(setPoses(poses));
    if (userAvatar) dispatch(setUserAvatar(userAvatar));

    params.delete("dataIn");
    navigate({ search: params.toString() }, { replace: true });
  }, [location.search, dispatch, navigate]);
}
