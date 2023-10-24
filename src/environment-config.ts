type SeekerEnvironment = {
  isProduction: boolean;
};

const development: SeekerEnvironment = {
  isProduction: false
};

const production: SeekerEnvironment = {
  isProduction: true
};

export const environment: SeekerEnvironment =
  process.env.NODE_ENV === 'development' ? development : production;
