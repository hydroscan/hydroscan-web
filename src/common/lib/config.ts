const isServer = () => {
  return typeof window === 'undefined';
};

export const runtimeEnv = isServer()
  ? {
      HYDROSCAN_API_URL: process.env.HYDROSCAN_API_URL
    }
  : {
      HYDROSCAN_API_URL: window.env.HYDROSCAN_API_URL
    };
