// @ts-nocheck
export * from "./bindings.ts";
export * from "./ffi.ts";

import { resolveBindings } from "./ffi.deno.ts";
export const simpleble = await resolveBindings();
