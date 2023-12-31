# use-immer-produce

React Hook nearly identical to use-immer, but it returns the draft from the update function.

## Installation

```
npm i use-immer-produce immer
```

## Usage

```typescript
const [testObj, updateTestObj] = useImmerProduce({
    value: 14
});
```

In order to immediately extract the draft, before re-render:

```typescript
const draft = updateTestObj((draft) => {
    draft.value = 75;
});
```

## Contributing

All contributions are welcome, please open an issue or pull request.

To use this repository:
1. `npm i -g pnpm` (if don't have pnpm installed)
2. `pnpm i`
3. `npx projen` (this will ensure everything is setup correctly, and you can run this command at any time)
4. Good to make your changes!
5. You can run `npx projen build` at any time to build the project.