import { bindings } from "../../dist/index.js";

function delay(ms: number): Promise<void> {
  return new Promise((resolve): void => {
    // No need to keep the return value.
    setTimeout(resolve, ms);
  });
}

const DELAY = 2000;

try {
  const adaptersCount = bindings.simpleble_adapter_get_count();
  if (adaptersCount === 0) {
    console.error("No Bluetooth adapters found");
    process.exit(1);
  }

  console.log(`Found ${adaptersCount} adapters`);
  const adapter = bindings.simpleble_adapter_get_handle(0);

  console.log(`Starting scan`);
  bindings.simpleble_adapter_scan_start(adapter);
  await delay(DELAY);
  bindings.simpleble_adapter_scan_stop(adapter);
  console.log(`Finished scan`);

  const resultsCount = bindings.simpleble_adapter_scan_get_results_count(adapter);
  if (resultsCount === 0) {
    console.error("No devices found");
    process.exit(1);
  }
  console.log(`Found ${resultsCount} devices`);

  for (let i = 0; i < resultsCount; i++) {
    const d = bindings.simpleble_adapter_scan_get_results_handle(adapter, i);
    const id = bindings.simpleble_peripheral_identifier(d);
    const address = bindings.simpleble_peripheral_address(d);
    const str = id.length > 0 ? `${id} [${address}]` : `[${address}]`;
    console.log(`[${i}] - ${str}`);
  }
  process.exit(0);
} catch (err: any) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}
