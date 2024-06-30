import { zenmlPreset } from "@zenml-io/react-component-library/tailwind";
import type { Config } from "tailwindcss";

export default {
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./node_modules/@zenml-io/react-component-library/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {}
	},
	plugins: [require("tailwindcss-animate"),],
	presets: [zenmlPreset]
} satisfies Config;
