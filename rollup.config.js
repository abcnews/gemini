import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import buble from "rollup-plugin-buble";

import pkg from "./package.json";

export default [
  // browser-friendly UMD build
  {
    input: "src/main.js",
    output: {
      name: "Gemini",
      file: pkg.browser,
      format: "umd"
    },
    plugins: [
      resolve(),
      commonjs(),
      buble({
        // transpile ES2015+ to ES5
        exclude: ["node_modules/**"]
      })
    ]
  },
  {
    input: "src/main.js",
    external: ["xhr"],
    output: [{ file: pkg.module, format: "es" }],
    plugins: [
      // buble({
      //   // transpile ES2015+ to ES5
      //   exclude: ["node_modules/**"]
      // })
    ]
  },

  // Other builds (just in case)
  {
    input: "src/main.js",
    external: ["xhr"],
    output: [
      { file: pkg.main, format: "cjs" },
    ],
    plugins: [
      buble({
        exclude: ["node_modules/**"]
      })
    ]
  }
];
