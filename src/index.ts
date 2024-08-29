import { appendFile, exists, writeFile, stat } from 'node:fs';
import { dirname } from 'node:path';
import { promisify } from 'node:util';

import { getInput, setFailed, setOutput } from '@actions/core';
import { mkdirP } from '@actions/io';

const appendFileAsync = promisify(appendFile);
const existsAsync = promisify(exists);
const writeFileAsync = promisify(writeFile);
const statAsync = promisify(stat);

async function main() {
  try {
    const path = getInput('path', { required: true });
    const contents = getInput('contents', { required: true });
    const mode = (getInput('mode') || 'append').toLocaleLowerCase();

    // Ensure the correct mode is specified
    if (mode !== 'append' && mode !== 'overwrite' && mode !== 'preserve') {
      setFailed('Mode must be one of: overwrite, append, or preserve');
      return;
    }

    // Preserve the file
    if (mode === 'preserve' && (await existsAsync(path))) {
      const statResult = await statAsync(path);
      setOutput('size', `${statResult.size}`);
      return;
    }

    const targetDir = dirname(path);

    await mkdirP(targetDir);

    await (mode === 'overwrite' ? writeFileAsync(path, contents) : appendFileAsync(path, contents));

    const statResult = await statAsync(path);
    setOutput('size', `${statResult.size}`);
  } catch (error) {
    setFailed((error as Error).message);
  }
}

// eslint-disable-next-line unicorn/prefer-top-level-await
main();
