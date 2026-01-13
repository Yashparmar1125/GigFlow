export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
  },
  GIGS: {
    BASE: '/api/gigs',
    BY_ID: (id: string) => `/api/gigs/${id}`,
    MY_GIGS: '/api/gigs/my-gigs',
    BIDS: (id: string) => `/api/gigs/${id}/bids`,
  },
  BIDS: {
    BASE: '/api/bids',
    MY_BIDS: '/api/bids/my-bids',
    HIRE: (id: string) => `/api/bids/${id}/hire`,
  },
};

