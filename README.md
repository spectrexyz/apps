# [spectre.xyz](https://spectre.xyz/) web apps

## Packages

- [spectre](./pkg/spectre): the Spectre app.
- [moire](./pkg/moire): the Spectre UI toolkit.
- [demo](./pkg/demo): a demo app, mostly to demonstrate components from the Moiré UI toolkit.
- [website](./pkg/website): the Spectre website.
- [kit-legacy](./pkg/kit-legacy): old version of the toolkit, only used by `pkg/website`.

## How to develop

This repository is using the [pnpm](https://pnpm.io/) package manager.

```
npm i -g pnpm # if not done already

pnpm i
pnpm moire:dev
pnpm spectre:dev
```
