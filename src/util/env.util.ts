export const getEnvOrThrow = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};

export const getEnvOrDefault = (key: string, defaultValue: string): string => {
  return process.env[key] ?? defaultValue;
};
