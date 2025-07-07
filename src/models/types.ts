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
  sitter?: Avatar;       // undefined if seat is empty
  pose?: string;         // current pose name for the seat
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
