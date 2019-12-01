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
        REDISCLOUD_URL: process.env.REDISCLOUD_URL,
        CLOUDINARY_CLOUDNAME: 'cloudname',
        CLOUDINARY_API_KEY: 'cloudinary api key',
        CLOUDINARY_API_SECRETE: 'cloudinary api secrete',
        CLOUDINARY_FOLDER: 'example',
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
        REDISCLOUD_URL: process.env.REDISCLOUD_URL,
        CLOUDINARY_CLOUDNAME: process.env.CLOUDINARY_CLOUDNAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRETE: process.env.CLOUDINARY_API_SECRETE,
        CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER,
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
        REDISCLOUD_URL: process.env.REDISCLOUD_URL,
        CLOUDINARY_CLOUDNAME: process.env.CLOUDINARY_CLOUDNAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRETE: process.env.CLOUDINARY_API_SECRETE,
        CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER,
      };
    }
  }
};

module.exports = config();
