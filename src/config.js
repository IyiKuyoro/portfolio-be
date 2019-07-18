import dotenv from 'dotenv';

dotenv.config();

const config = () => {
  const env = process.env.NODE_ENV;

  switch (env) {
    case 'test': {
      return {
        PORT: process.env.PORT,
        SA_EMAIL: process.env.SA_EMAIL,
        SA_PASSWORD: process.env.SA_PASSWORD,
        SA_USERNAME: process.env.SA_USERNAME,
        SECRET: process.env.SECRET,
        URL: process.env.URL,
        TWITTER_API_ID: process.env.TWITTER_API_ID,
        TWITTER_API_KEY: process.env.TWITTER_API_KEY,
        TWITTER_API_SECRETE_KEY: process.env.TWITTER_API_SECRETE_KEY,
        TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
        TWITTER_TOKEN_SECRETE: process.env.TWITTER_TOKEN_SECRETE,
      };
    }
    case 'production': {
      return {
        PORT: process.env.PORT,
        SA_EMAIL: process.env.SA_EMAIL,
        SA_PASSWORD: process.env.SA_PASSWORD,
        SA_USERNAME: process.env.SA_USERNAME,
        SECRET: process.env.SECRET,
        URL: process.env.URL,
        TWITTER_API_ID: process.env.TWITTER_API_ID,
        TWITTER_API_KEY: process.env.TWITTER_API_KEY,
        TWITTER_API_SECRETE_KEY: process.env.TWITTER_API_SECRETE_KEY,
        TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
        TWITTER_TOKEN_SECRETE: process.env.TWITTER_TOKEN_SECRETE,
      };
    }
    default: {
      return {
        PORT: process.env.PORT,
        SA_EMAIL: process.env.SA_EMAIL,
        SA_PASSWORD: process.env.SA_PASSWORD,
        SA_USERNAME: process.env.SA_USERNAME,
        SECRET: process.env.SECRET,
        URL: process.env.URL,
        TWITTER_API_ID: process.env.TWITTER_API_ID,
        TWITTER_API_KEY: process.env.TWITTER_API_KEY,
        TWITTER_API_SECRETE_KEY: process.env.TWITTER_API_SECRETE_KEY,
        TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
        TWITTER_TOKEN_SECRETE: process.env.TWITTER_TOKEN_SECRETE,
      };
    }
  }
};

module.exports = config();
