import { GATEWAY_BASE_URI } from '../../shared/constants/jupyter';

const GATEWAY_STEM = `${GATEWAY_BASE_URI}:`;

/**
 * Get the gateway URI from the kernel message
 */
export const extractGatewayUri = (message: string) => {
  const index = message.indexOf(GATEWAY_STEM);

  if (index >= 0) {
    return message.substring(index).trim();
  }

  return '';
};

/**
 * Convert the gateway uri to a websocket uri
 */
export const getGatewayWebSocketUri = (uri: string) => {
  return uri.replace('http://', 'ws://');
};
