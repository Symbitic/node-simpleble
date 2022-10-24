// @ts-nocheck
export * from "./bindings.ts";
export * from "./ffi.ts";

import { resolveBindings } from "./ffi.ts";
export const bindings = await resolveBindings();
