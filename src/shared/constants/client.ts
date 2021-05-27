export const ALLOWED_ORIGIN =
  process.env.NODE_ENV === 'development'
    ? /^http:\/\/localhost:4000$|^https:\/\/.+\.actuallycolab\.org$/
    : /^https:\/\/.+\.actuallycolab\.org$/;

export const ALLOWED_ORIGIN_PRETTY =
  process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : 'https://*.actuallycolab.org';
