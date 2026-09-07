/// <reference types="vitest/config" />
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vite";

const excludedTestPaths = [
	"node_modules/**/*",
	"build/**/*",
	"dist/**/*",
	"e2e-tests/**/*",
];
const browserTests = ["**/*.browser.spec.{ts,tsx}"];

// https://vite.dev/config/
export default defineConfig({
	test: {
		projects: [
			{
				extends: true,
				test: {
					name: "server",
					environment: "node",
					include: ["**/*.{spec,test}.{ts,tsx}"],
					exclude: [...excludedTestPaths, ...browserTests],
				},
			},
			{
				extends: true,
				optimizeDeps: {
					include: [
						"@base-ui/react/alert-dialog",
						"@base-ui/react/collapsible",
						"@base-ui/react/input",
						"@base-ui/react/merge-props",
						"@base-ui/react/use-render",
						"@tanstack/react-query",
						"@tanstack/react-router",
						"es-toolkit",
						"es-toolkit/compat",
						"sonner",
						"vaul",
					],
				},
				test: {
					name: "browser",
					include: browserTests,
					exclude: excludedTestPaths,
					setupFiles: ["./src/test/browser.setup.ts"],
					browser: {
						enabled: true,
						headless: true,
						provider: playwright(),
						instances: [{ browser: "chromium" }],
					},
				},
			},
		],
	},
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [
		paraglideVitePlugin({
			project: "./project.inlang",
			outdir: "./src/paraglide",
			strategy: ["preferredLanguage", "baseLocale"],
		}),
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
