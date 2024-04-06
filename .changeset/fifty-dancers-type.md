---
'@envoy1084/react-terminal': patch
---

Release Initial Version

Includes the following components

- `Terminal`: The main component that wraps all the other components.
- `TerminalTitleBar`: The Title bar of the terminal.
- `TerminalWelcomeMessage`: The Welcome message of the terminal.
- `TerminalOutput`: The Output area of the terminal.
- `TerminalInputBox`: The Input area of the terminal.
- `TerminalLoader`: The Loader component that shows when the terminal is loading.


Basic Usage:

```tsx
import {
  Terminal,
  TerminalInputBox,
  TerminalLoader,
  TerminalOutput,
  TerminalTitleBar,
  TerminalWelcomeMessage,
} from '@envoy1084/react-terminal';

const MyComponent = () => {
  return (
    <Terminal>
      <TerminalTitleBar>
        <TerminalTitleBar.ActionGroup />
        <TerminalTitleBar.Title />
      </TerminalTitleBar>
      <TerminalWelcomeMessage />
      <TerminalOutput />
      <TerminalInputBox>
        <TerminalInputBox.Prompt />
        <TerminalInputBox.TextArea />
      </TerminalInputBox>
      <TerminalLoader />
    </Terminal>
  );
};

export default MyComponent;
```