import { shell } from 'electron';

/**
 * The stem for the app's protocol. This allows redirects to open the app and send data
 */
export const PROTOCOL_STEM = 'actuallycolab://';
/**
 * The base URI for the login page
 */
export const BASE_REDIRECT_URI =
  process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : 'https://app.actuallycolab.org';

/**
 * Open the webpage in the user's default browser
 */
export const openAppPage = () => {
  shell.openExternal(BASE_REDIRECT_URI);
};
