# styled-when

Create custom selectors from props when using tagged template literals to style React components.

## Install

```sh
npm i styled-when
```

## Usage

Select when prop's value is truthy. Use for simple checks.

```js
const Button = styled.button`
    font-weight: normal;

    ${when('important')} {
        font-weight: bold;
    }
`
```

<br>

Select when callback returns a truthy value. Use for more complex or multiple conditions.

```jsx
const Button = styled.button`
    color: white;
    background: cornflowerblue;
    border: 1px solid cornflowerblue;

    ${when(props => props.variant === 'secondary')} {
        color: cornflowerblue;
        background: white;
    }
`
```

<br>

Select when value is `true` or `false`. Use for constant conditions.

```jsx
const Button = styled.button`
    font-weight: regular;

    ${when(window.EMBEDDED_IN_ANDROID_APP)} {
        font-weight: bold;
        text-transform: uppercase;
    }
`
```

## API

```ts
when(prop: string) => (props: Props) => string
when(callback: Function) => (props: Props) => string
when(condition: boolean) => string
```
