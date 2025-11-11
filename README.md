# @servicestack/react

ServiceStack's React Component Library - A comprehensive collection of React components for building modern web applications.

## Features

- 🎨 **Beautiful UI Components** - Pre-styled components with Tailwind CSS
- 🔄 **Framework Agnostic Routing** - Works with React Router, Next.js, or plain HTML
- ⚡ **React 19 Compatible** - Full support for React 19 including SSR mode
- 📦 **TypeScript Support** - Fully typed components and APIs
- 🎯 **AutoQuery Integration** - Built-in components for ServiceStack AutoQuery APIs
- 🌙 **Dark Mode Support** - All components support dark mode out of the box

## Quick Start

### Installation

```bash
npm install @servicestack/react
```

### Configuration

The library supports multiple routing solutions. Choose the one that fits your project:

#### React Router (Vite, CRA, etc.)

```tsx
import { setLinkComponent } from '@servicestack/react'
import { Link } from 'react-router-dom'

setLinkComponent(Link)
```

#### Next.js

```tsx
import { setLinkComponent } from '@servicestack/react'
import Link from 'next/link'

setLinkComponent(Link)
```

#### No Router (Plain HTML)

No configuration needed! Components will automatically use standard anchor tags.

For detailed setup instructions, see [SETUP.md](./SETUP.md).

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [TypeScript](https://www.typescriptlang.com/)

For the best development experience, we recommend:
- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- Built-in TypeScript support in VSCode

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Examples

Check out the [examples](./examples) directory for complete setup examples:

- [React Router Setup](./examples/react-router-setup.tsx) - Vite + React + React Router
- [Next.js App Router Setup](./examples/nextjs-app-router-setup.tsx) - Next.js 13+ with App Router
- [Next.js Pages Router Setup](./examples/nextjs-pages-router-setup.tsx) - Traditional Next.js routing
- [No Router Setup](./examples/no-router-setup.tsx) - Plain React without routing

## Documentation

For comprehensive documentation, visit [docs.servicestack.net/react](https://docs.servicestack.net/react/)

## License

This project is licensed under the terms specified in the LICENSE file.
