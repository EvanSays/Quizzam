module.exports = {
    "extends": ["airbnb", "plugin:react/all"],
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "import/prefer-default-export": [0],
      "arrow-body-style": [0],
      "react/jsx-filename-extension": [ 1, {"extensions": [".jsx", ".js"] }],
      "jsx-a11y/href-no-hash": "off",
      "jsx-a11y/anchor-is-valid": [ 0, { "aspects": ["invalidHref"] }],
      "react/jsx-no-literals": [ 0, { "noStrings": true }],
      "react/no-set-state": [0],
      "react/require-optimization": [0],
      "react/forbid-prop-types": [0],
      "react/require-default-props": [0],
      "react/no-did-mount-set-state": [0],
      "jsx-a11y/label-has-for": [0],
    },
    "env": {
      "browser": true,
      "node": true,
      "mocha": true,
      "jest": true
    },
    "globals": {
      "document": false,
      "describe": false,
      "it": false,
      "beforeEach": false,
      "should": false
    },
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      }
    }
};
