# Create React Component [![Build Status](https://travis-ci.org/fuglu/create-react-component.svg?branch=master)](https://travis-ci.org/fuglu/create-react-component)

Create React components easily.

## Quick Overview

```sh
npm install -g @fuglu/create-react-component

create-react-component my-component
cd my-component/
editor
```

## Getting Started

### Installation

Install it once globally:

```sh
npm install -g @fuglu/create-react-component
```

Or use it in your multi-package repository (sometimes called monorepo):

```sh
npm install --save @fuglu/create-react-component
```
```json
{
  "name": "monorepo",
  "version": "1.0.0",
  "scripts": {
    "create": "create-react-component --base-path packages/ --template-path template/ --",
  },
  "dependencies": {
    "@fuglu/create-react-component": "^1.0.0"
  }
}
```

### Creating a component

To create a new component, run:

```sh
create-react-component my-react-component
```

It will create a directory called `my-react-component` inside the current folder.<br>
Inside that directory, it will generate the initial component structure and install the transitive dependencies:

```
my-react-component/
  node_modules/
  package.json
  src/
    index.js
```

### Custom templates

You **don’t** have to use the provided templates.<br>
Just provide your own template directory and you are ready to go:

```sh
create-react-component my-react-component --template-path my/template/directory
```

The template directory will be used to create the new component and must contain a `package.json`.<br>
You can pass relative and absolute paths to `--template-path`.

### Custom installation directory

You can specify a custom installation directory using relative or absolute paths:

```sh
create-react-component my-react-component --base-path path/to/components
```

### Scoped packages

You might want to add a scope to your package:

```sh
create-react-component my-react-component --scope org
```

This will set the name attribute to `@org/my-react-component` in `package.json`.

# Contributing

We'd love to have your helping hand on `create-react-component`!

## Some Ideas

* :bulb: `--template-package` - Allow the usage of published templates.
* :bulb: Extract `create-react-component-template` and use the published package.
* :bulb: Use [lerna](https://github.com/lerna/lerna) to release `create-react-component` and publish changelogs.
* :bomb: We need some proper end to end tests! Seriously!

# Acknowledgements

We are grateful to the authors of [Create React App](https://github.com/facebookincubator/create-react-app).
