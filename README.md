# Scalar CLI

WIP, not published yet

## Installation

Hey, `scalar` works just fine, but if you really want to become friends you should install the CLI:

```bash
npm -g install @scalar/cli
```

## Usage

### Format JSON files

The given JSON file will be formatted with Prettier.

```bash
scalar format openapi.json
```

### Validate OpenAPI files

To check whether your OpenAPI file adheres to the Swagger 2.0, OpenAPI 3.0 or OpenAPI 3.1 specification, run the following command:

```bash
scalar validate openapi.json
```

### Upload OpenAPI files to the Scalar Sandbox

To quickly share an OpenAPI file or reference with someone, you can use the share command:

```bash
scalar share openapi.json
```

It’ll give you a reference URL and an URL to the OpenAPI JSON file.

### Configure the file name once

If you’re tired of passing the file name again and again, just configure it once:

```bash
scalar init
```

This will create a `scalar.toml` file for you. All commands will use the configured OpenAPI file by default.

### Check which version is installed

If you want to check which version of the CLI is installed, just run this:

```bash
scalar --version
```

### See all available commands and options

```bash
scalar --help
```