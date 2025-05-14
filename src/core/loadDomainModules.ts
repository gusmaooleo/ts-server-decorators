import fg from 'fast-glob';
import { pathToFileUrl } from './utils/pathToFileUrl';

export async function loadDomainModules() {
  const patterns = [
    'src/**/{services,repositories}/**/*.{ts,js}'
  ];
  const files = await fg(patterns, { absolute: true });
  await Promise.all(
    files.map(file => import(pathToFileUrl(file)))
  );
}
