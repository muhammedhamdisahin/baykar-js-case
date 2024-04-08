import { ReactNode } from "react";
import styles from "./MyButton.module.css";

export default function MyButton({
  children,
  onClick,
  disabled,
}: Readonly<{ children: ReactNode; onClick: () => void; disabled?: boolean }>) {
  return (
    <button
      className={styles.button}
      style={{
        opacity: `${disabled ? "50%" : "1"}`,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
