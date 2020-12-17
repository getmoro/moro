# Tilgram Frontend

## Available Scripts

In the project directory, you can run:

### `yarn storybook`

Runs storybook. Use this to develop components.

### `yarn start`

Runs the app in the development mode.<br />

### `yarn test`

### `yarn build`

Builds the app for production to the `build` folder.<br />

## Contributing Guidelines

### Styles

Use styled-components for styling.

There is a `theme` object passed to styled components as a prop (via `ThemeProvider` in context), it has sizes, colors and other basic style blocks, use that in component development to keep the app in order with the design language.

There is an TS type for theme, so ideally your text editor would provide autocomplete for all the properties of the theme.

Sample:

```jsx
const Root = styled.div`
  padding: ${({ theme }) => theme.size.xl};
  background-color: ${({ theme }) => theme.color.primary};
`;
```

### Types

Rather using `type` instead of `interface` unless there is a reason for it.

#### Component types

For react components just specifying prop type is enough:

```
export type Props = {
  values: Values
}

export const Form = (props: Props) => {
```

Use `Props` name for the props type. If somewhere there is a need to use type, it would look like:

```jsx
import { Button, Props as ButtonProps } from 'components/button';
```

### Exports

Rather named exports than `default` export, unless there is a reason not to do so.

### Imports

Use absolute paths instead of relative path for imports. Even when files are next to each other but there is no meaning connection between them. (Because it simplifies refactoring)

Like:

```jsx
// Instead of this:
import { Button } from '../../components/button';

// Rather this:
import { Button } from 'components/button';
```

### Tests

Remember adding `data-testid`s to components!

#### Unit Testing

Jest is the test runner

[TODO]: React testing library and examples

#### Tntegration Testing

Integration tests are done using [TEST TOOL] and storybook.

[TODO]: e2e testing tool description and examples

#### E2E Testing

End to end testings are done with [TEST TOOL] in the production build of the software.

### Tech stack

- React
- typescript
- styled-components
- CRA
- storybook
