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
