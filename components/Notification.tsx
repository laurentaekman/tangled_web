import { useEffect } from "react";
import { CrossCircle } from "../assets/CrossCircleIcon";
import styles from "../styles/Notification.module.css";

interface Props {
  isError: boolean;
  message: string;
  onClose: () => void;
}

export const Notification = ({ isError, message, onClose }: Props) => {
  const notificationStyle = !isError
    ? styles.notification
    : [styles.notification, styles.notification_error].join(" ");
  const autoDeleteTime = 10000;

  useEffect(() => {
    const interval = setInterval(() => {
      onClose();
    }, autoDeleteTime);
    return () => {
      clearInterval(interval);
    };
  }, [onClose]);

  return (
    <div className={notificationStyle}>
      <div>{message}</div>
      <button onClick={onClose}>
        <CrossCircle />
      </button>
    </div>
  );
};
