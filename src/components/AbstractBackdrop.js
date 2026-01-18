import styles from "./AbstractBackdrop.module.css";

export default function AbstractBackdrop({ variant = "detail" }) {
  return (
    <div
      className={styles.backdrop}
      data-variant={variant}
      aria-hidden="true"
    />
  );
}
