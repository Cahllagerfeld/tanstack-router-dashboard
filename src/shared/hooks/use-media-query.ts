import * as React from "react";

const MOBILE_BREAKPOINT = 768;

let mql: MediaQueryList | undefined;

function getMql() {
	if (!mql) {
		mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
	}
	return mql;
}

export function useIsMobile() {
	return React.useSyncExternalStore(subscribe, getSnapshot, () => false);
}

function getSnapshot() {
	return getMql().matches;
}

function subscribe(callback: () => void) {
	const mql = getMql();
	mql.addEventListener("change", callback);
	return () => mql.removeEventListener("change", callback);
}
