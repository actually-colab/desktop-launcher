import React from 'react';
import { ButtonProps, Icon, IconButton, IconProps, Tooltip, Whisper, WhisperProps } from 'rsuite';

import { palette } from '../constants/theme';

/**
 * Props for the ColoredIconButton component
 */
export type ColoredIconButtonProps = {
  icon: IconProps['icon'];
  size?: ButtonProps['size'];
  color?: string;
  tooltipText?: string;
  tooltipDirection?: WhisperProps['placement'];
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick(): void;
};

/**
 * A component to render a colored icon button with an optional tooltip
 */
const ColoredIconButton: React.FC<ColoredIconButtonProps> = ({
  icon,
  tooltipText = '',
  tooltipDirection,
  size = 'lg',
  color,
  active = false,
  disabled = false,
  loading = false,
  onClick,
}) => {
  const ButtonContent = (
    <IconButton
      appearance="subtle"
      size={size}
      style={{ borderRadius: 0 }}
      icon={
        <Icon
          icon={icon}
          style={
            !loading
              ? active
                ? {
                    color: palette.CHARCOAL,
                    backgroundColor: palette.BASE_FADED,
                  }
                : color
                ? {
                    color: disabled ? `${color}60` : color,
                  }
                : undefined
              : undefined
          }
        />
      }
      disabled={disabled || loading}
      loading={loading}
      onClick={onClick}
    />
  );

  if (tooltipText === '') {
    return ButtonContent;
  }

  return (
    <Whisper
      placement={tooltipDirection}
      trigger="hover"
      delayShow={1000}
      delayHide={400}
      speaker={<Tooltip>{tooltipText}</Tooltip>}
    >
      {ButtonContent}
    </Whisper>
  );
};

export default ColoredIconButton;
