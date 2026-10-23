import { env } from '../config/env.config';

export interface UserPersona {
  username: string;
  description: string;
  expectedBehavior: 'success' | 'locked_out' | 'glitch' | 'error' | 'problem';
}

export const USER_PERSONAS: Record<string, UserPersona> = {
  STANDARD: {
    username: env.users.standard,
    description: 'Standard user with full e2e access',
    expectedBehavior: 'success',
  },
  LOCKED_OUT: {
    username: env.users.lockedOut,
    description: 'Locked out user who receives error on login',
    expectedBehavior: 'locked_out',
  },
  PROBLEM: {
    username: env.users.problem,
    description: 'Problem user with glitchy image assets and form inputs',
    expectedBehavior: 'problem',
  },
  PERFORMANCE_GLITCH: {
    username: env.users.performanceGlitch,
    description: 'Performance glitch user with artificial page load delays',
    expectedBehavior: 'glitch',
  },
  ERROR: {
    username: env.users.error,
    description: 'Error user that triggers checkout and inventory errors',
    expectedBehavior: 'error',
  },
};
