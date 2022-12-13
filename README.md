# Safe Hyperlane Router

This repo contains an implementation of a [Safe App](https://help.gnosis-safe.io/en/articles/4022022-what-are-safe-apps) for managing assets and interacting with dApps on multiple chains from one [Safe](https://app.safe.global/) account using [Hyperlane Interchain Accounts](https://docs.hyperlane.xyz/hyperlane-docs/developers/send).

## Project

### Name
[Safe](https://app.safe.global/) Hyperlane Router

### Description
This project is an implementation of a [Safe App](https://help.gnosis-safe.io/en/articles/4022022-what-are-safe-apps) for managing assets and interacting with dApps on multiple chains from one [Safe](https://app.safe.global/) account using [Hyperlane Interchain Accounts](https://docs.hyperlane.xyz/hyperlane-docs/developers/send).

This app works as an intermediary between a [Safe account](https://app.safe.global/) on the origin chain and [Safe Apps](https://help.gnosis-safe.io/en/articles/4022022-what-are-safe-apps) providing an interface to an app or asset on the remote chain.

This is achieved by advertising the remote chain as the currently connected chain as well as the [Hyperlane Interchain Account](https://docs.hyperlane.xyz/hyperlane-docs/developers/send) (which is an [EIP-1014/CREATE2 account](https://eips.ethereum.org/EIPS/eip-1014)) as the currently connected address to the Safe app while providing an RPC provider for read calls to the remote chain.
This allows us to leverage already existing user-friendly UI/UX of Safe Apps to compose the remote chain transaction.
This app then intercepts the sendTransaction call, translates it to a call to the [Hyperlane Interchain Account Router](https://docs.hyperlane.xyz/hyperlane-docs/developers/send) on the origin chain and submits it to the Safe Account for signing and processing.


### Gitcoin Link
[https://gitcoin.co/hackathon/illuminate/projects/17478/hyperlane-safe-app](https://gitcoin.co/hackathon/illuminate/projects/17478/hyperlane-safe-app)

### Gitcoin Issue
[https://gitcoin.co/issue/29583](https://gitcoin.co/issue/29583)

## Team

### Name
David Semakula

### Email
hello@davidsemakula.com


## Video Demo
[Insert Video Link here]()

[//]: # (TODO: @david Add video link)

## Instructions

### Development

#### Install dependencies

```shell
yarn install
```

#### Start a local dev server.

```sh
yarn start
```

#### Add Custom App to Safe

- Open your Safe app locally (by default via http://localhost:3000/).
- Go to the [Safe web interface](https://app.safe.global/)
- Create your test safe
- Go to Apps -> Manage Apps -> Add Custom App
- Paste your localhost URL, default is http://localhost:3000/
- You should see "Safe Hyperlane Router" as a new app
