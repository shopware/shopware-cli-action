# Shopware CLI GitHub Action

Easily install the [Shopware CLI](https://github.com/shopware/shopware-cli) in your GitHub Actions workflows. Ready-to-use for building and packaging Shopware extensions in your CI pipelines.

## Prerequisites

- A GitHub repository using GitHub Actions.
- Recommended: Use on a Linux runner (e.g., `ubuntu-latest`).

## Setup

Create a file in your repository (e.g., `.github/workflows/shopware-cli.yml`) with the following contents:

```yaml
name: shopware-cli

on:
  pull_request:
  push:

permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Install Shopware CLI
        uses: shopware/shopware-cli-action@v1

      - name: Build and Package Extension
        run: shopware-cli extension zip .
```

## More Information

For more Shopware CLI documentation, visit [our developer docs](https://developer.shopware.com/docs/products/cli/).
