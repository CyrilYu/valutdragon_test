module.exports = {
  env: process.env.NODE_ENV || 'dev',
  dev: {
      mongodb: {
          host: 'mongodb://localhost:27017',
          db: 'vaultdragon'
      }
  },
  staging: {
      mongodb: {
          host: 'mongodb://localhost:27017',
          db: 'members_staging'
      }
  },
  production: {
      mongodb: {
          host: 'mongodb://localhost:27017',
          db: 'members_production'
      }
  }
};
