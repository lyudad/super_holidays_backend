/* eslint-disable prettier/prettier */
module.exports = {
  apps: [
    {
      name: 'app',
      script: 'yarn',
      args: 'start:dev',
      interpreter: '/bin/bash',
      env: {
        PORT: Number(process.env.PORT),
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_USER,
        DB_PORT: Number(process.env.DB_PORT),
        SECRET_KEY: process.env.SECRET_KEY,
      },
    },
  ],
};
