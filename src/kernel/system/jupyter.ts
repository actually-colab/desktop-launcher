import { promiseExec } from '../../shared/system/process';

/**
 * Get the version of the kernel gateway on the host. This serves as a way of verifying the gateway is operational
 */
export const getGatewayVersion = async (): Promise<string | null> => {
  let output: {
    stdout: string;
    stderr: string;
  } | null = null;

  try {
    output = await promiseExec('jupyter notebook --version');
  } catch (error) {
    console.error(error);
    return null;
  }

  if (output?.stderr) {
    console.log('stderr', output.stderr);
    return null;
  }

  return output?.stdout ?? null;
};

/**
 * Try to install the kernel gateway and then return the version
 */
export const installGateway = async (): Promise<string | null> => {
  try {
    const { stderr, stdout } = await promiseExec('pip3 install notebook');

    console.log('Install output', { stderr, stdout });
  } catch (error) {
    console.error(error);
    return null;
  }

  return getGatewayVersion();
};
