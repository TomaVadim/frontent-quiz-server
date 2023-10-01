import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "dev"}` });

export const {
  PORT,
  ORIGIN,
  LOG_DIR,
  LOG_FORMAT,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} = process.env;
export const USE_CREDENTIALS = process.env.USE_CREDENTIALS === "true";
