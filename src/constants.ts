// src/constants.ts

/**
 * Numeric HUD and inter-script communication codes
 * (erasableSyntaxOnly-compatible)
 */
export const SfCode = {
  CHANNEL: -123456 as const,
  DEBUG_OFF: 100 as const,
  DEBUG_ON: 101 as const,
  POSE_LOAD_REQUEST: 200 as const,
  POSE_LOAD_COMPLETE: 201 as const,
  SEAT_OCCUPIED: 300 as const,
  SEAT_VACANT: 301 as const,
  REQUEST_SWAP_SEAT: 302 as const,
  CONFIRM_SWAP_SEAT: 303 as const,
  SIT_UPDATE: 304 as const,
  ANIMATION_START: 400 as const,
  ANIMATION_STOP: 401 as const,
  ANIMATION_CHANGED: 402 as const,
  OFFSET_REQUEST: 500 as const,
  OFFSET_RESPONSE: 501 as const,
  OFFSET_UPDATE: 502 as const,
  HUD_STATE_REQUEST: 600 as const,
  HUD_STATE_RESPONSE: 601 as const,
  HUD_POSE_REQUEST: 602 as const,
  HUD_POSE_RESPONSE: 603 as const,
  HUD_SEAT_REQUEST: 604 as const,
  HUD_SEAT_RESPONSE: 605 as const,
  HUD_DEBUG_TOGGLE: 606 as const,
  CATEGORY_LIST_REQUEST: 700 as const,
  CATEGORY_LIST_RESPONSE: 701 as const,
  POSE_LIST_REQUEST: 702 as const,
  POSE_LIST_RESPONSE: 703 as const,
  ERROR: 900 as const,
};
export type SfCode = (typeof SfCode)[keyof typeof SfCode];

/**
 * Payload string prefixes and sentinel constants
 */
export const PayloadPrefix = {
  NAMES: "NAMES" as const,
  OCCUPANTS: "OCCUPANTS" as const,
  POS: "POS" as const,
  ROT: "ROT" as const,
  POSES: "POSES" as const,
  USER: "USER" as const,
};
export type PayloadPrefix = (typeof PayloadPrefix)[keyof typeof PayloadPrefix];

export const EMPTY_OCCUPANT = "NO_SITTER" as const;
