// @denoify-ignore
// @ts-nocheck

export * from "./bindings.ts";
export * from "./ffi.bun.ts";

import { SimpleBLE } from "./ffi.bun.ts";
export const bindings = await SimpleBLE.load();
