import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import { Button, Icon } from 'rsuite';

import { ALLOWED_ORIGIN } from '../../../shared/constants/client';

import { ReduxState } from '../../redux';
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
  output: {
    flex: 1,
    marginTop: spacing.DEFAULT / 4,
    marginBottom: 0,
    paddingTop: spacing.DEFAULT / 2,
    paddingLeft: spacing.DEFAULT / 2,
    paddingRight: spacing.DEFAULT / 4,
    borderRadius: 4,
    backgroundColor: palette.LIGHT_GRAY,
    color: palette.ALMOST_BLACK,
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
 * A check or x indicator for status health
 */
const StatusIcon: React.FC<{ healthy: boolean }> = ({ healthy }) => {
  return (
    <Icon
      icon={healthy ? 'check' : 'close'}
      style={{
        width: 18,
        color: healthy ? palette.SUCCESS : palette.ERROR,
      }}
    />
  );
};

/**
 * The kernel page
 */
const KernelPage: React.FC = () => {
  // Connect to IPC
  useKernel();

  const outputAnchorRef = React.useRef<HTMLDivElement | null>(null);

  const kernelPid = useSelector((state: ReduxState) => state.kernel.kernelPid);
  const gatewayVersion = useSelector((state: ReduxState) => state.kernel.gatewayVersion);
  const gatewayUri = useSelector((state: ReduxState) => state.kernel.gatewayUri);
  const kernelStdout = useSelector((state: ReduxState) => state.kernel.kernelStdout);

  const [isOutputPinned, setIsOutputPinned] = React.useState<boolean>(true);

  /**
   * Auto scroll output page if pinned
   */
  React.useEffect(() => {
    if (isOutputPinned && kernelStdout.length > 0) {
      outputAnchorRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOutputPinned, kernelStdout.length]);

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
                        <Icon icon="lock" style={{ width: 18, color: palette.SUCCESS }} />
                        {ALLOWED_ORIGIN}
                      </React.Fragment>
                    }
                  />

                  <KeyValue
                    attributeKey="Gateway URI"
                    attributeValue={
                      <React.Fragment>
                        <StatusIcon healthy={gatewayUri !== ''} />
                        {gatewayUri || 'Unknown'}
                      </React.Fragment>
                    }
                  />

                  <KeyValue
                    attributeKey="Gateway Version"
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

              <p className={css(styles.keyText)}>
                Kernel Stdout
                <Button
                  appearance="subtle"
                  size="xs"
                  onClick={() => setIsOutputPinned((prevIsOutputPinned) => !prevIsOutputPinned)}
                >
                  <Icon icon="thumb-tack" style={isOutputPinned ? { color: palette.PRIMARY } : undefined} />
                </Button>
              </p>
              <pre className={css(styles.output)}>
                {kernelStdout.map((stdout) => (
                  <React.Fragment key={stdout.id}>
                    <span className={css(styles.bold)}>{stdout.dateString}</span>
                    {'\n'}
                    {stdout.message}
                    {'\n\n'}
                  </React.Fragment>
                ))}

                <div ref={outputAnchorRef} />
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KernelPage;
