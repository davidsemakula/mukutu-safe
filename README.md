# Mukutu Safe (formerly Safe Hyperlane Router)

This project is an implementation of a [Safe App](https://help.gnosis-safe.io/en/articles/4022022-what-are-safe-apps) for managing assets and interacting with dapps on multiple chains from one [Safe](https://app.safe.global/) account using [Hyperlane Interchain Accounts](https://docs.hyperlane.xyz/docs/developers/send).

This app works as an intermediary between a [Safe account](https://app.safe.global/) on the origin chain and [Safe Apps](https://help.gnosis-safe.io/en/articles/4022022-what-are-safe-apps) providing an interface to an app or asset on the remote chain.

This is achieved by advertising the remote chain and the [Hyperlane Interchain Account](https://docs.hyperlane.xyz/docs/developers/send) (which is an [EIP-1014/CREATE2 account](https://eips.ethereum.org/EIPS/eip-1014)) as the currently connected chain and account respectively to the Safe app while also providing a [Safe Apps SDK](https://github.com/safe-global/safe-apps-sdk) interface (including an RPC provider for read calls to the remote chain).
This allows us to leverage already existing user-friendly UI/UX of other Safe Apps to compose the remote chain transaction.
This app then intercepts the sendTransaction call, translates it to a call to the [Hyperlane Interchain Account Router](https://docs.hyperlane.xyz/docs/developers/send) on the origin chain and submits it to the Safe Account for approval and execution.


## Awards
[🥇 Top Prize: Moonbeam Illuminate/22 Hackathon | Best use of Hyperlane](https://twitter.com/MoonbeamNetwork/status/1610738659656962048)

Useful links:
 - [Moonbeam Announcement](https://twitter.com/MoonbeamNetwork/status/1610738659656962048)
 - [Hyperlane Announcement](https://twitter.com/Hyperlane_xyz/status/1610751624300871681)
 - [Gitcoin Hackathon](https://gitcoin.co/hackathon/illuminate/onboard)


## Video Demo
[https://share.vidyard.com/watch/RfCsNrC8r24hKGm7HTBBZY?](https://share.vidyard.com/watch/RfCsNrC8r24hKGm7HTBBZY?)

[The video is a bit blurry but still watchable, a higher fidelity demo will be coming soon 🙂]

[Alternatively, you can try it out yourself by following the instructions below. It's super easy! 💪]

## Instructions

### For End users

You can also use this if you simply don't want to run the Safe App locally

- Go to the Safe web interface at [https://app.safe.global/](https://app.safe.global/) or [https://gnosis-safe.io/](https://gnosis-safe.io/) or [https://moonbeam-safe.davidsemakula.com/](https://moonbeam-safe.davidsemakula.com/) for Moonbeam users (official Moonbeam Safe support will be coming soon)
- Create your Safe if you don't have one already
- Go to Apps -> Manage Apps -> Add Custom App
- Paste the Safe App URL as https://safe.mukutu.tech
- You should see "Mukutu Safe" as a new app
- Install the app and try out some interchain transactions on supported remote chains 🎉


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

- Follow end user instructions above but use http://localhost:3000/ as the Safe App URL
- Install the app and try out some interchain transactions on supported remote chains 🚀
