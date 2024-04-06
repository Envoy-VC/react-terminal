# Contributing to React Terminal

We're always excited to welcome new contributors to the React Terminal project! This guide outlines the process for effectively and efficiently contributing to the codebase.

## Pre-requisites:

- Basic understanding of React and TypeScript
- Understanding the React Design Patterns.

## Setting Up the Development Environment

This project is a [turborepo](https://turbo.build/) project, which means that it is a monorepo structure to manage multiple packages. The project is split into two parts:

**Packages**:

- `react-terminal`: The core package that contains the core functionality of the terminal.

**Apps**:

- `demo`: A main website containing Documentation and Demo.

Also this Repository uses pnpm package manager, so make sure you have it installed globally.

1. Clone the repository:
   ```bash
   git clone https://github.com/Envoy-VC/react-terminal.git
   cd react-terminal
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Build the packages:
   ```bash
   pnpm run build
   ```

## Making Changes:

### Branch out

Create a new branch for your changes. Feature branches are preferred for specific changes, while hotfixes or pull requests for bugs can use dedicated branches.

---

### Make your changes

Focus on the packages/react-terminal directory for code changes and the apps/demo directory for documentation updates. Update relevant tests alongside your code modifications.

---

### Document your changes

Clearly document your changes in the relevant code and markdown files. Make sure your pull request title and commit messages are concise and informative.

---

### Create a Pull Request

Push your changes to your remote branch and create a pull request against the main branch.

---

Contribution Guidelines:

1. Follow the existing code style and conventions.
   Use descriptive variable names and comments.
   Write unit tests for any new code or significant changes.

2. Keep pull requests focused on a single feature or bug fix.

3. Be friendly and respectful in your communication with other contributors.

## Additional Resources

- Turbo Documentation: https://vercel.com/docs/monorepos/turborepo
- Testing in Turbo Repos: https://vercel.com/docs/monorepos/turborepo

**We appreciate your contributions and look forward to seeing your work!**
