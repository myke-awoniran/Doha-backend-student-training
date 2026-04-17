import {config as processEnv} from "dotenv";

processEnv();
export const config = {
    postgres: {
        credentials: {
            uri: <string>process.env.DATABASE_URL,
        },
    },

    redis: {
        uri: <string>process.env.REDIS_URI_WITH_AUTH,
        disabled: (process.env.REDIS_DISABLED ?? "").toLowerCase() === "true"
    },

    environment: <string>process.env.APP_ENV,

    port: Number(process.env.PORT || 3000),

    timezone: process.env.SERVER_TIME_ZONE as unknown as string,

    system: {
        corsOrigin: <string>process.env.CORS_ORIGIN,
        rateLimitWindowMs: <string>process.env.RATE_LIMIT_WINDOW,
        rateLimitMax: <string>process.env.RATE_LIMIT_MAX,
    },

};
