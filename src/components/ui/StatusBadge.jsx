import styles from './StatusBadge.module.css';

export function StatusBadge({ status, statusKey = 'in-development' }) {
  return (
    <span className={styles.badge} data-status={statusKey}>
      <span aria-hidden="true" className={styles.dot} />
      {status}
    </span>
  );
}
