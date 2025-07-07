import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/seatfiller-ui/", // <-- crucial for correct asset paths
  plugins: [react()],
});
