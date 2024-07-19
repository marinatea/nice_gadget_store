import Icon from '../Icon/Icon';
import { Icons } from '../../../types';
import classnames from 'classnames';
import styles from './Button.module.scss';

interface Props {
  onClick?: VoidFunction;
  icon?: Icons;
  title?: string | number;
  type?: 'primary' | 'secondary' | 'transparent';
  isDisabled?: boolean;
  isSelected?: boolean;
  className?: string;
}

const Button: React.FC<Props> = ({
  type = 'primary',
  onClick = () => {},
  isDisabled = false,
  isSelected = false,
  className,
  title,
  icon,
}) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={classnames(styles.container, className, {
        [styles['is-disabled']]: isDisabled,
        [styles['is-space-between']]: !!title && !!icon,
        [styles[type]]: type,
        [styles['selected']]: isSelected,
      })}
    >
      {title}
      {icon && <Icon iconId={icon} />}
    </button>
  );
};

export default Button;
