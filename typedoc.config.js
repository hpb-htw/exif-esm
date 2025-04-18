/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
    entryPoints: ["lib/exif-esm.ts", "lib/byte-seeker.ts", "lib/types.ts"],
    out: "www/api",
    plugin: ["typedoc-plugin-mdn-links"]
};

export default config;