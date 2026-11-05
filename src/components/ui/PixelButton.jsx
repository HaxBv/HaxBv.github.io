import { Link } from 'react-router-dom';
import styles from './PixelButton.module.css';

export function PixelButton({
  children,
  to,
  href,
  variant = 'primary',
  type = 'button',
  onClick,
  className = '',
}) {
  const classes = `${styles.button} ${styles[variant]} ${className}`.trim();

  if (to) {
    return (
      <Link className={classes} onClick={onClick} to={to}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={classes} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
