import { Cart } from "./types";

export const saveToLocalStorage = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save ${key} to localStorage:`, error);
  }
};

export const getFromLocalStorage = (key: string): Cart | null => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as Cart) : null;
  } catch (error) {
    console.error(`Failed to retrieve ${key} from localStorage:`, error);
    return null;
  }
};
