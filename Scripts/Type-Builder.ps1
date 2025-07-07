# Run this from seatfiller-ui/Scripts

# Ensure src/models exists
if (-not (Test-Path -Path "../src/models")) {
    New-Item -ItemType Directory -Path "../src/models" -Force | Out-Null
}

# Write out the TypeScript interfaces to src/models/types.ts
@"
export interface Avatar {
  key: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  rotOffset: { x: number; y: number; z: number }; // Euler rotation in degrees
  posOffset: { x: number; y: number; z: number }; // Vector offset
}

export interface Seat {
  id: string;
  name: string;
  sitter?: Avatar; // undefined if seat is empty
}

export interface Pose {
  id: string;
  name: string;
}

export interface Menu {
  id: string;
  title: string;
  options: string[];
}
"@ | Out-File -Encoding utf8 "../src/models/types.ts"
