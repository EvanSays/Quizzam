module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "arrow-body-style": [0]
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
