import { GATEWAY_BASE_URI } from '../../shared/constants/jupyter';

const GATEWAY_STEM = `${GATEWAY_BASE_URI}:`;

/**
 * Get the gateway URI from the kernel message
 */
export const extractGatewayUri = (message: string) => {
  const index = message.indexOf(GATEWAY_STEM);

  if (index >= 0) {
    const subMessage = message.substring(index);
    const tokenIndex = subMessage.indexOf('/?token=');

    if (tokenIndex === -1) {
      return subMessage;
    }

    return subMessage.substring(0, tokenIndex).trim();
  }

  return '';
};

/**
 * Convert the gateway uri to a websocket uri
 */
export const getGatewayWebSocketUri = (uri: string) => {
  return uri.replace('http://', 'ws://');
};
