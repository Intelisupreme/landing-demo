import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTS from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTS,
  {
    ignores: ["out/**", ".next/**", "node_modules/**"],
  },
];

export default eslintConfig;