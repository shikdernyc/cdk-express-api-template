import * as dotenv from 'dotenv'

dotenv.config()

export const GetEnvOrThrow = (key: string): string => {
  const value = process.env[key]
  if (value === undefined || value === null) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}
