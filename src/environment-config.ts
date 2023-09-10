interface EnvConfig {
    dbScriptPath: string
}


const development: EnvConfig = {
    dbScriptPath: "./dev"
};

const production: EnvConfig = {
    dbScriptPath: "./dev"
};

export const environment: EnvConfig = process.env.NODE_ENV === "development" ? development : production;



