# Mukutu Router

Mukutu Router is a [Safe app](https://help.gnosis-safe.io/en/articles/4022022-what-are-safe-apps) for managing assets and interacting with smart contracts and dapps on multiple chains from one [Safe](https://app.safe.global/) account.

This app works as an intermediary between a [Safe account](https://app.safe.global/) on the origin chain and [Safe apps](https://help.gnosis-safe.io/en/articles/4022022-what-are-safe-apps) providing an interface to an app or asset on the remote chain.

This is achieved by advertising the remote chain and a [Hyperlane Interchain Account](https://docs.hyperlane.xyz/docs/developers/send) (which is an [EIP-1014/CREATE2 account](https://eips.ethereum.org/EIPS/eip-1014)) as the currently connected chain and account respectively to the Safe app while also providing a [Safe apps SDK](https://github.com/safe-global/safe-apps-sdk) interface (including an RPC provider for read calls to the remote chain).
This allows us to leverage already existing user-friendly UI/UX of other Safe apps to compose the remote chain transaction.
This app then intercepts the sendTransaction call, translates it to a call to the [Hyperlane Interchain Account Router](https://docs.hyperlane.xyz/docs/developers/send) on the origin chain and submits it to the Safe Account for approval and execution.

**NOTE:** 🚧 Mukutu Router is still work in progress, check back over the next few weeks for regular updates.

## Instructions

**NOTE:** ⚠ If some of your Safe apps are not loading, you may need to enable third-party cookies in your web browser's settings. You can do so by following [this guide](https://help.safe.global/en/articles/40797-why-do-i-need-to-enable-third-party-cookies-for-safe-apps) from the Safe team.

### For End users

#### Option 1: Add Mukutu Router as a custom Safe app using a wizard

- Go to [https://mukutu.davidsemakula.com](https://mukutu.davidsemakula.com)
- Select your origin chain and click "Go to Safe"
- You will be redirected to the appropriate Safe web interface
- Follow the prompts provided by the Safe web interface to access Mukutu Router for your Safe

#### Option 2: Manually add Mukutu Router as a custom Safe app

- Go to the Safe web interface at [https://app.safe.global](https://app.safe.global)
- Create your Safe if you don't have one already
- Go to Apps -> My custom apps -> Add custom app
- Paste the Safe app URL as https://mukutu.davidsemakula.com
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
This code is released under [GPL-3.0](/LICENSE).