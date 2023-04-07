# Mukutu Router

Mukutu Router (formerly Safe Hyperlane Router) is a [Safe app](https://help.gnosis-safe.io/en/articles/4022022-what-are-safe-apps) for managing assets and interacting with smart contracts and dapps on multiple chains from one [Safe](https://app.safe.global/) account.

This app works as an intermediary between a [Safe account](https://app.safe.global/) on the origin chain and [Safe apps](https://help.gnosis-safe.io/en/articles/4022022-what-are-safe-apps) providing an interface to an app or asset on the remote chain.

This is achieved by advertising the remote chain and a [Hyperlane Interchain Account](https://docs.hyperlane.xyz/docs/developers/send) (which is an [EIP-1014/CREATE2 account](https://eips.ethereum.org/EIPS/eip-1014)) as the currently connected chain and account respectively to the Safe app while also providing a [Safe apps SDK](https://github.com/safe-global/safe-apps-sdk) interface (including an RPC provider for read calls to the remote chain).
This allows us to leverage already existing user-friendly UI/UX of other Safe apps to compose the remote chain transaction.
This app then intercepts the sendTransaction call, translates it to a call to the [Hyperlane Interchain Account Router](https://docs.hyperlane.xyz/docs/developers/send) on the origin chain and submits it to the Safe Account for approval and execution.


## Awards
[🥇 Top Prize: Moonbeam Illuminate/22 Hackathon | Best use of Hyperlane](https://twitter.com/MoonbeamNetwork/status/1610738659656962048)

Useful links:
 - [Moonbeam Announcement](https://twitter.com/MoonbeamNetwork/status/1610738659656962048)
 - [Hyperlane Announcement](https://twitter.com/Hyperlane_xyz/status/1610751624300871681)
 - [Gitcoin Blog Feature](https://go.gitcoin.co/blog/celebrating-the-best-in-cross-chain-from-moonbeams-illuminate-hack/22)


## Instructions

### For End users

#### Option 1: Add Mukutu Router as a custom Safe app using a wizard

- Go to [https://safe.mukutu.tech](https://safe.mukutu.tech)
- Select your origin chain and click "Go to Safe"
- You will be redirected to the appropriate Safe web interface (which may be an authoritative fork for chains that aren't supported by the official Safe interface e.g. Moonbeam Safe)
- Follow the prompts provided by the Safe web interface to access Mukutu Router for your Safe


#### Option 2: Manually add Mukutu Router as a custom Safe app

- Go to the Safe web interface at [https://app.safe.global](https://app.safe.global) (or the interface of an authoritative fork e.g [https://multisig.moonbeam.network](https://multisig.moonbeam.network) for Moonbeam)
- Create your Safe if you don't have one already
- Go to Apps -> My custom apps -> Add custom app
- Paste the Safe app URL as https://safe.mukutu.tech
- You should see "Mukutu Router" as a new app
- Install the app and try out some cross-chain transactions on supported remote chains 🎉


### For Developers

#### Install dependencies

```shell
yarn install
```

#### Start a local dev server.

```sh
yarn start
```

#### Add Custom App to Safe

- Follow end user instructions above but use http://localhost:3000/ as the Safe app URL
- Install the app and try out some cross-chain transactions on supported remote chains 🚀

## License
This code is released under GPL-3.0