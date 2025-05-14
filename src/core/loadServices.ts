import fg from 'fast-glob';
import path from 'path';

export async function loadDomainModules() {
  const patterns = [
    path.join(process.cwd(), 'src/**/services/**/*.{ts,js}'),
    path.join(process.cwd(), 'src/**/repositories/**/*.{ts,js}')
  ];

  const files = await fg(patterns, { dot: false });
  
  await Promise.all(
    files.map(async file => {
      const fullPath = path.resolve(file);
      await import(fullPath);
    })
  );
}
