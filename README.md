# [spectre.xyz](https://spectre.xyz/) web apps

## Packages

- [spectre](./pkg/spectre): the Spectre app.
- [kit](./pkg/kit): the Spectre toolkit.
- [demo](./pkg/demo): a demo app for things unrelated to the toolkit. Still imports `pkg/kit-legacy`, will migrate to `pkg/kit`.
- [website](./pkg/website): the Spectre website.
- [kit-legacy](./pkg/kit-legacy): old version of the toolkit, still used by `pkg/website` and `pkg/demo`. Will be removed eventually.

## How to develop

This repository is using the [pnpm](https://pnpm.io/) package manager.

```
pnpm i
pnpm kit:dev
pnpm spectre:dev
```
