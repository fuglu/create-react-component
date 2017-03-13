# Create React Component

Create React components easily.

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
    "create": "create-react-component --",
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

### Scoped packages

You might want to add a scope to your package:

```sh
create-react-component my-react-component --scope example
```

This will set the name attribute to `@example/my-react-component` in `package.json`.


### Custom templates

You **don’t** have to use the provided templates.<br>
Just provide your own template directory and you are ready to go:

```sh
create-react-component my-react-component --template-path my/template/directory
```

The template directory will be used to create the new component and must contain a `package.json`.<br>
You can pass relative and absolute paths to `--template-path`.


### Custom installation directory

You can specify a custom installation directory:

```sh
create-react-component my-react-component --base-path path/to/components
```

You can pass relative and absolute paths to `--base-path`.

