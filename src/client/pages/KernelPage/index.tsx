import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import { format } from 'date-fns';
import { Button, Icon } from 'rsuite';

import { ReduxState } from '../../redux';
import { palette, spacing } from '../../constants/theme';
import useKernel from '../../kernel/useKernel';
import { StatusIndicator } from '../../components';
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
  output: {
    flex: 1,
    marginTop: spacing.DEFAULT / 4,
    marginBottom: 0,
    paddingTop: spacing.DEFAULT / 2,
    paddingLeft: spacing.DEFAULT / 2,
    paddingRight: spacing.DEFAULT / 4,
    borderRadius: 4,
    backgroundColor: palette.CHARCOAL,
    color: palette.BASE,
    overflowX: 'auto',
    overflowY: 'auto',
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
 * The kernel page
 */
const KernelPage: React.FC = () => {
  // Connect to IPC
  useKernel();

  const kernelPid = useSelector((state: ReduxState) => state.kernel.kernelPid);
  const gatewayVersion = useSelector((state: ReduxState) => state.kernel.gatewayVersion);
  const gatewayUri = useSelector((state: ReduxState) => state.kernel.gatewayUri);
  const kernelStdout = useSelector((state: ReduxState) => state.kernel.kernelStdout);

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.page)}>
        <div className={css(styles.editableAreaContainer)}>
          <div className={css(styles.editableArea)}>
            <div className={css(styles.kernelContainer)}>
              <div className={css(styles.headerContainer)}>
                <div>
                  <KeyValue
                    attributeKey="Gateway URI"
                    attributeValue={
                      <React.Fragment>
                        <StatusIndicator textPlacement="right" color={gatewayUri ? palette.SUCCESS : palette.ERROR} />
                        {gatewayUri || 'Unknown'}
                      </React.Fragment>
                    }
                  />

                  <KeyValue
                    attributeKey="Gateway Version"
                    attributeValue={
                      <React.Fragment>
                        <StatusIndicator
                          textPlacement="right"
                          color={gatewayVersion ? palette.SUCCESS : palette.ERROR}
                        />
                        {gatewayVersion || 'Unknown'}
                      </React.Fragment>
                    }
                  />

                  <KeyValue
                    attributeKey="Kernal PID"
                    attributeValue={
                      <React.Fragment>
                        <StatusIndicator
                          textPlacement="right"
                          color={kernelPid !== -1 ? palette.SUCCESS : palette.ERROR}
                        />
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
              {kernelStdout.length > 0 && (
                <pre className={css(styles.output)}>
                  {kernelStdout.map((stdout) => (
                    <React.Fragment key={stdout.id}>
                      <span className={css(styles.bold)}>{format(stdout.date, 'Pp')}</span>
                      {'\n'}
                      {stdout.message}
                      {'\n\n'}
                    </React.Fragment>
                  ))}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KernelPage;
