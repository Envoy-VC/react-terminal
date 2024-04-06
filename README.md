<p>
  <picture>
    <img alt="Lens SDK logo" src="./assets/logo-full.svg" width="100%">
  </picture>
</p>

**Introducing React Terminal: A customizable terminal component for your React applications.**

Here's what it provides:

- 🔮 **Highly Customizable**: Personalize the title bar, prompt, and output to perfectly match your app's design.
- ⌨️ **Custom Commands**: Define your own commands to perform specific actions within your app.
- ⏳ **Async/Await Support**: termireact handles asynchronous operations seamlessly, displaying a loader while waiting .
- ⬆️ ⬇️ **Command History**: Navigate through past commands with ease using the up and down arrow keys.
- #️⃣ **JSX Rendering**: Integrate JSX elements directly into your terminal output for a richer experience.
- 🌈 **Ansi Support**: Support for ANSI escape codes to add color and style to your terminal output.
- 🎨 **Multiple Themes**: Choose from pre-built themes or create your own custom look.
- 📦 **Persistence (`IndexedDB`)**: Save and recall terminal history for a more convenient user experience.

## Getting Started

The Project follows a Compound component pattern. You can use the components to build your own terminal. Each Components extends from Either a `div` or `textarea` (in case of input textarea) element so you can pass the element props to the components.

Install the package:

```bash
npm install @envoy1084/react-terminal
# or
yarn add @envoy1084/react-terminal
# or
pnpm add @envoy1084/react-terminal
# or
bun add @envoy1084/react-terminal
```

Usage:

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

## Contributing

If you have any ideas on how to improve the project, feel free to contribute! Please read the [contributing guidelines](https://github.com/Envoy-VC/react-terminal/blob/main/CODE_OF_CONDUCT.md) before submitting a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Envoy-VC/react-terminal/blob/main/LICENSE.md)
