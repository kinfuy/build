import { series } from 'gulp';
import { run, withTask } from '../package/utils';
import { buildTypescriptLib } from '../package/task';
import { createZip } from '../package/utils';
import path from 'path';
import { copyFiles } from './copyFile';
import { buildOutPath, enterPath, rootPath } from './const';
export default series(
  withTask('clear', () => run('pnpm run clear', '../')),
  withTask('build', async () => {
    await buildTypescriptLib({
      input: path.resolve(enterPath, 'index.ts'),
      outPutPath: buildOutPath,
      enterPath: enterPath,
      pkgPath: path.resolve(enterPath, 'package.json'),
      tsConfigPath: path.resolve(rootPath, 'tsconfig.json'),
    });
  }),
  copyFiles,
  withTask('createZip', async () => {
    await createZip({
      fileName: '@alqmc/build.zip',
      enterPath: buildOutPath,
      outPath: rootPath,
    });
  })
);
