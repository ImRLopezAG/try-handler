import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "lib",
  minify: true,
  treeshake: true,
  clean: true,
  dts: true,
  splitting: false,
  format: ["esm", "cjs"],
  injectStyle: false,
  bundle: true,
});
