export const ALLOWED_ORIGIN =
  process.env.NODE_ENV === 'development'
    ? /^http:\/\/localhost:4000$|^https:\/\/staging\.actuallycolab\.org$/
    : /^https:\/\/staging\.actuallycolab\.org$|^https:\/\/app\.actuallycolab\.org$/;

export const ALLOWED_ORIGIN_PRETTY =
  process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : 'https://app.actuallycolab.org';
