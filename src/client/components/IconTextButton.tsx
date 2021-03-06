import React from 'react';
import { Button, ButtonProps, Icon, IconProps, Tooltip, Whisper, WhisperProps } from 'rsuite';

/**
 * Props for the IconTextButton component
 */
export type IconTextButtonProps = {
  icon: IconProps['icon'];
  text: string;
  size?: ButtonProps['size'];
  bgColor?: string;
  color?: string;
  tooltipText?: string;
  tooltipDirection?: WhisperProps['placement'];
  loading?: boolean;
  disabled?: boolean;
  onClick(): void;
};

/**
 * A component to render a button with an icon to the left
 */
const IconTextButton: React.FC<IconTextButtonProps> = ({
  icon,
  text,
  size = 'xs',
  bgColor,
  color,
  tooltipText = '',
  tooltipDirection,
  loading = false,
  disabled = false,
  onClick,
}) => {
  const ButtonContent = (
    <Button
      style={bgColor !== undefined ? { backgroundColor: bgColor } : undefined}
      size={size}
      appearance="subtle"
      loading={loading}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon icon={icon} style={!loading && !disabled ? { color } : undefined} />
      <span style={!loading && !disabled ? { marginLeft: 4, color } : { marginLeft: 4 }}>{text}</span>
    </Button>
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

export default IconTextButton;
