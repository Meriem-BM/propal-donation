import { ToastType, fireToast } from "../components/Toast";

export const copyToClipboard = (str: string) => {
  navigator.clipboard.writeText(str);
  fireToast("Copied to clipboard", ToastType.Success, 3000);
};
