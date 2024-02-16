# Scalar CLI

[![CI](https://github.com/scalar/cli/actions/workflows/ci.yml/badge.svg)](https://github.com/scalar/cli/actions/workflows/ci.yml)
[![Release](https://github.com/scalar/cli/actions/workflows/release.yml/badge.svg)](https://github.com/scalar/cli/actions/workflows/release.yml)
[![Contributors](https://img.shields.io/github/contributors/scalar/cli)](https://github.com/scalar/cli/graphs/contributors)
[![GitHub License](https://img.shields.io/github/license/scalar/cli)](https://github.com/scalar/cli/blob/main/LICENSE)
[![Discord](https://img.shields.io/discord/1135330207960678410?style=flat&color=5865F2)](https://discord.gg/8HeZcRGPFS)

Command-line interface to work with OpenAPI files

![Demo Video](https://github.com/scalar/cli/assets/6374090/ebd02178-503d-4a70-b292-a52a74b35008)

## Features

- Format & validate OpenAPI files
- Upload your OpenAPI files to Scalar
- Get a fully mocked API for testing purposes
- Preview your API reference
- Bundle multiple OpenAPI files

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

### GitHub Actions

To validate your OpenAPI file in GitHub Actions, add this workflow:

```yml
# .github/workflows/validate-openapi-file.yml
name: Validate OpenAPI File

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  validate:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Validate OpenAPI File
        # Replace `./my-openapi-file.json` with the correct path and filename for your project.
        # Or: run `npx @scalar/cli init` and add the config file to your repository.
        run: npx @scalar/cli validate ./my-openapi-file.json
```

## Community

We are API nerds. You too? Let’s chat on Discord: <https://discord.gg/8HeZcRGPFS>

## Contributors

<!-- readme: collaborators,contributors -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/hanspagel">
            <img src="https://avatars.githubusercontent.com/u/1577992?v=4" width="100;" alt="hanspagel"/>
            <br />
            <sub><b>hanspagel</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/hwkr">
            <img src="https://avatars.githubusercontent.com/u/6374090?v=4" width="100;" alt="hwkr"/>
            <br />
            <sub><b>hwkr</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: collaborators,contributors -end -->

Contributions are welcome! Read [`CONTRIBUTING`](https://github.com/scalar/cli/blob/main/CONTRIBUTING).

## License

The source code in this repository is licensed under [MIT](https://github.com/scalar/cli/blob/main/LICENSE).
