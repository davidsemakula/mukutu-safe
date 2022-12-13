# Safe Interchain Router

This repo contains an implementation of a [Safe App](https://help.gnosis-safe.io/en/articles/4022022-what-are-safe-apps) for managing assets and interacting with dApps on multiple chains from one [Safe](https://app.safe.global/) account.

## Development

### Install dependencies

```shell
yarn install
```

### Start a local dev server.

```sh
yarn start
```

### Add Custom App to Safe

- Open your Safe app locally (by default via http://localhost:3000/).
- Go to the [Safe web interface](https://app.safe.global/)
- Create your test safe
- Go to Apps -> Manage Apps -> Add Custom App
- Paste your localhost URL, default is http://localhost:3000/
- You should see "Safe Interchain Router" as a new app
