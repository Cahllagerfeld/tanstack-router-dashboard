import fs from "node:fs";
import openapiTS, { astToString } from "openapi-typescript";

// Logging function with emojis
function log(message, emoji) {
	console.log(`${emoji} ${message}`);
}

async function generateTypes(baseUrl) {
	log("Script started.", "✨");

	const output = await openapiTS(`${baseUrl}/openapi.json`, {
		exportType: true,
		transform: (schema) => {
			customTransformer(schema);
		},
	});

	log("Writing output to file...", "📝");
	fs.writeFileSync("./src/types/core.ts", astToString(output));

	log("Script completed successfully.", "✅");
}

/**
 *
 * @param {import("openapi-typescript").SchemaObject} schema
 * @returns {import("openapi-typescript").SchemaObject}
 */
export function customTransformer(schema) {
	if (schema.type === "object" && !schema.properties) {
		schema.additionalProperties = true;
	}
	return schema;
}

// Check if the script is called with at least one argument
if (process.argv.length < 3) {
	console.log(process.argv);
	console.error("Usage: bun run generate:types -- <baseurl>");
	process.exit(1);
}

// Take the base URL from the first argument
const baseUrl = process.argv[2];
generateTypes(baseUrl);
