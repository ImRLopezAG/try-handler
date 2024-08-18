import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  treeshake: true,
  outDir: "lib",
  minify: true,
  clean: true,
  dts: true,
  splitting: false,
  format: ["esm"],
  external: ["react"],
  injectStyle: false,
  banner: {
    js: "/* eslint-disable */",
  },
  bundle: true,
});
