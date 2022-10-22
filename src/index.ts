// @denoify-ignore
export * from "./bindings.js";
export * from "./node-bindings.js";

import { resolveBindings } from "./node-bindings.js";
const simpleble = await resolveBindings();
