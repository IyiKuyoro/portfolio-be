import dotenv from 'dotenv';

dotenv.config();

const config = () => {
  const env = process.env.NODE_ENV;

  switch (env) {
    case 'test': {
      return {
        PORT: process.env.PORT,
      };
    }
    case 'prod': {
      return {
        PORT: process.env.PORT,
      };
    }
    default: {
      return {
        PORT: process.env.PORT,
      };
    }
  }
};

export default config();
