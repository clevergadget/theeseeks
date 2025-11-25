import fs from 'fs';
import path from 'path';

export class Shadow {
  private static cultureDir = '.culture';

  static getCompanionPath(rawPath: string): string {
    // e.g. src/index.ts -> .culture/src/index.ts.md
    // Ensure we are working with relative paths to the project root
    const relative = path.isAbsolute(rawPath) 
      ? path.relative(process.cwd(), rawPath) 
      : rawPath;
      
    return path.join(this.cultureDir, `${relative}.md`);
  }

  static exists(rawPath: string): boolean {
    return fs.existsSync(this.getCompanionPath(rawPath));
  }

  static read(rawPath: string): string | null {
    const companionPath = this.getCompanionPath(rawPath);
    if (fs.existsSync(companionPath)) {
      return fs.readFileSync(companionPath, 'utf-8');
    }
    return null;
  }
  
  static ensureStructure(rawPath: string): void {
     const companionPath = this.getCompanionPath(rawPath);
     const dir = path.dirname(companionPath);
     if (!fs.existsSync(dir)) {
         fs.mkdirSync(dir, { recursive: true });
     }
  }
}
