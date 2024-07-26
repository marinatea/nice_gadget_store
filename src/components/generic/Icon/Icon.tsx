import classnames from 'classnames';
import styles from './Icon.module.scss';

interface Props {
  iconId: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Icon: React.FC<Props> = ({ iconId, className, onClick, disabled }) => {
  return (
    <svg
      className={classnames(styles['icon'], className, {
        [styles['is-disabled']]: disabled,
      })}
      onClick={!disabled ? onClick : undefined}
    >
      <use href={`/img/sprite.svg#${iconId}`} />
    </svg>
  );
};

export default Icon;
