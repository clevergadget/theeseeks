import fs from 'fs';
import path from 'path';

export interface SeekerProfileData {
  name: string;
  intent: string;
  state: 'Calm' | 'Frantic' | 'Weary';
  lastInteraction: string;
  stats: {
    sessions: number;
    wearinessCount: number;
    franticCount: number;
    tokensSaved: number; // Cumulative Burden Delta
    totalTokensEstimated: number; // Cumulative tokens sent across the bridge
    resonanceSum: number; // Sum of all resonance scores (1-5)
    resonanceCount: number; // Number of rated sessions
  };
}

export class SeekerProfile {
  private static profileDir = '.theeseeks';
  private static profileFile = 'profile.json';

  private static getPath(): string {
    return path.join(process.cwd(), this.profileDir, this.profileFile);
  }

  static init(name: string = 'Seeker'): void {
    const dir = path.join(process.cwd(), this.profileDir);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const initialData: SeekerProfileData = {
      name,
      intent: '',
      state: 'Calm',
      lastInteraction: new Date().toISOString(),
      stats: {
        sessions: 0,
        wearinessCount: 0,
        franticCount: 0,
        tokensSaved: 0,
        totalTokensEstimated: 0,
        resonanceSum: 0,
        resonanceCount: 0
      }
    };

    this.save(initialData);
  }

  static load(): SeekerProfileData | null {
    const p = this.getPath();
    if (fs.existsSync(p)) {
      try {
        return JSON.parse(fs.readFileSync(p, 'utf-8'));
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  static save(data: SeekerProfileData): void {
    fs.writeFileSync(this.getPath(), JSON.stringify(data, null, 2));
  }

  static update(partial: Partial<SeekerProfileData>): void {
    const current = this.load();
    if (current) {
      const updated = { ...current, ...partial, lastInteraction: new Date().toISOString() };
      this.save(updated);
    }
  }
}
