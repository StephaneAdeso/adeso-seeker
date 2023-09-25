type SeekerEnvironment = {
  dbScriptPath: string;
};

const development: SeekerEnvironment = {
  dbScriptPath: './dev'
};

const production: SeekerEnvironment = {
  dbScriptPath: './pro'
};

export const environment: SeekerEnvironment =
  process.env.NODE_ENV === 'development' ? development : production;
