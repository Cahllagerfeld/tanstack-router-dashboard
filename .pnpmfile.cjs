// openapi-typescript needs the TS 5 JS compiler API, which TS 7 does not expose.
// Replace its peer with a private dependency so it does not resolve the root TS 7.
function readPackage(pkg) {
	if (pkg.name === "openapi-typescript") {
		delete pkg.peerDependencies.typescript;
		pkg.dependencies.typescript = "5.9.3";
	}
	return pkg;
}

module.exports = { hooks: { readPackage } };
