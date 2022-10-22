// @denoify-ignore
export * from "./bindings.js";
export * from "./node-bindings.js";

import { resolveBindings } from "./node-bindings.js";
export const bindings = await resolveBindings();
