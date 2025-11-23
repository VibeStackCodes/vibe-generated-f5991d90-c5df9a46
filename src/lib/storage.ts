import { STORAGE_KEYS } from './constants';

export interface StorageItem<T> {
  data: T;
  timestamp: number;
  version: number;
}

const STORAGE_VERSION = 1;

export class LocalStorage {
  static set<T>(key: string, value: T, expiresIn?: number): void {
    try {
      const item: StorageItem<T> = {
        data: value,
        timestamp: Date.now(),
        version: STORAGE_VERSION,
      };
      localStorage.setItem(key, JSON.stringify(item));

      if (expiresIn) {
        setTimeout(() => {
          localStorage.removeItem(key);
        }, expiresIn);
      }
    } catch (error) {
      console.error(`Failed to set storage key ${key}:`, error);
    }
  }

  static get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const parsed: StorageItem<T> = JSON.parse(item);
      return parsed.data;
    } catch (error) {
      console.error(`Failed to get storage key ${key}:`, error);
      return null;
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove storage key ${key}:`, error);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }

  static getAllKeys(): string[] {
    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.error('Failed to get storage keys:', error);
      return [];
    }
  }

  static exists(key: string): boolean {
    try {
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error(`Failed to check storage key ${key}:`, error);
      return false;
    }
  }
}

export class SessionStorage {
  static set<T>(key: string, value: T): void {
    try {
      const item: StorageItem<T> = {
        data: value,
        timestamp: Date.now(),
        version: STORAGE_VERSION,
      };
      sessionStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error(`Failed to set session storage key ${key}:`, error);
    }
  }

  static get<T>(key: string): T | null {
    try {
      const item = sessionStorage.getItem(key);
      if (!item) return null;

      const parsed: StorageItem<T> = JSON.parse(item);
      return parsed.data;
    } catch (error) {
      console.error(`Failed to get session storage key ${key}:`, error);
      return null;
    }
  }

  static remove(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove session storage key ${key}:`, error);
    }
  }

  static clear(): void {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error('Failed to clear session storage:', error);
    }
  }
}
