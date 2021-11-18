/* eslint-disable prettier/prettier */
module.exports = {
  apps: [
    {
      name: 'app',
      script: 'yarn',
      args: 'start:dev',
      interpreter: '/bin/bash',
      env: {
        PORT: 8080,
        DB_HOST: 'remotemysql.com',
        DB_USER: 'AIqO6told3',
        DB_PASSWORD: 'ffQRNsZoNk',
        DB_NAME: 'AIqO6told3',
        DB_PORT: 3306,
        SECRET_KEY: 'secret_key_safasf',
      },
    },
  ],
};
