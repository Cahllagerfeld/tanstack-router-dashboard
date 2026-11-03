import { englishStringTranslator, TranslatableString } from "@rjsf/utils";

import { m } from "@/paraglide/messages";

/** rjsf's string table, localized for the strings the Schema Form templates surface. */
export function translateString(
	key: TranslatableString,
	params?: string[]
): string {
	switch (key) {
		case TranslatableString.AddButton:
		case TranslatableString.AddItemButton:
			return m.schema_form_add_item();
		case TranslatableString.RemoveButton:
			return m.schema_form_remove_item();
		default:
			return englishStringTranslator(key, params);
	}
}
