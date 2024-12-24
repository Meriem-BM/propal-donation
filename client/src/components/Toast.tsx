import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Image from "next/image";

export enum ToastType {
  Error = "error",
  Success = "success",
  Info = "info",
  Warning = "warning",
}

const toastConfig = new Map<ToastType, { color: string; icon: string }>([
  [ToastType.Error, { color: "bg-red-500", icon: "x-circle" }],
  [ToastType.Success, { color: "bg-green-500", icon: "check-circle" }],
  [ToastType.Info, { color: "bg-blue-500", icon: "info" }],
  [ToastType.Warning, { color: "bg-yellow-500", icon: "alert-triangle" }],
]);

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const { color, icon } =
    toastConfig.get(type) || toastConfig.get(ToastType.Info)!;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 gap-2 left-4 p-4 rounded-lg text-white ${color} flex items-center transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      role="alert"
    >
      <Image
        src={`/icons/${icon}.svg`}
        alt={type}
        width={20}
        height={20}
      />
      <span>{message}</span>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        aria-label="Close"
      >
        <Image src="/icons/x.svg" alt="close" width={10} height={10} />
      </button>
    </div>
  );
};

export const fireToast = (
  message: string,
  type: ToastType,
  duration?: number
) => {
  const toastContainer =
    document.getElementById("toast-container") || createToastContainer();
  const toastElement = document.createElement("div");
  const toastId = `toast-${Date.now()}`;
  toastElement.id = toastId;

  const root = createRoot(toastElement);
  root.render(
    <Toast
      message={message}
      type={type}
      duration={duration}
      onClose={() => {
        root.unmount();
        toastElement.remove();
      }}
    />
  );

  toastContainer.appendChild(toastElement);
};

const createToastContainer = () => {
  const container = document.createElement("div");
  container.id = "toast-container";
  container.className = "fixed bottom-4 left-4 z-999";
  document.body.appendChild(container);
  return container;
};
