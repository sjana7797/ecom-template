async function build() {
  await Bun.build({
    entrypoints: ["./src/index.ts"],
    outdir: "./build",
    minify: true,
    target: "bun",
    sourcemap: "external",
    format: "esm",
  });
}

build();
