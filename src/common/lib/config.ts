export const isServer = () => {
  return typeof window === 'undefined';
};

export const runtimeEnv = isServer()
  ? {
      HYDROSCAN_INTRA_API_URL: process.env.HYDROSCAN_INTRA_API_URL,
      HYDROSCAN_PUBLIC_API_URL: process.env.HYDROSCAN_PUBLIC_API_URL
    }
  : {
      HYDROSCAN_INTRA_API_URL: window.env.HYDROSCAN_INTRA_API_URL,
      HYDROSCAN_PUBLIC_API_URL: window.env.HYDROSCAN_PUBLIC_API_URL
    };

export const HYDROSCAN_API_URL = isServer() ? runtimeEnv.HYDROSCAN_INTRA_API_URL : runtimeEnv.HYDROSCAN_PUBLIC_API_URL;
