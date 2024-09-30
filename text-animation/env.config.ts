export enum Environment {
  DEVELOPMENT = "DEVELOPMENT",
  STAGING = "STAGING",
  PRODUCTION = "PRODUCTION",
}

export type EnvironmentProps = "DEVELOPMENT" | "STAGING" | "PRODUCTION";
export const ENV: EnvironmentProps = Environment.DEVELOPMENT;
