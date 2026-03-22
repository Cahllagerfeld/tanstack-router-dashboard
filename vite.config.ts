/// <reference types="vitest/config" />
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { envSchema } from "./src/features/core/env-schema.ts";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const parsedEnv = envSchema.parse(env);

	const backendUrl = parsedEnv.VITE_BACKEND_URL;

	return {
		test: {
			exclude: [
				"node_modules/**/*",
				"build/**/*",
				"dist/**/*",
				"e2e-tests/**/*",
			],
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
					target: backendUrl,
					changeOrigin: true,
					secure: false,
				},
			},
		},
	};
});
