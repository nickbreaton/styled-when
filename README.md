# styled-when

Easily declare prop-based conditions when using styled components.

Compatible with [styled-components](https://www.styled-components.com/) and [emotion](https://emotion.sh/docs/@emotion/styled).

## Install

```sh
npm i styled-when
```

## Usage

Select when prop's value is truthy. Use for simple checks.

```js
import when from 'styled-when'

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
import when from 'styled-when'

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
import when from 'styled-when'

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
