/// <reference types="vitest/config" />
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	test: {
		exclude: ["node_modules/**/*", "build/**/*", "dist/**/*", "e2e-tests/**/*"],
	},
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [
		tanstackRouter({
			autoCodeSplitting: true,
		}),
		react(),
		babel({ presets: [reactCompilerPreset()] }),
		tailwindcss(),
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
