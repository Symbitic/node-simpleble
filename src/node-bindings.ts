// @denoify-ignore
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type {
  Adapter,
  Bindings,
  BindingsResolver,
  ManufacturerData,
  Peripheral,
  Service,
  UserData
} from "./bindings.js";

const require = createRequire(import.meta.url);

const BINDINGS_NAME = "simpleble.node";

let bindings: NodeBindings | undefined;

/**
 * Unload the bindings and release all resources. Should be called
 * automatically during the `onexit` event.
 */
function unload(): void {
  if (bindings) {
    bindings.destroy();
  }
}

process.on('exit', unload);
process.on('SIGINT', unload);

export const resolveBindings: BindingsResolver = (): Bindings => {
  if (bindings) {
    return bindings;
  }
  const dir = dirname(fileURLToPath(import.meta.url));
  const moduleRoot = resolve(dir, '..');
  const paths = [
    join(moduleRoot, 'build', 'Release', BINDINGS_NAME),
    join(moduleRoot, 'prebuilds', `${process.platform}-${process.arch}`, BINDINGS_NAME)
  ];
  let binding: Bindings | undefined;

  for (const path of paths) {
    try {
      binding = require(path);
    } catch (_e) {
      continue;
    }
  }
  if (!binding) {
    throw new Error("Failed to load addon");
  }

  return binding;
}

export class NodeBindings implements Bindings {
  private _adapters: Set<Adapter> = new Set();
  private _peripherals: Set<Peripheral> = new Set();

  constructor(private readonly _bindings: Bindings) { }

  destroy(): void {
    for (const handle of this._peripherals) {
      this._bindings.simpleble_peripheral_release_handle(handle);
    }

    for (const handle of this._adapters) {
      this._bindings.simpleble_adapter_release_handle(handle);
    }
  }

  simpleble_adapter_get_count(): number {
    return this._bindings.simpleble_adapter_get_count();
  }
  simpleble_adapter_get_handle(index: number): Adapter {
    const ret = this._bindings.simpleble_adapter_get_handle(index);
    this._adapters.add(ret);
    return ret;
  }
  simpleble_adapter_release_handle(handle: Adapter): void {
    this._adapters.delete(handle);
    this._bindings.simpleble_adapter_release_handle(handle);
  }
  simpleble_adapter_identifier(handle: Adapter): string {
    return this._bindings.simpleble_adapter_identifier(handle);
  }
  simpleble_adapter_address(handle: Adapter): string {
    return this._bindings.simpleble_adapter_address(handle);
  }
  simpleble_adapter_scan_for(handle: Adapter, timeout: number): boolean {
    return this._bindings.simpleble_adapter_scan_for(handle, timeout);
  }
  simpleble_adapter_scan_start(handle: Adapter): boolean {
    return this._bindings.simpleble_adapter_scan_start(handle);
  }
  simpleble_adapter_scan_stop(handle: Adapter): boolean {
    return this._bindings.simpleble_adapter_scan_stop(handle)
  }
  simpleble_adapter_scan_is_active(handle: Adapter): boolean {
    return this._bindings.simpleble_adapter_scan_is_active(handle);
  }
  simpleble_adapter_scan_get_results_count(handle: Adapter): number {
    return this._bindings.simpleble_adapter_scan_get_results_count(handle);
  }
  simpleble_adapter_scan_get_results_handle(handle: Adapter, index: number): Peripheral {
    const ret = this._bindings.simpleble_adapter_scan_get_results_handle(handle, index);
    this._peripherals.add(ret);
    return ret;
  }
  simpleble_adapter_get_paired_peripherals_count(handle: Adapter): number {
    return this._bindings.simpleble_adapter_get_paired_peripherals_count(handle);
  }
  simpleble_adapter_get_paired_peripherals_handle(handle: Adapter, index: number): Peripheral {
    return this._bindings.simpleble_adapter_get_paired_peripherals_handle(handle, index);
  }
  simpleble_adapter_set_callback_on_scan_start(
    handle: Adapter,
    cb: (adapter: Adapter, userdata: UserData) => void,
    userdata: UserData,
  ): boolean {
    return this._bindings.simpleble_adapter_set_callback_on_scan_start(handle, cb, userdata);
  }
  simpleble_adapter_set_callback_on_scan_stop(
    handle: Adapter,
    cb: (adapter: Adapter, userdata: UserData) => void,
    userdata: UserData,
  ): boolean {
    return this._bindings.simpleble_adapter_set_callback_on_scan_start(handle, cb, userdata);
  }
  simpleble_adapter_set_callback_on_updated(
    handle: Adapter,
    cb: (adapter: Adapter, peripheral: Peripheral, userdata: UserData) => void,
    userdata: UserData,
  ): boolean {
    return this._bindings.simpleble_adapter_set_callback_on_updated(handle, cb, userdata);
  }
  simpleble_adapter_set_callback_on_found(
    handle: Adapter,
    cb: (adapter: Adapter, peripheral: Peripheral, userdata: UserData) => void,
    userdata: UserData,
  ): boolean {
    return this._bindings.simpleble_adapter_set_callback_on_found(handle, cb, userdata);
  }

  simpleble_peripheral_release_handle(handle: Peripheral): void {
    this._peripherals.delete(handle);
    this._bindings.simpleble_peripheral_release_handle(handle);
  }
  simpleble_peripheral_identifier(handle: Peripheral): string {
    return this._bindings.simpleble_peripheral_identifier(handle);
  }
  simpleble_peripheral_address(handle: Peripheral): string {
    return this._bindings.simpleble_peripheral_address(handle);
  }
  simpleble_peripheral_rssi(handle: Peripheral): number {
    return this._bindings.simpleble_peripheral_rssi(handle);
  }
  simpleble_peripheral_connect(handle: Peripheral): boolean {
    return this._bindings.simpleble_peripheral_connect(handle);
  }
  simpleble_peripheral_disconnect(handle: Peripheral): boolean {
    return this._bindings.simpleble_peripheral_disconnect(handle);
  }
  simpleble_peripheral_is_connected(handle: Peripheral): boolean {
    return this._bindings.simpleble_peripheral_is_connected(handle);
  }
  simpleble_peripheral_is_connectable(handle: Peripheral): boolean {
    return this._bindings.simpleble_peripheral_is_connectable(handle);
  }
  simpleble_peripheral_is_paired(handle: Peripheral): boolean {
    return this._bindings.simpleble_peripheral_is_paired(handle);
  }
  simpleble_peripheral_unpair(handle: Peripheral): boolean {
    return this._bindings.simpleble_peripheral_unpair(handle);
  }
  simpleble_peripheral_services_count(handle: Peripheral): number {
    return this._bindings.simpleble_peripheral_services_count(handle);
  }
  simpleble_peripheral_services_get(handle: Peripheral, index: number): Service {
    return this._bindings.simpleble_peripheral_services_get(handle, index);
  }
  simpleble_peripheral_manufacturer_data_count(handle: Peripheral): number {
    return this._bindings.simpleble_peripheral_manufacturer_data_count(handle);
  }
  simpleble_peripheral_manufacturer_data_get(handle: Peripheral, index: number): ManufacturerData | undefined {
    return this._bindings.simpleble_peripheral_manufacturer_data_get(handle, index);
  }
  simpleble_peripheral_read(handle: Peripheral, service: string, characteristic: string): Uint8Array | undefined {
    return this._bindings.simpleble_peripheral_read(handle, service, characteristic);
  }
  simpleble_peripheral_write_request(handle: Peripheral, service: string, characteristic: string, data: Uint8Array): boolean {
    return this._bindings.simpleble_peripheral_write_request(handle, service, characteristic, data);
  }
  simpleble_peripheral_write_command(handle: Peripheral, service: string, characteristic: string, data: Uint8Array): boolean {
    return this._bindings.simpleble_peripheral_write_command(handle, service, characteristic, data);
  }
  simpleble_peripheral_unsubscribe(handle: Peripheral, service: string, characteristic: string): boolean {
    return this._bindings.simpleble_peripheral_unsubscribe(handle, service, characteristic);
  }
  simpleble_peripheral_indicate(
    handle: Peripheral,
    service: string,
    characteristic: string,
    cb: (
      service: string,
      characteristic: string,
      data: Uint8Array,
      userdata: UserData,
    ) => void,
    userdata: UserData = null,
  ): boolean {
    return this._bindings.simpleble_peripheral_indicate(handle, service, characteristic, cb, userdata);
  }
  simpleble_peripheral_notify(
    handle: Peripheral,
    service: string,
    characteristic: string,
    cb: (
      service: string,
      characteristic: string,
      data: Uint8Array,
      userdata: UserData,
    ) => void,
    userdata: UserData = null,
  ): boolean {
    return this._bindings.simpleble_peripheral_notify(handle, service, characteristic, cb, userdata);
  }
  simpleble_peripheral_set_callback_on_connected(
    handle: Peripheral,
    cb: (peripheral: Peripheral, userdata: UserData) => void,
    userdata: UserData = null,
  ): boolean {
    return this._bindings.simpleble_peripheral_set_callback_on_connected(handle, cb, userdata);
  }
  simpleble_peripheral_set_callback_on_disconnected(
    handle: Peripheral,
    cb: (peripheral: Peripheral, userdata: UserData) => void,
    userdata: UserData = null,
  ): boolean {
    return this._bindings.simpleble_peripheral_set_callback_on_disconnected(handle, cb, userdata);
  }
  simpleble_peripheral_read_descriptor(
    handle: Peripheral,
    service: string,
    characteristic: string,
    descriptor: string,
  ): Uint8Array | undefined {
    return this._bindings.simpleble_peripheral_read_descriptor(handle, service, characteristic, descriptor);
  }
  simpleble_peripheral_write_descriptor(
    handle: Peripheral,
    service: string,
    characteristic: string,
    descriptor: string,
    data: Uint8Array,
  ): boolean {
    return this._bindings.simpleble_peripheral_write_descriptor(handle, service, characteristic, descriptor, data);
  }

  simpleble_free(handle: bigint): void {
    return this._bindings.simpleble_free(handle);
  }
}
