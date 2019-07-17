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
        TWITTER_API_SECRETE_KEY: process.env.TWITTER_API_SECRETE_KEY,
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
        TWITTER_API_SECRETE_KEY: process.env.TWITTER_API_SECRETE_KEY,
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
        TWITTER_API_SECRETE_KEY: process.env.TWITTER_API_SECRETE_KEY,
      };
    }
  }
};

module.exports = config();
