import 'dotenv/config'
import Joi from 'joi';

interface EnvVars {
  NODE_ENV?: 'production' | 'development' | 'test';
  PORT?: number;
  SYSTEM_DOMAIN?: string;
}

const envVarsSchema = Joi.object<EnvVars>({
  NODE_ENV: Joi.string().valid('production', 'development', 'test'),
  PORT: Joi.number().default(8000),
  SYSTEM_DOMAIN: Joi.string().description('Domain name'),
}).unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  domain: envVars.SYSTEM_DOMAIN,
};

export default config