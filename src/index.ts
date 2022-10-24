// @denoify-ignore
export * from "./bindings.js";
export * from "./node-bindings.js";

import { SimpleBLE } from "./node-bindings.js";
export const bindings = await SimpleBLE.load();
