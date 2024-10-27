/** @type {import("eslint").Linter.Config} */
const config = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": true
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked"
  ],
  "rules": {
    // close all ts eslint
  "@typescript-eslint/adjacent-overload-signatures": "off",
  "@typescript-eslint/await-thenable": "off",
  "@typescript-eslint/ban-ts-comment": "off",
  "@typescript-eslint/ban-tslint-comment": "off",
  "@typescript-eslint/ban-types": "off",
  "@typescript-eslint/class-literal-property-style": "off",
  "@typescript-eslint/consistent-generic-constructors": "off",
  "@typescript-eslint/consistent-indexed-object-style": "off",
  "@typescript-eslint/consistent-type-assertions": "off",
  "@typescript-eslint/consistent-type-exports": "off",
  "@typescript-eslint/explicit-function-return-type": "off",
  "@typescript-eslint/explicit-member-accessibility": "off",
  "@typescript-eslint/explicit-module-boundary-types": "off",
  "@typescript-eslint/member-delimiter-style": "off",
  "@typescript-eslint/member-ordering": "off",
  "@typescript-eslint/method-signature-style": "off",
  "@typescript-eslint/naming-convention": "off",
  "@typescript-eslint/no-base-to-string": "off",
  "@typescript-eslint/no-confusing-non-null-assertion": "off",
  "@typescript-eslint/no-confusing-void-expression": "off",
  "@typescript-eslint/no-duplicate-enum-values": "off",
  "@typescript-eslint/no-dynamic-delete": "off",
  "@typescript-eslint/no-empty-interface": "off",
  "@typescript-eslint/no-explicit-any": "off",
  "@typescript-eslint/no-extra-non-null-assertion": "off",
  "@typescript-eslint/no-extraneous-class": "off",
  "@typescript-eslint/no-floating-promises": "off",
  "@typescript-eslint/no-for-in-array": "off",
  "@typescript-eslint/no-implied-eval": "off",
  "@typescript-eslint/no-invalid-void-type": "off",
  "@typescript-eslint/no-meaningless-void-operator": "off",
  "@typescript-eslint/no-misused-new": "off",
  "@typescript-eslint/no-namespace": "off",
  "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "off",
  "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
  "@typescript-eslint/no-non-null-assertion": "off",
  "@typescript-eslint/no-redundant-type-constituents": "off",
  "@typescript-eslint/no-require-imports": "off",
  "@typescript-eslint/no-this-alias": "off",
  "@typescript-eslint/no-type-alias": "off",
  "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
  "@typescript-eslint/no-unnecessary-condition": "off",
  "@typescript-eslint/no-unnecessary-qualifier": "off",
  "@typescript-eslint/no-unnecessary-type-arguments": "off",
  "@typescript-eslint/no-unnecessary-type-assertion": "off",
  "@typescript-eslint/no-unnecessary-type-constraint": "off",
  "@typescript-eslint/no-unsafe-argument": "off",
  "@typescript-eslint/no-unsafe-assignment": "off",
  "@typescript-eslint/no-unsafe-call": "off",
  "@typescript-eslint/no-unsafe-declaration-merging": "off",
  "@typescript-eslint/no-unsafe-enum-comparison": "off",
  "@typescript-eslint/no-unsafe-member-access": "off",
  "@typescript-eslint/no-unsafe-return": "off",
  "@typescript-eslint/no-unused-expressions": "off",
  "@typescript-eslint/no-use-before-define": "off",
  "@typescript-eslint/no-useless-empty-export": "off",
  "@typescript-eslint/no-var-requires": "off",
  "@typescript-eslint/non-nullable-type-assertion-style": "off",
  "@typescript-eslint/parameter-properties": "off",
  "@typescript-eslint/prefer-as-const": "off",
  "@typescript-eslint/prefer-enum-initializers": "off",
  "@typescript-eslint/prefer-for-of": "off",
  "@typescript-eslint/prefer-function-type": "off",
  "@typescript-eslint/prefer-includes": "off",
  "@typescript-eslint/prefer-literal-enum-member": "off",
  "@typescript-eslint/prefer-namespace-keyword": "off",
  "@typescript-eslint/prefer-nullish-coalescing": "off",
  "@typescript-eslint/prefer-optional-chain": "off",
  "@typescript-eslint/prefer-readonly": "off",
  "@typescript-eslint/prefer-readonly-parameter-types": "off",
  "@typescript-eslint/prefer-reduce-type-parameter": "off",
  "@typescript-eslint/prefer-regexp-exec": "off",
  "@typescript-eslint/prefer-return-this-type": "off",
  "@typescript-eslint/prefer-string-starts-ends-with": "off",
  "@typescript-eslint/prefer-ts-expect-error": "off",
  "@typescript-eslint/promise-function-async": "off",
  "@typescript-eslint/require-array-sort-compare": "off",
  "@typescript-eslint/restrict-plus-operands": "off",
  "@typescript-eslint/restrict-template-expressions": "off",
  "@typescript-eslint/strict-boolean-expressions": "off",
  "@typescript-eslint/switch-exhaustiveness-check": "off",
  "@typescript-eslint/triple-slash-reference": "off",
  "@typescript-eslint/typedef": "off",
  "@typescript-eslint/unbound-method": "off",
  "@typescript-eslint/unified-signatures": "off",
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        "prefer": "type-imports",
        "fixStyle": "inline-type-imports"
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": {
          "attributes": false
        }
      }
    ]
  }
}
module.exports = config;
