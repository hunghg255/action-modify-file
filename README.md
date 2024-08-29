<p align="center">
<a href="https://www.npmjs.com/package/action-modify-file" target="_blank" rel="noopener noreferrer">
<img src="https://api.iconify.design/simple-icons:githubactions.svg?color=%23cefdb4" alt="logo" width='100'/></a>
</p>

<p align="center">
  A Github actions to modify files in a repository.
</p>

<p align="center">
  <a href="https://github.com/hunghg255/action-modify-file/graphs/contributors" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg" alt="Contributors" /></a>
  <a href="https://github.com/hunghg255/action-modify-file/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/hunghg255/action-modify-file" alt="License" /></a>
</p>

## Usage

## Inputs

### `path`

**Required** The path to the file to write.

### `contents`

**Required** The contents of the file.

### `mode`

**Optional** The mode of writing to use: `overwrite`, `append`, or `preserve`.

Modes:

- `overwrite` - overwrite the file if it exists
- `append` - if the file exists, it will be appended to
- `preserve` - if the file already exists the contents will not be written to

**Default** `append`

## Outputs

### `size`

Returns the file size.

## Example usage

```yaml
uses: DamianReeves/write-file-action@master
with:
  path: ${{ env.home}}/.bashrc
  contents: |
    Hello World!
  mode: append
```

## Example usage with checkout, commit and push

```yaml
name: Overwrite some file

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Overwrite file
        uses: 'DamianReeves/write-file-action@master'
        with:
          path: path/to/file.js
          mode: overwrite
          contents: |
            console.log('some contents')

      - name: Commit & Push
        uses: Andro999b/push@v1.3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          branch: main
          force: true
          message: 'Overwritten by Github Actions - ${date}'
```
