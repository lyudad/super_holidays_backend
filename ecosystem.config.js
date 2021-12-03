module.exports = {
  apps: [
    {
      name: 'super_holidays',
      script: 'npm',
      args: 'start',
      // interpreter: '/bin/bash',
      watch: true,
      env: {
        PORT: 8081,
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
/* eslint-disable prettier/prettier */
