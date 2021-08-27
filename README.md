# [spectre.xyz](https://spectre.xyz/) web apps

## Packages

- [spectre](./pkg/spectre): the Spectre app.
- [kit](./pkg/kit): the Spectre toolkit.
- [demo](./pkg/demo): a demo app, mostly to demonstrate components from the kit.
- [website](./pkg/website): the Spectre website.
- [kit-legacy](./pkg/kit-legacy): old version of the toolkit, only used by `pkg/website`.

## How to develop

This repository is using the [pnpm](https://pnpm.io/) package manager.

```
npm i -g pnpm # if not done already

pnpm i
pnpm kit:dev
pnpm spectre:dev
```
