import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Fully static portfolio: no incremental cache or revalidation queue needed.
export default defineCloudflareConfig({});
