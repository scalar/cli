# Scalar CLI

WIP, not published yet

## Installation

Hey, `scalar` works just fine, but if you really want to become friends you should install the CLI:

```bash
npm -g install @scalar/cli
```

## Usage

### Format JSON files

```bash
scalar format openapi.json
```

### Lint OpenAPI files

```bash
scalar lint openapi.json
```

### Upload OpenAPI files to the Scalar Sandbox

```bash
scalar share openapi.json
```

### Configure the file name once

If you’re tired of passing the file name again and again, just configure it once:

```bash
scalar init
```

## Check which version is installed

```bash
scalar --version
```