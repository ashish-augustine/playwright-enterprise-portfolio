import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

class EnvConfig {
  private getEnvVariable(key: string, defaultValue?: string): string {
    const value = process.env[key] || defaultValue;
    if (!value) {
      throw new Error(
        `Environment variable [${key}] is missing and no default value was provided.`
      );
    }
    return value;
  }

  public readonly BASE_URL: string = this.getEnvVariable('BASE_URL', 'https://www.saucedemo.com');
  public readonly HEADLESS: boolean = this.getEnvVariable('HEADLESS', 'true') === 'true';
  public readonly TIMEOUT: number = parseInt(this.getEnvVariable('TIMEOUT', '30000'), 10);

  public readonly users = {
    standard: this.getEnvVariable('STANDARD_USER', 'standard_user'),
    lockedOut: this.getEnvVariable('LOCKED_OUT_USER', 'locked_out_user'),
    problem: this.getEnvVariable('PROBLEM_USER', 'problem_user'),
    performanceGlitch: this.getEnvVariable('PERFORMANCE_GLITCH_USER', 'performance_glitch_user'),
    error: this.getEnvVariable('ERROR_USER', 'error_user'),
    visual: this.getEnvVariable('VISUAL_USER', 'visual_user'),
  };

  public readonly PASSWORD: string = this.getEnvVariable('SECRET_PASSWORD', 'secret_sauce');
}

export const env = new EnvConfig();
