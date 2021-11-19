module.exports = {
  apps: [{
    name: 'app',
    script: 'yarn',
    args: 'start:dev',
    //interpreter: "/bin/bash",
    env: {
      PORT: 8080,
      DB_HOST: 'localhost',
      DB_USER: 'root',
      DB_PASSWORD: '',
      DB_NAME: 'new_holidays',
      DB_PORT: 3306,
      SECRET_KEY: 'secret_key_safasf',
    }
  }]
}