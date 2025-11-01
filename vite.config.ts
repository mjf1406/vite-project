/** @format */

import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            // React Compiler can cause issues with third-party hooks like InstantDB
            // babel: {
            //     plugins: [["babel-plugin-react-compiler"]],
            // },
        }),
        tailwindcss() as PluginOption,
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            // Ensure a single React instance to avoid hook conflicts
            react: path.resolve(__dirname, "./node_modules/react"),
            "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
        },
    },
});
