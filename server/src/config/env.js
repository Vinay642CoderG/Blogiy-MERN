import dotenv from "dotenv";
import { cleanEnv, str, port, bool } from "envalid";

dotenv.config();

const env = cleanEnv(process.env, {
  PORT: port({ default: 5000 }),
  DEBUG: bool({ default: false }),
  NODE_ENV: str({
    choices: ["development", "production", "test"],
    default: "production",
  }),
  APP_HOST: str({ default: "" }),
  ALLOWED_ORIGINS: str({ default: "" }),
  MONGO_URI: str(),
  JWT_ACCESS_SECRET: str(),
  JWT_REFRESH_SECRET: str(),
  JWT_ACCESS_EXPIRES: str({ default: "15m" }),
  JWT_REFRESH_EXPIRES: str({ default: "7d" }),
  GEMINI_API_KEY: str({ default: "" }),
});

export default env;
