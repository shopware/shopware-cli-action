# Shopware CLI GitHub Action

Easily install the [Shopware CLI](https://github.com/shopware/shopware-cli) in your GitHub Actions workflows. Ready-to-use for building and packaging Shopware extensions in your CI pipelines.

## Prerequisites

- A GitHub repository using GitHub Actions.
- Recommended: Use on a Linux runner (e.g., `ubuntu-latest`).

## Setup

1. **Add Workflow File** 

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

2. **Commit and Push**

Add, commit, and push your workflow file to your repository. The workflow will now run automatically on pushes and pull requests.

## How it Works

- The action installs the **Shopware CLI** binary into your workflow runner.
- You can now run any `shopware-cli` command directly in your workflow—for example, build and package your extension with:

  ```bash
  shopware-cli extension zip .
  ```

## Customization

- Modify the `run` command step to match your specific Shopware CLI workflow needs.
- Combine with other GitHub Actions for test, code quality, etc. as required.

## More Information

For more Shopware CLI documentation, visit [our developer docs](https://developer.shopware.com/docs/products/cli/).