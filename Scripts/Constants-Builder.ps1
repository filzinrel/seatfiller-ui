# From seatfiller-ui/Scripts directory
if (-not (Test-Path -Path "../src/constants.ts")) {
    @"
/**
 * Numeric codes for HUD & inter-script communication
 */
export enum SfCode {
  CHANNEL = -123456,          // HUD communication channel
  DEBUG_OFF = 100,
  DEBUG_ON = 101,
  POSE_LOAD_REQUEST = 200,
  POSE_LOAD_COMPLETE = 201,
  SEAT_OCCUPIED = 300,
  SEAT_VACANT = 301,
  REQUEST_SWAP_SEAT = 302,
  CONFIRM_SWAP_SEAT = 303,
  SIT_UPDATE = 304,
  ANIMATION_START = 400,
  ANIMATION_STOP = 401,
  ANIMATION_CHANGED = 402,
  OFFSET_REQUEST = 500,
  OFFSET_RESPONSE = 501,
  OFFSET_UPDATE = 502,
  HUD_STATE_REQUEST = 600,
  HUD_STATE_RESPONSE = 601,
  HUD_POSE_REQUEST = 602,
  HUD_POSE_RESPONSE = 603,
  HUD_SEAT_REQUEST = 604,
  HUD_SEAT_RESPONSE = 605,
  HUD_DEBUG_TOGGLE = 606,
  CATEGORY_LIST_REQUEST = 700,
  CATEGORY_LIST_RESPONSE = 701,
  POSE_LIST_REQUEST = 702,
  POSE_LIST_RESPONSE = 703,
  ERROR = 900
}

/**
 * String constants for payload prefixes and defaults
 */
export const EMPTY_OCCUPANT = 'NO_SITTER';
export const SF_NAMES = 'NAMES';
export const SF_OCCUPANTS = 'OCCUPANTS';
export const SF_POS = 'POS';
export const SF_ROT = 'ROT';
export const SF_POSES = 'POSES';
"@ | Out-File -Encoding utf8 "../src/constants.ts"
}
