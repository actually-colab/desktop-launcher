import React from 'react';
import { clipboard } from 'electron';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import { Button, Icon, IconButton, IconProps } from 'rsuite';

import { ALLOWED_ORIGIN_PRETTY } from '../../../shared/constants/client';

import { ReduxState } from '../../redux';
import { _kernel } from '../../redux/actions';
import { palette, spacing } from '../../constants/theme';
import useKernel from '../../kernel/useKernel';
import { openAppPage } from '../../utils/redirect';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  page: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  editableAreaContainer: {
    display: 'flex',
    flex: 1,
    backgroundColor: palette.BASE,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  editableArea: {
    display: 'flex',
    flex: 1,
    padding: spacing.DEFAULT,
    overflowY: 'auto',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  redirectText: {
    marginRight: spacing.DEFAULT / 2,
  },
  kernelContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 0,
    overflowY: 'hidden',
  },
  keyValue: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: spacing.DEFAULT / 2,
  },
  keyText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 10,
  },
  valueText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyButton: {
    marginLeft: spacing.DEFAULT / 4,
  },
  outputContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column-reverse',
    overflowX: 'auto',
    overflowY: 'auto',
    borderRadius: 4,
    backgroundColor: palette.LIGHT_GRAY,
  },
  output: {
    flex: 1,
    marginTop: spacing.DEFAULT / 4,
    marginBottom: 0,
    paddingTop: spacing.DEFAULT / 2,
    paddingBottom: spacing.DEFAULT / 2,
    paddingLeft: spacing.DEFAULT / 2,
    paddingRight: spacing.DEFAULT / 4,
    color: palette.ALMOST_BLACK,
    fontSize: 12,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  bold: {
    fontWeight: 'bold',
  },
});

/**
 * A key value pair component
 */
const KeyValue: React.FC<{ attributeKey: string | React.ReactNode; attributeValue: string | React.ReactNode }> = ({
  attributeKey,
  attributeValue,
}) => {
  return (
    <div className={css(styles.keyValue)}>
      <span className={css(styles.keyText)}>{attributeKey}</span>
      <span className={css(styles.valueText)}>{attributeValue}</span>
    </div>
  );
};

/**
 * A check or x indicator for status health
 */
const StatusIcon: React.FC<{
  healthy: boolean;
  healthyIcon?: IconProps['icon'];
  unhealthyIcon?: IconProps['icon'];
}> = ({ healthy, healthyIcon = 'check', unhealthyIcon = 'close' }) => {
  return (
    <Icon
      icon={healthy ? healthyIcon : unhealthyIcon}
      style={{
        width: 18,
        color: healthy ? palette.SUCCESS : palette.ERROR,
      }}
    />
  );
};

/**
 * Mounted helper hooks
 */
const Helpers: React.FC = () => {
  // Connect to IPC
  useKernel();

  return null;
};

/**
 * The kernel page
 */
const KernelPage: React.FC = () => {
  const kernelPid = useSelector((state: ReduxState) => state.kernel.kernelPid);
  const kernelToken = useSelector((state: ReduxState) => state.kernel.kernelToken);
  const gatewayVersion = useSelector((state: ReduxState) => state.kernel.gatewayVersion);
  const gatewayUri = useSelector((state: ReduxState) => state.kernel.gatewayUri);
  const kernelStdout = useSelector((state: ReduxState) => state.kernel.kernelStdout);

  const dispatch = useDispatch();
  const dispatchRequestNewToken = React.useCallback(() => dispatch(_kernel.kernelProcessRequestNewToken()), [dispatch]);

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.page)}>
        <div className={css(styles.editableAreaContainer)}>
          <div className={css(styles.editableArea)}>
            <div className={css(styles.kernelContainer)}>
              <div className={css(styles.headerContainer)}>
                <div>
                  <KeyValue
                    attributeKey="Allowed Origin"
                    attributeValue={
                      <React.Fragment>
                        <StatusIcon healthy healthyIcon="lock" unhealthyIcon="lock" />
                        {ALLOWED_ORIGIN_PRETTY}
                      </React.Fragment>
                    }
                  />

                  <KeyValue
                    attributeKey="Jupyter URI"
                    attributeValue={
                      <React.Fragment>
                        <StatusIcon healthy={gatewayUri !== ''} />
                        {gatewayUri || 'Unknown'}
                      </React.Fragment>
                    }
                  />

                  <KeyValue
                    attributeKey={
                      <React.Fragment>
                        <span>Jupyter Token</span>
                        <IconButton
                          className={css(styles.copyButton)}
                          appearance="subtle"
                          size="xs"
                          icon={<Icon icon="refresh" />}
                          onClick={dispatchRequestNewToken}
                        />
                      </React.Fragment>
                    }
                    attributeValue={
                      <React.Fragment>
                        <StatusIcon healthy={kernelToken !== ''} healthyIcon="key" unhealthyIcon="key" />
                        {kernelToken || 'Unknown'}
                        <IconButton
                          className={css(styles.copyButton)}
                          appearance="subtle"
                          size="xs"
                          icon={<Icon icon="copy" />}
                          onClick={() => clipboard.writeText(kernelToken)}
                        />
                      </React.Fragment>
                    }
                  />

                  <KeyValue
                    attributeKey="Jupyter Version"
                    attributeValue={
                      <React.Fragment>
                        <StatusIcon healthy={gatewayVersion !== ''} />
                        {gatewayVersion || 'Unknown'}
                      </React.Fragment>
                    }
                  />

                  <KeyValue
                    attributeKey="Kernal PID"
                    attributeValue={
                      <React.Fragment>
                        <StatusIcon healthy={kernelPid !== -1} />
                        {kernelPid !== -1 ? kernelPid : 'No Process'}
                      </React.Fragment>
                    }
                  />
                </div>

                <div>
                  <Button appearance="primary" onClick={() => openAppPage()}>
                    <span className={css(styles.redirectText)}>Open in your browser</span>
                    <Icon icon="external-link" />
                  </Button>
                </div>
              </div>

              <p className={css(styles.keyText)}>Kernel Stdout</p>
              <div className={css(styles.outputContainer)}>
                <div>
                  <pre className={css(styles.output)}>
                    {kernelStdout.map((stdout) => (
                      <React.Fragment key={stdout.id}>{stdout.message}</React.Fragment>
                    ))}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Wrap the page with helpers
 */
const KernelPageContainer: React.FC = () => {
  return (
    <React.Fragment>
      <Helpers />
      <KernelPage />
    </React.Fragment>
  );
};

export default KernelPageContainer;
