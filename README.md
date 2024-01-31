# Scalar CLI

[![CI](https://github.com/scalar/cli/actions/workflows/ci.yml/badge.svg)](https://github.com/scalar/cli/actions/workflows/ci.yml)
[![Release](https://github.com/scalar/cli/actions/workflows/release.yml/badge.svg)](https://github.com/scalar/cli/actions/workflows/release.yml)
[![Contributors](https://img.shields.io/github/contributors/scalar/cli)](https://github.com/scalar/cli/graphs/contributors)
[![GitHub License](https://img.shields.io/github/license/scalar/cli)](https://github.com/scalar/cli/blob/main/LICENSE)
[![Discord](https://img.shields.io/discord/1135330207960678410?style=flat&color=5865F2)](https://discord.gg/8HeZcRGPFS)

Command-line interface to work with OpenAPI files

## Features

* Format & validate OpenAPI files
* Upload your OpenAPI files to Scalar
* Get a fully mocked API for testing purposes
* Preview your API reference
* Bundle multiple OpenAPI files

## Quickstart

```bash
npx @scalar/cli help
```

## Installation

```bash
npm install -g @scalar/cli
scalar --version
```

## Usage

```bash
scalar init
scalar format openapi.json
scalar validate openapi.json
scalar bundle openapi.json --output bundle.json
scalar reference openapi.json --watch
scalar mock openapi.json --watch
scalar share openapi.json
```

[Full documentation](https://github.com/scalar/cli/blob/main/packages/cli/README.md)

## Community

We are API nerds. You too? Let’s chat on Discord: <https://discord.gg/8HeZcRGPFS>

## Contributors

Contributions are welcome! Read [`CONTRIBUTING`](https://github.com/scalar/cli/blob/main/CONTRIBUTING).

## License

The source code in this repository is licensed under [MIT](https://github.com/scalar/cli/blob/main/LICENSE).