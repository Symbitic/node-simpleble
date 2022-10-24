// @ts-nocheck
export * from "./bindings.ts";
export * from "./ffi.ts";

import { SimpleBLE } from "./ffi.ts";
export const bindings = await SimpleBLE.load();
