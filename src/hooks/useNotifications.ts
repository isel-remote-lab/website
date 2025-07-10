import { notification } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";

interface NotificationConfig {
  placement?: NotificationPlacement;
  duration?: number;
}

interface NotificationMessage {
  message: string;
  description: string;
  onClose?: () => void;
  onClick?: () => void;
}

/**
 * Custom hook to simplify notification usage across the application
 * 
 * @example
 * ```tsx
 * const { contextHolder, showSuccess, showError } = useNotifications();
 * 
 * // Success
 * showSuccess({
 *   message: "Operation completed successfully",
 *   description: "Data was saved correctly"
 * });
 * 
 * // Error with callbacks
 * showError({
 *   message: "Connection failed",
 *   description: "Please try again later",
 *   onClose: () => router.refresh(),
 *   onClick: () => router.push("/")
 * });
 * 
 * // With custom configuration
 * const { contextHolder, showSuccess } = useNotifications({
 *   placement: "bottomRight",
 *   duration: 10
 * });
 * ```
 */
export function useNotifications(config: NotificationConfig = {}) {
  const [api, contextHolder] = notification.useNotification();

  const defaultConfig = {
    placement: "top" as NotificationPlacement,
    duration: 5,
    ...config
  };

  const showSuccess = (notificationMessage: NotificationMessage) => {
    api.success({
      ...notificationMessage,
      ...defaultConfig
    });
  };

  const showError = (notificationMessage: NotificationMessage) => {
    api.error({
      ...notificationMessage,
      ...defaultConfig
    });
  };

  const showWarning = (notificationMessage: NotificationMessage) => {
    api.warning({
      ...notificationMessage,
      ...defaultConfig
    });
  };

  const showInfo = (notificationMessage: NotificationMessage) => {
    api.info({
      ...notificationMessage,
      ...defaultConfig
    });
  };

  return {
    contextHolder,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
} 