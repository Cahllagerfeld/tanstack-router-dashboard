/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	test: {
		exclude: ["node_modules/**/*", "build/**/*", "dist/**/*", "e2e-tests/**/*"],
	},
	plugins: [
		tanstackRouter(),
		react({
			babel: {
				plugins: ["babel-plugin-react-compiler"],
			},
		}),
		tailwindcss(),
		tsconfigPaths(),
	],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:8237",
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
