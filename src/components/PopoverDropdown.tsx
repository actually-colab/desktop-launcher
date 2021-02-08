import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Button, ButtonProps, Dropdown, Icon, Popover, Whisper, WhisperProps } from 'rsuite';
import { WhisperInstance } from 'rsuite/lib/Whisper';

import { spacing } from '../constants/theme';

const styles = StyleSheet.create({
  buttonContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownIcon: {
    marginLeft: spacing.DEFAULT / 2,
  },
});

export type PopoverDropdownProps = {
  placement: WhisperProps['placement'];
  activeKey?: string;
  buttonContent: React.ReactNode;
  buttonProps?: ButtonProps;
  onSelect?(eventKey: string): void;
};

const PopoverDropdown: React.FC<PopoverDropdownProps> = ({
  placement = 'bottomEnd',
  activeKey,
  buttonContent,
  buttonProps = {
    appearance: 'subtle',
    size: 'md',
  },
  onSelect,
  children,
}) => {
  const whisperRef = React.createRef<WhisperInstance>();

  const handleSelect = React.useCallback(
    (eventKey: string) => {
      onSelect?.(eventKey);
      whisperRef.current?.close();
    },
    [onSelect, whisperRef]
  );

  return (
    <Whisper
      trigger="click"
      placement={placement}
      ref={whisperRef}
      speaker={
        <Popover full>
          <Dropdown.Menu activeKey={activeKey} onSelect={handleSelect}>
            {children}
          </Dropdown.Menu>
        </Popover>
      }
    >
      <Button {...buttonProps}>
        <div className={css(styles.buttonContent)}>
          {buttonContent}

          <div className={css(styles.dropdownIcon)}>
            <Icon icon="arrow-down-line" />
          </div>
        </div>
      </Button>
    </Whisper>
  );
};

export default PopoverDropdown;
