# Scalar CLI

> [!CAUTION]
> WIP, not published yet

## Installation

If you really want to become friends you should install the CLI:

```bash
npm -g install @scalar/cli
```

Otherwise just prefix all commands with `npx @scalar/cli` instead of `scalar`. That’s fine, too.

## Commands

### format

The given JSON file will be formatted with Prettier.

```bash
scalar format openapi.json
```

### validate

To check whether your OpenAPI file adheres to the Swagger 2.0, OpenAPI 3.0 or OpenAPI 3.1 specification, run the following command:

```bash
scalar validate openapi.json
```

### share

To quickly share an OpenAPI file or reference with someone, you can use the share command:

```bash
scalar share openapi.json
```

This will upload your OpenAPI file to the [Scalar Sandbox](https://sandbox.scalar.com/) to give you a public reference URL and a public URL to your OpenAPI JSON file.

### mock

We can even mock your API, and it’s just one command:

```bash
scalar mock openapi.json
```

This will boot up a server on port 3000 which gives you an API returning the dummy data according to your schema.

If you’d like to watch for file changes (to the OpenAPI file), do it like this:

```bash
scalar mock openapi.json --watch
```

You can also change the port like this:

```bash
scalar mock openapi.json --watch --port 8080
```

### init

If you’re tired of passing the file name again and again, just configure it once:

```bash
scalar init
```

This will create a `scalar.toml` file for you. All commands will use the configured OpenAPI file by default.

## Options

### --version

If you want to check which version of the CLI is installed, just run this:

```bash
scalar --version
```

### --help

```bash
scalar --help
```