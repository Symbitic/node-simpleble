/** SimpleBLE Adapter. */
export type Adapter = bigint;
/** SimpleBLE Peripheral. */
export type Peripheral = bigint;
/** SimpleBLE UserData. */
export type UserData = bigint | null;

/** SimpleBLE Characteristic. */
export interface Characteristic {
  uuid: string;
  descriptors: string[];
}

/** A SimpleBLE service. */
export interface Service {
  uuid: string;
  characteristics: Characteristic[];
}

/** SimpleBLE manufacturer data. */
export interface ManufacturerData {
  id: number;
  data: Uint8Array;
}

/**
 * SimpleBLE bindings.
 */
export interface Bindings {
  /** Returns the number of available adapters. */
  simpleble_adapter_get_count(): number;
  /** Returns a handle to an adapter. */
  simpleble_adapter_get_handle(index: number): Adapter;
  /** Deallocate the resources associated with an adapter. */
  simpleble_adapter_release_handle(handle: Adapter): void;
  simpleble_adapter_identifier(handle: Adapter): string;
  simpleble_adapter_address(handle: Adapter): string;
  simpleble_adapter_scan_for(handle: Adapter, timeout: number): boolean;
  simpleble_adapter_scan_start(handle: Adapter): boolean;
  simpleble_adapter_scan_stop(handle: Adapter): boolean;
  simpleble_adapter_scan_is_active(handle: Adapter): boolean;
  simpleble_adapter_scan_get_results_count(handle: Adapter): number;
  simpleble_adapter_scan_get_results_handle(handle: Adapter, index: number): Peripheral;
  simpleble_adapter_get_paired_peripherals_count(handle: Adapter): number;
  simpleble_adapter_get_paired_peripherals_handle(handle: Adapter, index: number): Peripheral;
  simpleble_adapter_set_callback_on_scan_start(
    handle: Adapter,
    cb: (adapter: Adapter, userdata: UserData) => void,
    userdata: UserData,
  ): boolean;
  simpleble_adapter_set_callback_on_scan_stop(
    handle: Adapter,
    cb: (adapter: Adapter, userdata: UserData) => void,
    userdata: UserData,
  ): boolean;
  simpleble_adapter_set_callback_on_updated(
    handle: Adapter,
    cb: (adapter: Adapter, peripheral: Peripheral, userdata: UserData) => void,
    userdata: UserData,
  ): boolean;
  simpleble_adapter_set_callback_on_found(
    handle: Adapter,
    cb: (adapter: Adapter, peripheral: Peripheral, userdata: UserData) => void,
    userdata: UserData,
  ): boolean;

  simpleble_peripheral_release_handle(handle: Peripheral): void;
  simpleble_peripheral_identifier(handle: Peripheral): string;
  simpleble_peripheral_address(handle: Peripheral): string;
  simpleble_peripheral_rssi(handle: Peripheral): number;
  simpleble_peripheral_connect(handle: Peripheral): boolean;
  simpleble_peripheral_disconnect(handle: Peripheral): boolean;
  simpleble_peripheral_is_connected(handle: Peripheral): boolean;
  simpleble_peripheral_is_connectable(handle: Peripheral): boolean;
  simpleble_peripheral_is_paired(handle: Peripheral): boolean;
  simpleble_peripheral_unpair(handle: Peripheral): boolean;
  simpleble_peripheral_services_count(handle: Peripheral): number;
  simpleble_peripheral_services_get(handle: Peripheral, index: number): Service;
  simpleble_peripheral_manufacturer_data_count(handle: Peripheral): number;
  simpleble_peripheral_manufacturer_data_get(handle: Peripheral, index: number): ManufacturerData | undefined;
  simpleble_peripheral_read(handle: Peripheral, service: string, characteristic: string): Uint8Array | undefined;
  simpleble_peripheral_write_request(handle: Peripheral, service: string, characteristic: string, data: Uint8Array): boolean;
  simpleble_peripheral_write_command(handle: Peripheral, service: string, characteristic: string, data: Uint8Array): boolean;
  simpleble_peripheral_unsubscribe(handle: Peripheral, service: string, characteristic: string): boolean;
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
    userdata: UserData,
  ): boolean;
  simpleble_peripheral_notify(
    handle: Peripheral,
    service: string,
    characteristic: string,
    cb: (
      service: string,
      characteristic: string,
      data: Uint8Array,
      userdata: UserData
    ) => void,
    userdata: UserData,
  ): boolean;
  simpleble_peripheral_set_callback_on_connected(
    handle: Peripheral,
    cb: (peripheral: Peripheral, userdata: UserData) => void,
    userdata: UserData,
  ): boolean;
  simpleble_peripheral_set_callback_on_disconnected(
    handle: Peripheral,
    cb: (peripheral: Peripheral, userdata: UserData) => void,
    userdata: UserData,
  ): boolean;
  simpleble_peripheral_read_descriptor(
    handle: Peripheral,
    service: string,
    characteristic: string,
    descriptor: string,
  ): Uint8Array | undefined;
  simpleble_peripheral_write_descriptor(
    handle: Peripheral,
    service: string,
    characteristic: string,
    descriptor: string,
    data: Uint8Array,
  ): boolean;

  simpleble_free(handle: bigint): void;
}

/** A function to load native SimpleBLE bindings. */
export type BindingsResolver = () => Bindings | Promise<Bindings>;
