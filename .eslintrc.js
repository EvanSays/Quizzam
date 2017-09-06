module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "arrow-body-style": [0],
      "extensions": [ 0, { "jsx": "always" }],
      "jsx-a11y/href-no-hash": "off",
      "jsx-a11y/anchor-is-valid": [ 0, { "aspects": ["invalidHref"] }]
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
    }
};
