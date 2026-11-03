import { customizeValidator } from "@rjsf/validator-ajv8";
import Ajv2020 from "ajv/dist/2020";

/**
 * The rjsf validator for backend schemas. Pydantic emits JSON Schema 2020-12, so it runs
 * Ajv's 2020 dialect: the default draft-07 one ignores `prefixItems` and accepts any tuple.
 * Pass this one instance to the rjsf `Form` too, so rendering and validation agree.
 */
export const schemaValidator = customizeValidator({ AjvClass: Ajv2020 });
