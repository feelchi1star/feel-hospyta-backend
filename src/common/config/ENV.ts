const ENV = {
  APP_NAME: process.env.APP_NAME,
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: Number(process.env.PORT),
  // JWT
  jwtSecretKey: process.env.jwtSecretKey,
  jwtExpiresIn: process.env.jwtExpiresIn || '1h',
};

export default ENV;
