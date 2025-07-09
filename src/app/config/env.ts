import dotenv from "dotenv";

dotenv.config();

interface ENVVARS {
  DB_URL: string;
  PORT: string;
  NODE_ENV: "development" | "production";
}

const loadEnvVars = (): ENVVARS => {
  const requiredENV: string[] = ["DB_URL", "PORT", "NODE_ENV"];

  requiredENV.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing require environment variable ${key}`);
    }
  });

  return {
    DB_URL: process.env.DB_URL as string,
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
  };
};

export const envVars = loadEnvVars();
