import path from 'path';

export function pathToFileUrl(file: string) {
  const resolved = path.resolve(file);
  const prefix = resolved.startsWith('/') ? '' : '/';
  return `file://${prefix}${resolved.replace(/\\/g, '/')}`;
}