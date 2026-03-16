import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import solidDevtools from "solid-devtools/vite";

export default defineConfig({
  middleware: "./src/middleware.ts",
  vite: {
    ssr: {
      noExternal: ["clerk-solidjs"],
    },
    plugins: [
      tailwindcss(),
      solidDevtools({
        autoname: true,
      }),
    ],
  },
});
