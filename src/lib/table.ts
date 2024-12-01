import { RowSelectionState } from "@tanstack/react-table";

export function convertSelectionToArray(state: RowSelectionState) {
	return Object.keys(state).filter((key) => state[key] === true);
}
