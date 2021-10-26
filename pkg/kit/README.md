# Spectre - kit

## How to develop

Run these commands:

```
pnpm i
pnpm dev
```

## Add an icon

- Open [the Phosphor icons Figma file](https://www.figma.com/file/pAC9K7G8UWkBCt6lq99Pi5/Phosphor-Icons-(Community)?node-id=3%3A2).
- Make sure you are either on the “Light”, “Fill” or “Bold” page, depending on the icon you want (“Light” should be used when possible).
- Export the icon as SVG, and drop the resulting file into `pkg/kit/icons` (not `pkg/kit/src/icons`).
- If the icon comes from the “Fill” page, add `Filled` to the file name, e.g. `Arrow.svg` => `ArrowFilled.svg`.
- If the icon comes from the “Bold” page, add `Bold` to the file name, e.g. `Arrow.svg` => `ArrowBold.svg`.
- Please keep the original name otherwise.
- Run `pnpm build:icons` to generate the components in `pkg/kit/src/icons`.
- Done!
