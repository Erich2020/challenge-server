import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/CHALLENGE',
  jwtSecret: process.env.JWT_SECRET || 'DHMn/NH7qv4H6zxgiFOB',
  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10'),
  APIKEY: process.env.APIKEY,
};

export default config;
